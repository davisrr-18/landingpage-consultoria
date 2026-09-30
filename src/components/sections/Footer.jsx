import { footer, navigation, siteConfig } from '../../config/site'
import Container from '../ui/Container'
import Logo from '../ui/Logo'
import styles from './Footer.module.css'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer id="rodape" className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo light />
            <p className={styles.about}>{siteConfig.description}</p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className={styles.heading}>Navegação</h2>
            <ul className={styles.list}>
              {navigation.map(({ id, label }) => (
                <li key={id}>
                  <a className={styles.link} href={`#${id}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.heading}>Contato</h2>
            <ul className={styles.list}>
              <li>
                <a
                  className={styles.link}
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.hours}</li>
              <li>{siteConfig.contact.location}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.disclaimer}</p>
          <p>
            © {currentYear} {siteConfig.name}. {siteConfig.isDemo && footer.demoNotice}
          </p>
        </div>
      </Container>
    </footer>
  )
}
