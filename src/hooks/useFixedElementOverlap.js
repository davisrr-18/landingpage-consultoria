import { useEffect, useState } from 'react'

const BAND_MARGIN = 16

function overlapsHorizontally(rect, left, right) {
  return rect.left < right && rect.right > left
}

/**
 * Informa se o elemento fixo no rodapé da tela (`ref`) cobriria algum
 * dos alvos (`selector`). Observa apenas a faixa inferior da viewport
 * ocupada pelo elemento e considera a sobreposição horizontal real.
 */
export function useFixedElementOverlap(ref, selector) {
  const [overlapping, setOverlapping] = useState(false)

  useEffect(() => {
    const fixedElement = ref.current

    if (!fixedElement || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const targets = [...document.querySelectorAll(selector)]
    const inBand = new Set()
    let observer = null

    const evaluate = () => {
      const left = fixedElement.offsetLeft
      const right = left + fixedElement.offsetWidth

      setOverlapping(
        [...inBand].some((target) =>
          overlapsHorizontally(target.getBoundingClientRect(), left, right),
        ),
      )
    }

    const observe = () => {
      observer?.disconnect()
      inBand.clear()

      const bandHeight = window.innerHeight - fixedElement.offsetTop + BAND_MARGIN
      const topMargin = Math.max(0, window.innerHeight - bandHeight)

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) {
              inBand.add(target)
            } else {
              inBand.delete(target)
            }
          })
          evaluate()
        },
        { rootMargin: `-${topMargin}px 0px 0px 0px` },
      )

      targets.forEach((target) => observer.observe(target))
    }

    observe()
    window.addEventListener('resize', observe)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', observe)
    }
  }, [ref, selector])

  return overlapping
}
