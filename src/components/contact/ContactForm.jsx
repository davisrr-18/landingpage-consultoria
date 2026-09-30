import { contactSubjects } from '../../config/site'
import { useContactForm } from '../../hooks/useContactForm'
import { FIELD_LIMITS } from '../../services/contactValidation'
import Button from '../ui/Button'
import FormField from './FormField'
import FormFeedback from './FormFeedback'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const { values, errors, feedback, handleChange, handleBlur, handleSubmit } =
    useContactForm()

  const fieldProps = (name) => ({
    id: name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur,
  })

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="formulario-titulo"
    >
      <h3 id="formulario-titulo" className={styles.title}>
        Envie sua mensagem
      </h3>

      <div className={styles.row}>
        <FormField
          {...fieldProps('name')}
          label="Nome"
          autoComplete="name"
          maxLength={FIELD_LIMITS.nameMax}
          placeholder="Como podemos chamar você?"
        />
        <FormField
          {...fieldProps('company')}
          label="Empresa"
          optional
          autoComplete="organization"
          maxLength={FIELD_LIMITS.companyMax}
          placeholder="Nome da sua empresa"
        />
      </div>

      <FormField
        {...fieldProps('subject')}
        label="Assunto"
        as="select"
        options={contactSubjects}
        placeholder="Selecione uma opção"
      />

      <FormField
        {...fieldProps('message')}
        label="Mensagem"
        as="textarea"
        maxLength={FIELD_LIMITS.messageMax}
        placeholder="Conte brevemente o que você precisa"
        hint={`${values.message.length}/${FIELD_LIMITS.messageMax} caracteres`}
      />

      <FormFeedback feedback={feedback} />

      <Button type="submit" size="lg" icon="chat" className={styles.submit}>
        Continuar no WhatsApp
      </Button>
      <p className={styles.privacy}>
        Este site não armazena seus dados. Ao continuar, as informações
        preenchidas serão encaminhadas ao WhatsApp (Meta).
      </p>
    </form>
  )
}
