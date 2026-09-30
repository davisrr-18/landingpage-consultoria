import { contact } from '../../config/site'
import { classNames } from '../../utils/classNames'
import styles from './FormFeedback.module.css'

/**
 * Região viva com o resultado do envio. Fica sempre no DOM
 * para que leitores de tela anunciem as mudanças de estado.
 */
export default function FormFeedback({ feedback }) {
  const { type } = feedback

  return (
    <div role="status" aria-live="polite" className={styles.region}>
      {type === 'invalid' && (
        <p className={classNames(styles.box, styles.error)}>
          Revise os campos destacados para continuar.
        </p>
      )}

      {type === 'demo' && (
        <div className={classNames(styles.box, styles.demo)}>
          <p className={styles.strong}>{contact.demoNotice}</p>
          <p className={styles.previewLabel}>
            Prévia da mensagem que seria enviada:
          </p>
          <pre className={styles.preview}>{feedback.preview}</pre>
        </div>
      )}

      {type === 'redirect' && (
        <p className={classNames(styles.box, styles.success)}>
          Sua mensagem está pronta. Se a conversa não aparecer,{' '}
          <a href={feedback.url} target="_blank" rel="noopener noreferrer">
            continue no WhatsApp por este link
          </a>
          .
        </p>
      )}
    </div>
  )
}
