import { siteConfig } from '../../config/site'
import { classNames } from '../../utils/classNames'
import styles from './Logo.module.css'

export default function Logo({ href = '#inicio', light = false, className }) {
  return (
    <a
      className={classNames(styles.logo, light && styles.light, className)}
      href={href}
      aria-label={`${siteConfig.name} - início`}
    >
      <svg
        className={styles.mark}
        width="36"
        height="36"
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="36" height="36" rx="10" fill="var(--color-navy-800)" />
        <path
          d="M9 11l9 15 9-15"
          fill="none"
          stroke="var(--color-gold-400)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 11l4 6.5L22 11"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.text}>
        <span className={styles.name}>{siteConfig.name}</span>
        <span className={styles.tagline}>{siteConfig.tagline}</span>
      </span>
    </a>
  )
}
