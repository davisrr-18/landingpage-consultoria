import { callToAction } from '../../config/site'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import WhatsAppButton from '../ui/WhatsAppButton'
import styles from './CallToAction.module.css'

export default function CallToAction() {
  return (
    <section className={styles.section} aria-labelledby="cta-titulo">
      <Container>
        <Reveal className={styles.banner}>
          <div className={styles.text}>
            <h2 id="cta-titulo" className={styles.title}>
              {callToAction.title}
            </h2>
            <p className={styles.description}>{callToAction.description}</p>
          </div>
          <div className={styles.actions}>
            <WhatsAppButton size="lg">Iniciar conversa</WhatsAppButton>
            <Button href="#contato" variant="outlineLight" size="lg">
              Usar o formulário
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
