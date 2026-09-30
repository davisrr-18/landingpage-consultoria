import { classNames } from '../../utils/classNames'
import styles from './FormField.module.css'

/**
 * Campo de formulário acessível (input, textarea ou select) com rótulo,
 * dica e mensagem de erro associados por aria-describedby.
 */
export default function FormField({
  id,
  label,
  as = 'input',
  error,
  hint,
  optional = false,
  options = [],
  placeholder,
  ...rest
}) {
  const hintId = hint ? `${id}-dica` : undefined
  const errorId = error ? `${id}-erro` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  const controlProps = {
    id,
    name: id,
    className: classNames(styles.control, error && styles.invalid),
    'aria-invalid': error ? 'true' : undefined,
    'aria-required': optional ? undefined : 'true',
    'aria-describedby': describedBy,
    ...rest,
  }

  let control

  if (as === 'textarea') {
    control = <textarea rows={5} placeholder={placeholder} {...controlProps} />
  } else if (as === 'select') {
    control = (
      <select {...controlProps}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  } else {
    control = <input type="text" placeholder={placeholder} {...controlProps} />
  }

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional && <span className={styles.optional}> (opcional)</span>}
      </label>
      {control}
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
