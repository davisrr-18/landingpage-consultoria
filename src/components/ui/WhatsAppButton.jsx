import { getWhatsappLink } from '../../services/whatsapp'
import Button from './Button'

/**
 * CTA que abre o WhatsApp com uma mensagem inicial.
 * Sem número configurado, direciona ao formulário de contato.
 */
export default function WhatsAppButton({
  message,
  children = 'Falar no WhatsApp',
  ...props
}) {
  const { href, external } = getWhatsappLink(message)

  return (
    <Button
      href={href}
      external={external}
      variant="whatsapp"
      icon="chat"
      {...props}
    >
      {children}
    </Button>
  )
}
