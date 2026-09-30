import { useEffect, useRef, useState } from 'react'
import { navigation, sectionIds } from '../../config/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { classNames } from '../../utils/classNames'
import Container from '../ui/Container'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import WhatsAppButton from '../ui/WhatsAppButton'
import styles from './Header.module.css'

const DESKTOP_QUERY = '(min-width: 900px)'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    const desktopMedia = window.matchMedia(DESKTOP_QUERY)
    const handleMediaChange = (event) => {
      if (event.matches) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    desktopMedia.addEventListener('change', handleMediaChange)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktopMedia.removeEventListener('change', handleMediaChange)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo />

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          <span className={styles.srOnly}>
            {menuOpen ? 'Fechar menu' : 'Abrir menu'}
          </span>
        </button>

        <nav
          id="menu-principal"
          className={classNames(styles.nav, menuOpen && styles.navOpen)}
          aria-label="Principal"
        >
          <ul className={styles.list}>
            {navigation.map(({ id, label }) => (
              <li key={id}>
                <a
                  className={classNames(
                    styles.link,
                    activeId === id && styles.linkActive,
                  )}
                  href={`#${id}`}
                  aria-current={activeId === id ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <WhatsAppButton size="sm" className={styles.cta} onClick={closeMenu}>
            Falar no WhatsApp
          </WhatsAppButton>
        </nav>
      </Container>
    </header>
  )
}
