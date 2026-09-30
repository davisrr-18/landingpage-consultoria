import { describe, expect, it } from 'vitest'
import { contactSubjects } from '../config/site'
import {
  FIELD_LIMITS,
  initialContactValues,
  validateContact,
} from './contactValidation'

const validValues = {
  name: 'Maria Exemplo',
  company: '',
  subject: contactSubjects[0],
  message: 'Gostaria de entender o melhor regime tributário.',
}

describe('validateContact', () => {
  it('retorna erro em todos os campos obrigatórios quando o formulário está vazio', () => {
    const errors = validateContact(initialContactValues)

    expect(Object.keys(errors)).toEqual(['name', 'subject', 'message'])
    expect(errors.name).toBe('Informe seu nome.')
    expect(errors.subject).toBe('Selecione o assunto do atendimento.')
    expect(errors.message).toBe('Escreva uma mensagem para o atendimento.')
  })

  it('aceita valores válidos, com empresa opcional', () => {
    expect(validateContact(validValues)).toEqual({})
    expect(validateContact({ ...validValues, company: 'Empresa Fictícia' })).toEqual({})
  })

  it('ignora espaços nas bordas ao validar', () => {
    const errors = validateContact({ ...validValues, name: '   ', message: '  curta  ' })

    expect(errors.name).toBe('Informe seu nome.')
    expect(errors.message).toMatch(/pelo menos/)
  })

  it('aplica os limites mínimos e máximos', () => {
    const errors = validateContact({
      name: 'A',
      company: 'x'.repeat(FIELD_LIMITS.companyMax + 1),
      subject: validValues.subject,
      message: 'x'.repeat(FIELD_LIMITS.messageMax + 1),
    })

    expect(errors.name).toMatch(/pelo menos 2/)
    expect(errors.company).toMatch(/no máximo 80/)
    expect(errors.message).toMatch(/no máximo 600/)
    expect(
      validateContact({ ...validValues, name: 'x'.repeat(FIELD_LIMITS.nameMax + 1) }).name,
    ).toMatch(/no máximo 80/)
  })

  it('rejeita assuntos fora da lista', () => {
    expect(validateContact({ ...validValues, subject: 'Assunto inventado' }).subject).toBe(
      'Selecione uma das opções disponíveis.',
    )
  })

  it('aceita emojis e caracteres especiais no conteúdo', () => {
    expect(
      validateContact({
        ...validValues,
        name: 'José D’Ávila 😀',
        message: 'Dúvida sobre ICMS & ISS <urgente>\nObrigado! 🙏',
      }),
    ).toEqual({})
  })
})
