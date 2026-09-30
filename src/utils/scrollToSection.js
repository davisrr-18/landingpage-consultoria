const FALLBACK_HEADER_HEIGHT = 72

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Altura real do cabeçalho fixo, em pixels. */
export function getHeaderOffset() {
  const header = document.querySelector('header')
  const height = header?.getBoundingClientRect().height

  return Number.isFinite(height) && height > 0 ? height : FALLBACK_HEADER_HEIGHT
}

/** Posição de rolagem que deixa o topo do alvo logo abaixo do cabeçalho. */
export function getSectionScrollTop(targetTop, scrollY, headerOffset) {
  return Math.max(0, Math.round(targetTop + scrollY - headerOffset))
}

/**
 * Rola até a seção, respeitando a altura do cabeçalho fixo, e move o foco
 * para ela (o alvo precisa ter tabIndex={-1} se não for focável).
 */
export function scrollToSection(
  sectionId,
  { updateHash = true, focus = true, instant = false } = {},
) {
  const target = document.getElementById(sectionId)

  if (!target) {
    return false
  }

  const top = getSectionScrollTop(
    target.getBoundingClientRect().top,
    window.scrollY,
    getHeaderOffset(),
  )

  if (focus) {
    target.focus({ preventScroll: true })
  }

  window.scrollTo({
    top,
    left: 0,
    behavior: instant || prefersReducedMotion() ? 'instant' : 'smooth',
  })

  if (updateHash) {
    const hash = `#${sectionId}`

    if (window.location.hash !== hash) {
      history.pushState(null, '', hash)
    }
  }

  return true
}
