/**
 * Decide qual seção está ativa a partir das posições medidas.
 *
 * - `sections`: lista ordenada de { id, top, bottom } relativos à viewport.
 * - `probeLine`: linha horizontal (px) usada como referência de leitura.
 * - `atPageEnd`: true quando a página chegou ao fim da rolagem.
 * - `viewportHeight`: altura visível da janela.
 *
 * A seção ativa é a que contém a linha de referência. No fim da página,
 * a última seção vence se estiver visível, pois ela pode não alcançar a linha.
 * Retorna '' quando nenhuma seção corresponde (ex.: no topo da página).
 */
export function getActiveSectionId(
  sections,
  probeLine,
  { atPageEnd = false, viewportHeight = Infinity } = {},
) {
  const last = sections.at(-1)

  if (atPageEnd && last && last.top < viewportHeight && last.bottom > 0) {
    return last.id
  }

  const current = sections.find(
    ({ top, bottom }) => top <= probeLine && bottom > probeLine,
  )

  return current ? current.id : ''
}
