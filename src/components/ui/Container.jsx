import { classNames } from '../../utils/classNames'
import styles from './Container.module.css'

export default function Container({ className, children }) {
  return <div className={classNames(styles.container, className)}>{children}</div>
}
