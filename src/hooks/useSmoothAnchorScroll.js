import { useEffect } from 'react'
import { getHashSectionId, shouldHandleAnchorClick } from '../utils/anchorClick'
import { scrollToSection } from '../utils/scrollToSection'

/** Posiciona a página de acordo com o hash atual (carregamento direto, Voltar e Avançar). */
function syncScrollWithHash() {
  const sectionId = getHashSectionId(window.location.hash)

  if (sectionId && document.getElementById(sectionId)) {
    scrollToSection(sectionId, { updateHash: false, focus: false, instant: true })
  } else if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
}

/**
 * Intercepta cliques simples em links internos (#secao), rola suavemente
 * até o alvo e move o foco para ele. A posição de cada entrada do histórico
 * é derivada do hash, para que Voltar e Avançar levem à seção correta.
 */
export function useSmoothAnchorScroll() {
  useEffect(() => {
    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = 'manual'

    if (window.location.hash) {
      syncScrollWithHash()
    }

    const handleClick = (event) => {
      const link =
        event.target instanceof Element ? event.target.closest('a[href]') : null

      if (!shouldHandleAnchorClick(event, link)) {
        return
      }

      const sectionId = getHashSectionId(link.getAttribute('href'))

      if (!sectionId || !document.getElementById(sectionId)) {
        return
      }

      event.preventDefault()
      scrollToSection(sectionId)
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', syncScrollWithHash)

    return () => {
      history.scrollRestoration = previousRestoration
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', syncScrollWithHash)
    }
  }, [])
}
