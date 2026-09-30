import { afterEach, describe, expect, it, vi } from 'vitest'
import { siteConfig } from '../config/site'
import {
  buildContactMessage,
  buildWhatsappUrl,
  getWhatsappLink,
  getWhatsappNumber,
  isWhatsappConfigured,
  normalizePhoneNumber,
  openWhatsapp,
} from './whatsapp'

const FAKE_NUMBER = '5511900000000'

function decodedText(url) {
  return new URL(url).searchParams.get('text')
}

describe('normalizePhoneNumber', () => {
  it('remove a formatação comum de telefone', () => {
    expect(normalizePhoneNumber('+55 (11) 90000-0000')).toBe(FAKE_NUMBER)
    expect(normalizePhoneNumber(' 55.11.90000.0000 ')).toBe(FAKE_NUMBER)
  })

  it('retorna vazio para valores ausentes ou com caracteres estranhos', () => {
    expect(normalizePhoneNumber()).toBe('')
    expect(normalizePhoneNumber(null)).toBe('')
    expect(normalizePhoneNumber('55abc11900000000')).toBe('')
    expect(normalizePhoneNumber('55+11900000000')).toBe('')
  })
})

describe('getWhatsappNumber / isWhatsappConfigured', () => {
  it.each([
    ['5511900000000'],
    ['+55 11 90000-0000'],
    ['14155550100'],
    ['123456789012345'],
  ])('aceita número E.164 válido: %s', (raw) => {
    expect(getWhatsappNumber(raw)).toBe(normalizePhoneNumber(raw))
    expect(isWhatsappConfigured(raw)).toBe(true)
  })

  it.each([
    ['', 'vazio'],
    ['0000000000', 'só zeros'],
    ['05511900000000', 'começa com zero'],
    ['1234567', 'curto demais'],
    ['1234567890123456', 'mais de 15 dígitos'],
    ['55 11 9OOOO-0000', 'letras no lugar de dígitos'],
  ])('rejeita %s (%s)', (raw) => {
    expect(getWhatsappNumber(raw)).toBeNull()
    expect(isWhatsappConfigured(raw)).toBe(false)
  })

  it('mantém o modo demonstração com a configuração padrão (sem número)', () => {
    expect(siteConfig.whatsapp.number).toBe('')
    expect(isWhatsappConfigured()).toBe(false)
  })
})

describe('buildWhatsappUrl', () => {
  it('retorna null sem número válido', () => {
    expect(buildWhatsappUrl('Olá')).toBeNull()
    expect(buildWhatsappUrl('Olá', '0000000000')).toBeNull()
  })

  it('gera a URL do wa.me com o número normalizado', () => {
    const url = buildWhatsappUrl('Olá', '+55 (11) 90000-0000')

    expect(url).toBe(`https://wa.me/${FAKE_NUMBER}?text=Ol%C3%A1`)
  })

  it('codifica caracteres especiais, emojis e quebras de linha', () => {
    const message = 'Linha 1\nLinha 2 & 50% ?x=1#frag 😀 "aspas" <tag>'
    const url = buildWhatsappUrl(message, FAKE_NUMBER)
    const query = url.split('?text=')[1]

    expect(query).toBe(encodeURIComponent(message))
    expect(query).toContain('%0A')
    expect(query).toContain('%26')
    expect(query).toContain('%23')
    expect(query).toContain('%F0%9F%98%80')
    expect(query).not.toMatch(/[\s&#<>"]/)
    expect(decodedText(url)).toBe(message)
  })
})

describe('getWhatsappLink', () => {
  it('usa o link externo quando há número válido', () => {
    expect(getWhatsappLink('Oi', '#contato', FAKE_NUMBER)).toEqual({
      href: `https://wa.me/${FAKE_NUMBER}?text=Oi`,
      external: true,
    })
  })

  it('cai no formulário quando o número está ausente ou inválido', () => {
    expect(getWhatsappLink('Oi')).toEqual({ href: '#contato', external: false })
    expect(getWhatsappLink('Oi', '#contato', '0000000000')).toEqual({
      href: '#contato',
      external: false,
    })
  })
})

describe('buildContactMessage', () => {
  it('monta a mensagem com os campos preenchidos e omite empresa vazia', () => {
    const message = buildContactMessage({
      name: '  Maria  ',
      company: '   ',
      subject: 'Planejamento tributário',
      message: 'Preciso de ajuda.',
    })

    expect(message).toBe(
      [
        `Olá! Vim pelo site da ${siteConfig.name} e gostaria de atendimento.`,
        '',
        '*Nome:* Maria',
        '*Assunto:* Planejamento tributário',
        '',
        '*Mensagem:*',
        'Preciso de ajuda.',
      ].join('\n'),
    )
  })

  it('normaliza quebras de linha, remove caracteres de controle e preserva emojis', () => {
    const message = buildContactMessage({
      name: 'Ana\u0007',
      company: 'Empresa & Cia',
      subject: 'Outro assunto',
      message: 'Linha 1\r\nLinha 2\r\n\r\n\r\n\r\nLinha 3 🙂',
    })

    expect(message).toContain('*Nome:* Ana\n')
    expect(message).toContain('*Empresa:* Empresa & Cia')
    expect(message).toContain('Linha 1\nLinha 2\n\nLinha 3 🙂')
    expect(message).not.toContain('\r')

    const url = buildWhatsappUrl(message, FAKE_NUMBER)
    expect(decodedText(url)).toBe(message)
  })
})

describe('openWhatsapp', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('abre em nova aba com noopener e noreferrer, sem acessar a rede', () => {
    const open = vi.fn()
    vi.stubGlobal('window', { open })

    openWhatsapp(`https://wa.me/${FAKE_NUMBER}?text=Oi`)

    expect(open).toHaveBeenCalledWith(
      `https://wa.me/${FAKE_NUMBER}?text=Oi`,
      '_blank',
      'noopener,noreferrer',
    )
  })
})
