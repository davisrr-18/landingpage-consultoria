import { useInView } from '../../hooks/useInView'
import { classNames } from '../../utils/classNames'
import styles from './Reveal.module.css'

/** Aplica uma entrada suave quando o conteúdo aparece na tela. */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={classNames(
        styles.reveal,
        styles[`delay${delay}`],
        inView && styles.visible,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
