import { describe, expect, it } from 'vitest'
import { getActiveSectionId } from './activeSection'

const sections = [
  { id: 'servicos', top: 700, bottom: 1500 },
  { id: 'diferenciais', top: 1500, bottom: 2300 },
  { id: 'sobre', top: 2300, bottom: 3100 },
  { id: 'contato', top: 3400, bottom: 4200 },
]

function shift(offset) {
  return sections.map((section) => ({
    ...section,
    top: section.top - offset,
    bottom: section.bottom - offset,
  }))
}

describe('getActiveSectionId', () => {
  it('não marca nenhuma seção enquanto o hero está em leitura', () => {
    expect(getActiveSectionId(sections, 250)).toBe('')
  })

  it('marca a seção que contém a linha de referência', () => {
    expect(getActiveSectionId(shift(600), 250)).toBe('servicos')
    expect(getActiveSectionId(shift(1400), 250)).toBe('diferenciais')
  })

  it('decide de forma determinística na fronteira entre seções vizinhas', () => {
    expect(getActiveSectionId(shift(1250), 250)).toBe('diferenciais')
    expect(getActiveSectionId(shift(1249), 250)).toBe('servicos')
    expect(getActiveSectionId(shift(1250), 250)).toBe(getActiveSectionId(shift(1250), 250))
  })

  it('não marca nada em áreas sem seção de navegação', () => {
    expect(getActiveSectionId(shift(3000), 250)).toBe('')
  })

  it('marca a última seção no fim da página quando ela está visível', () => {
    const atEnd = shift(3300)

    expect(getActiveSectionId(atEnd, 20, { atPageEnd: true, viewportHeight: 800 })).toBe(
      'contato',
    )
  })

  it('ignora o fim da página se a última seção não estiver visível', () => {
    expect(
      getActiveSectionId(shift(600), 250, { atPageEnd: true, viewportHeight: 800 }),
    ).toBe('servicos')
  })

  it('retorna vazio sem seções', () => {
    expect(getActiveSectionId([], 250, { atPageEnd: true })).toBe('')
  })
})
