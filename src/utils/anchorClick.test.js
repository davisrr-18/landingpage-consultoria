import { describe, expect, it } from 'vitest'
import { getHashSectionId, shouldHandleAnchorClick } from './anchorClick'

function createLink(attributes) {
  return {
    getAttribute: (name) => attributes[name] ?? null,
    hasAttribute: (name) => name in attributes,
  }
}

const plainClick = {
  button: 0,
  defaultPrevented: false,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
}

describe('getHashSectionId', () => {
  it('extrai e decodifica o id do hash', () => {
    expect(getHashSectionId('#contato')).toBe('contato')
    expect(getHashSectionId('#se%C3%A7%C3%A3o')).toBe('seção')
  })

  it('retorna vazio para hashes ausentes ou malformados', () => {
    expect(getHashSectionId('')).toBe('')
    expect(getHashSectionId('#')).toBe('')
    expect(getHashSectionId('contato')).toBe('')
    expect(getHashSectionId('#%E0%A4%A')).toBe('')
    expect(getHashSectionId(null)).toBe('')
  })
})

describe('shouldHandleAnchorClick', () => {
  const internal = createLink({ href: '#sobre' })

  it('trata clique simples em link interno', () => {
    expect(shouldHandleAnchorClick(plainClick, internal)).toBe(true)
    expect(
      shouldHandleAnchorClick(plainClick, createLink({ href: '#sobre', target: '_self' })),
    ).toBe(true)
  })

  it.each(['metaKey', 'ctrlKey', 'shiftKey', 'altKey'])(
    'mantém o comportamento nativo com %s',
    (key) => {
      expect(shouldHandleAnchorClick({ ...plainClick, [key]: true }, internal)).toBe(false)
    },
  )

  it('ignora botões diferentes do esquerdo e eventos já cancelados', () => {
    expect(shouldHandleAnchorClick({ ...plainClick, button: 1 }, internal)).toBe(false)
    expect(shouldHandleAnchorClick({ ...plainClick, button: 2 }, internal)).toBe(false)
    expect(shouldHandleAnchorClick({ ...plainClick, defaultPrevented: true }, internal)).toBe(
      false,
    )
  })

  it('ignora links externos, downloads, nova aba e ausência de link', () => {
    expect(
      shouldHandleAnchorClick(plainClick, createLink({ href: 'https://example.com/#x' })),
    ).toBe(false)
    expect(shouldHandleAnchorClick(plainClick, createLink({ href: 'mailto:a@example.com' }))).toBe(
      false,
    )
    expect(
      shouldHandleAnchorClick(plainClick, createLink({ href: '#sobre', download: '' })),
    ).toBe(false)
    expect(
      shouldHandleAnchorClick(plainClick, createLink({ href: '#sobre', target: '_blank' })),
    ).toBe(false)
    expect(shouldHandleAnchorClick(plainClick, null)).toBe(false)
  })
})
