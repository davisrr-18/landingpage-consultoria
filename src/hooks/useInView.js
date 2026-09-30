import { useEffect, useRef, useState } from 'react'

const supportsObserver = typeof IntersectionObserver !== 'undefined'

/**
 * Informa quando o elemento entra na viewport pela primeira vez.
 * Sem suporte a IntersectionObserver, o conteúdo é considerado visível.
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(!supportsObserver)

  useEffect(() => {
    const element = ref.current

    if (!element || !supportsObserver) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
