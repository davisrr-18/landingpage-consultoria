import { hero } from '../../config/site'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import WhatsAppButton from '../ui/WhatsAppButton'
import HeroPanel from './HeroPanel'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section
      id="inicio"
      className={styles.hero}
      aria-labelledby="inicio-titulo"
      tabIndex={-1}
    >
      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="inicio-titulo" className={styles.title}>
            {hero.title}{' '}
            <span className={styles.highlight}>{hero.highlight}</span>
          </h1>
          <p className={styles.description}>{hero.description}</p>

          <div className={styles.actions}>
            <WhatsAppButton size="lg">Falar no WhatsApp</WhatsAppButton>
            <Button
              href="#servicos"
              variant="outlineLight"
              size="lg"
              icon="arrow"
            >
              Conheça os serviços
            </Button>
          </div>

          <ul className={styles.highlights}>
            {hero.highlights.map((text) => (
              <li key={text} className={styles.highlightItem}>
                <Icon name="check" size={18} className={styles.highlightIcon} />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={2} className={styles.visual}>
          <HeroPanel />
        </Reveal>
      </Container>
    </section>
  )
}
