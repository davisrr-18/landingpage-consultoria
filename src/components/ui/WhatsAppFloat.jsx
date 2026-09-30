import { useRef } from 'react'
import { useFixedElementOverlap } from '../../hooks/useFixedElementOverlap'
import { getWhatsappLink } from '../../services/whatsapp'
import { classNames } from '../../utils/classNames'
import Icon from './Icon'
import styles from './WhatsAppFloat.module.css'

/** Contato e rodapé inteiros, além de qualquer link ou botão do conteúdo. */
const AVOID_SELECTOR = '#contato, #rodape, main a[href], main button'

/** Botão flutuante de atendimento; some quando cobriria o formulário, links ou botões. */
export default function WhatsAppFloat() {
  const ref = useRef(null)
  const hidden = useFixedElementOverlap(ref, AVOID_SELECTOR)
  const { href, external } = getWhatsappLink()
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      ref={ref}
      className={classNames(styles.float, hidden && styles.hidden)}
      href={href}
      {...externalProps}
    >
      <Icon name="chat" size={26} />
      <span className={styles.label}>Fale conosco</span>
    </a>
  )
}
