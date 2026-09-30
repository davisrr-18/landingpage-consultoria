/** Junta nomes de classe ignorando valores vazios. */
export function classNames(...names) {
  return names.filter(Boolean).join(' ')
}
