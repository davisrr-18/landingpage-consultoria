import { classNames } from '../../utils/classNames'
import Container from './Container'
import Reveal from './Reveal'
import styles from './Section.module.css'

/**
 * Seção da página com cabeçalho padronizado (chamada, título e descrição).
 * `tone`: "default" | "surface" | "dark".
 */
export default function Section({
  id,
  tone = 'default',
  eyebrow,
  title,
  description,
  children,
}) {
  const titleId = `${id}-titulo`

  return (
    <section
      id={id}
      className={classNames(styles.section, styles[tone])}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Container>
        <Reveal as="header" className={styles.header}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {description && <p className={styles.description}>{description}</p>}
        </Reveal>
        {children}
      </Container>
    </section>
  )
}
