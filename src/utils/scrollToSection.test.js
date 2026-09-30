import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getHeaderOffset, getSectionScrollTop, scrollToSection } from './scrollToSection'

function setupDom({ headerHeight = 73, targetTop = 1200, scrollY = 300, reducedMotion = false, hash = '' } = {}) {
  const target = { focus: vi.fn(), getBoundingClientRect: () => ({ top: targetTop }) }
  const header = { getBoundingClientRect: () => ({ height: headerHeight }) }
  const scrollTo = vi.fn()
  const pushState = vi.fn()

  vi.stubGlobal('document', {
    getElementById: (id) => (id === 'sobre' ? target : null),
    querySelector: (selector) => (selector === 'header' ? header : null),
  })
  vi.stubGlobal('window', {
    scrollY,
    scrollTo,
    location: { hash },
    matchMedia: () => ({ matches: reducedMotion }),
  })
  vi.stubGlobal('history', { pushState })

  return { target, scrollTo, pushState }
}

describe('getSectionScrollTop', () => {
  it('desconta a altura do cabeçalho e nunca fica negativo', () => {
    expect(getSectionScrollTop(500, 1000, 73)).toBe(1427)
    expect(getSectionScrollTop(20, 0, 73)).toBe(0)
  })
})

describe('scrollToSection', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('usa a altura real do cabeçalho em pixels (não o valor de 4.5rem como 4.5px)', () => {
    setupDom({ headerHeight: 73 })
    expect(getHeaderOffset()).toBe(73)
  })

  it('usa um valor padrão quando o cabeçalho não existe', () => {
    setupDom()
    document.querySelector = () => null
    expect(getHeaderOffset()).toBe(72)
  })

  it('rola suavemente até a seção abaixo do cabeçalho, foca e atualiza o hash', () => {
    const { target, scrollTo, pushState } = setupDom()

    expect(scrollToSection('sobre')).toBe(true)
    expect(target.focus).toHaveBeenCalledWith({ preventScroll: true })
    expect(scrollTo).toHaveBeenCalledWith({ top: 1427, left: 0, behavior: 'smooth' })
    expect(pushState).toHaveBeenCalledWith(null, '', '#sobre')
  })

  it('respeita prefers-reduced-motion', () => {
    const { scrollTo } = setupDom({ reducedMotion: true })

    scrollToSection('sobre')
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'instant' }))
  })

  it('não duplica o histórico quando o hash já é o mesmo e aceita opções', () => {
    const { target, scrollTo, pushState } = setupDom({ hash: '#sobre' })

    scrollToSection('sobre', { focus: false, instant: true })
    expect(pushState).not.toHaveBeenCalled()
    expect(target.focus).not.toHaveBeenCalled()
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'instant' }))
  })

  it('retorna false para seções inexistentes', () => {
    const { scrollTo } = setupDom()

    expect(scrollToSection('inexistente')).toBe(false)
    expect(scrollTo).not.toHaveBeenCalled()
  })
})
