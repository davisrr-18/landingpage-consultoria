import { useEffect, useState } from 'react'
import { getActiveSectionId } from '../utils/activeSection'
import { getHeaderOffset } from '../utils/scrollToSection'

const PROBE_RATIO = 0.3
const PAGE_END_TOLERANCE = 2

function measureActiveSection(ids) {
  const headerOffset = getHeaderOffset()
  const viewportHeight = window.innerHeight
  const probeLine = headerOffset + (viewportHeight - headerOffset) * PROBE_RATIO
  const atPageEnd =
    window.scrollY + viewportHeight >=
    document.documentElement.scrollHeight - PAGE_END_TOLERANCE

  const sections = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .map((element) => {
      const { top, bottom } = element.getBoundingClientRect()
      return { id: element.id, top, bottom }
    })

  return getActiveSectionId(sections, probeLine, { atPageEnd, viewportHeight })
}

/**
 * Retorna o id da seção em leitura, derivado apenas da posição de rolagem
 * (mesma posição, mesmo resultado). Retorna '' fora das seções listadas.
 * O array `ids` deve ser estável (ex.: constante de módulo).
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setActiveId(measureActiveSection(ids))
    }

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [ids])

  return activeId
}
