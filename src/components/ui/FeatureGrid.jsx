import { classNames } from '../../utils/classNames'
import Icon from './Icon'
import Reveal from './Reveal'
import styles from './FeatureGrid.module.css'

/**
 * Grade de itens com ícone, título e descrição.
 * `variant`: "card" (fundo claro) | "dark" (sobre fundo escuro).
 */
export default function FeatureGrid({ items, variant = 'card' }) {
  return (
    <ul className={classNames(styles.grid, styles[variant])}>
      {items.map(({ icon, title, description }, index) => (
        <Reveal as="li" key={title} delay={index % 3} className={styles.item}>
          <span className={styles.icon}>
            <Icon name={icon} size={26} />
          </span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </Reveal>
      ))}
    </ul>
  )
}
