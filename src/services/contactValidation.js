import { contactSubjects } from '../config/site'

export const FIELD_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  companyMax: 80,
  messageMin: 10,
  messageMax: 600,
}

export const initialContactValues = {
  name: '',
  company: '',
  subject: '',
  message: '',
}

/** Valida o formulário e retorna um objeto { campo: mensagemDeErro }. */
export function validateContact(values) {
  const errors = {}
  const name = values.name.trim()
  const company = values.company.trim()
  const message = values.message.trim()

  if (!name) {
    errors.name = 'Informe seu nome.'
  } else if (name.length < FIELD_LIMITS.nameMin) {
    errors.name = `O nome deve ter pelo menos ${FIELD_LIMITS.nameMin} caracteres.`
  } else if (name.length > FIELD_LIMITS.nameMax) {
    errors.name = `O nome deve ter no máximo ${FIELD_LIMITS.nameMax} caracteres.`
  }

  if (company.length > FIELD_LIMITS.companyMax) {
    errors.company = `O nome da empresa deve ter no máximo ${FIELD_LIMITS.companyMax} caracteres.`
  }

  if (!values.subject) {
    errors.subject = 'Selecione o assunto do atendimento.'
  } else if (!contactSubjects.includes(values.subject)) {
    errors.subject = 'Selecione uma das opções disponíveis.'
  }

  if (!message) {
    errors.message = 'Escreva uma mensagem para o atendimento.'
  } else if (message.length < FIELD_LIMITS.messageMin) {
    errors.message = `A mensagem deve ter pelo menos ${FIELD_LIMITS.messageMin} caracteres.`
  } else if (message.length > FIELD_LIMITS.messageMax) {
    errors.message = `A mensagem deve ter no máximo ${FIELD_LIMITS.messageMax} caracteres.`
  }

  return errors
}
