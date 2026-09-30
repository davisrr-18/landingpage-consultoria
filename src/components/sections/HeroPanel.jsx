import { hero } from '../../config/site'
import Icon from '../ui/Icon'
import styles from './HeroPanel.module.css'

const CHART_WIDTH = 240
const CHART_HEIGHT = 100
const BAR_GAP = 12

/** Ilustração decorativa de um painel fiscal (dados fictícios). */
export default function HeroPanel() {
  const { title, badge, bars, items, chip } = hero.panel
  const barWidth = (CHART_WIDTH - BAR_GAP * (bars.length - 1)) / bars.length

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <span className={styles.badge}>{badge}</span>
        </div>

        <svg
          className={styles.chart}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          preserveAspectRatio="none"
          focusable="false"
        >
          {bars.map((value, index) => {
            const isLast = index === bars.length - 1

            return (
              <rect
                key={index}
                className={isLast ? styles.barAccent : styles.bar}
                x={index * (barWidth + BAR_GAP)}
                y={CHART_HEIGHT - value}
                width={barWidth}
                height={value}
                rx="4"
              />
            )
          })}
        </svg>

        <ul className={styles.list}>
          {items.map(({ label, status }) => (
            <li key={label} className={styles.item}>
              <span className={styles.check}>
                <Icon name="check" size={16} />
              </span>
              <span className={styles.itemLabel}>{label}</span>
              <span className={styles.status}>{status}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.chip}>
        <span className={styles.chipLabel}>{chip.label}</span>
        <span className={styles.chipValue}>{chip.value}</span>
      </div>
    </div>
  )
}
