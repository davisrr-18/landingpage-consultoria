import { classNames } from '../../utils/classNames'
import Icon from './Icon'
import styles from './Button.module.css'

/**
 * Botão ou link com aparência de botão.
 * Com `href` renderiza <a>; sem `href`, renderiza <button>.
 */
export default function Button({
  href,
  external = false,
  variant = 'whatsapp',
  size = 'md',
  icon,
  className,
  children,
  ...rest
}) {
  const classes = classNames(styles.button, styles[variant], styles[size], className)
  const content = (
    <>
      {icon && <Icon name={icon} size={20} />}
      <span>{children}</span>
    </>
  )

  if (href) {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}

    return (
      <a className={classes} href={href} {...externalProps} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
