import { siteConfig } from '../config/site'

const WHATSAPP_BASE_URL = 'https://wa.me'
const MAX_FIELD_LENGTH = 600

/** Aceita apenas dígitos e separadores comuns de telefone, com "+" opcional no início. */
const PHONE_INPUT_PATTERN = /^\+?[\d\s().-]*$/

/** E.164: código do país sem zero à esquerda e no máximo 15 dígitos. */
const E164_PATTERN = /^[1-9]\d{7,14}$/

/**
 * Remove a formatação do telefone ("+55 (11) 90000-0000" -> "5511900000000").
 * Retorna '' quando o valor contém caracteres que não pertencem a um telefone.
 */
export function normalizePhoneNumber(rawNumber = '') {
  const value = String(rawNumber ?? '').trim()

  return PHONE_INPUT_PATTERN.test(value) ? value.replace(/\D/g, '') : ''
}

/** Retorna o número normalizado quando válido no formato E.164, ou null. */
export function getWhatsappNumber(rawNumber = siteConfig.whatsapp.number) {
  const digits = normalizePhoneNumber(rawNumber)

  return E164_PATTERN.test(digits) ? digits : null
}

export function isWhatsappConfigured(rawNumber = siteConfig.whatsapp.number) {
  return getWhatsappNumber(rawNumber) !== null
}

function cleanText(value = '') {
  return String(value)
    .replace(/\r\n?/g, '\n')
    .replace(/(?![\n\t])\p{Cc}/gu, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, MAX_FIELD_LENGTH)
}

/** Monta o texto da mensagem que será enviada ao WhatsApp. */
export function buildContactMessage({ name, company, subject, message }) {
  const cleanCompany = cleanText(company)

  const lines = [
    `Olá! Vim pelo site da ${siteConfig.name} e gostaria de atendimento.`,
    '',
    `*Nome:* ${cleanText(name)}`,
    cleanCompany ? `*Empresa:* ${cleanCompany}` : null,
    `*Assunto:* ${cleanText(subject)}`,
    '',
    '*Mensagem:*',
    cleanText(message),
  ]

  return lines.filter((line) => line !== null).join('\n')
}

/** Gera a URL segura do WhatsApp ou null quando não há número válido. */
export function buildWhatsappUrl(message, rawNumber = siteConfig.whatsapp.number) {
  const number = getWhatsappNumber(rawNumber)

  if (!number) {
    return null
  }

  return `${WHATSAPP_BASE_URL}/${number}?text=${encodeURIComponent(message)}`
}

/**
 * Link para os botões de chamada (CTAs).
 * Sem número válido, leva o visitante ao formulário de contato.
 */
export function getWhatsappLink(
  message = siteConfig.whatsapp.defaultMessage,
  fallbackHref = '#contato',
  rawNumber = siteConfig.whatsapp.number,
) {
  const url = buildWhatsappUrl(message, rawNumber)

  return url
    ? { href: url, external: true }
    : { href: fallbackHref, external: false }
}

/** Abre a conversa em nova aba, sem expor a página de origem. */
export function openWhatsapp(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
