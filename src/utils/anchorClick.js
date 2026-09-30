const PRIMARY_BUTTON = 0

/** Extrai o id de um hash ("#contato" -> "contato"); '' se não houver. */
export function getHashSectionId(hash) {
  if (typeof hash !== 'string' || !hash.startsWith('#') || hash.length < 2) {
    return ''
  }

  try {
    return decodeURIComponent(hash.slice(1))
  } catch {
    return ''
  }
}

/**
 * Indica se o clique deve ser tratado como navegação interna na página.
 * Cliques com modificadores, botões auxiliares, eventos já cancelados,
 * downloads e links que abrem outra janela seguem o comportamento nativo.
 */
export function shouldHandleAnchorClick(event, link) {
  if (!link || event.defaultPrevented || event.button !== PRIMARY_BUTTON) {
    return false
  }

  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false
  }

  const target = link.getAttribute('target')

  if ((target && target !== '_self') || link.hasAttribute('download')) {
    return false
  }

  return (link.getAttribute('href') ?? '').startsWith('#')
}
