import { useCallback, useMemo, useState } from 'react'
import {
  initialContactValues,
  validateContact,
} from '../services/contactValidation'
import {
  buildContactMessage,
  buildWhatsappUrl,
  openWhatsapp,
} from '../services/whatsapp'

const idleFeedback = { type: 'idle' }

/**
 * Gerencia estado, validação e envio do formulário de contato.
 * O "envio" apenas monta a mensagem e abre o WhatsApp; o site não armazena os dados.
 */
export function useContactForm() {
  const [values, setValues] = useState(initialContactValues)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState(idleFeedback)

  const errors = useMemo(() => validateContact(values), [values])

  const visibleErrors = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(errors).filter(([field]) => submitted || touched[field]),
      ),
    [errors, submitted, touched],
  )

  const handleChange = useCallback((event) => {
    const { name, value } = event.target

    setValues((previous) => ({ ...previous, [name]: value }))
    setFeedback(idleFeedback)
  }, [])

  const handleBlur = useCallback((event) => {
    const { name } = event.target

    setTouched((previous) => ({ ...previous, [name]: true }))
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      setSubmitted(true)

      const firstInvalidField = Object.keys(errors)[0]

      if (firstInvalidField) {
        setFeedback({ type: 'invalid' })
        event.currentTarget.elements.namedItem(firstInvalidField)?.focus()
        return
      }

      const message = buildContactMessage(values)
      const url = buildWhatsappUrl(message)

      if (!url) {
        setFeedback({ type: 'demo', preview: message })
        return
      }

      openWhatsapp(url)
      setFeedback({ type: 'redirect', url })
    },
    [errors, values],
  )

  return {
    values,
    errors: visibleErrors,
    feedback,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
