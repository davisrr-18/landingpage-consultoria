import { contact, siteConfig } from '../../config/site'
import { isWhatsappConfigured } from '../../services/whatsapp'
import ContactForm from '../contact/ContactForm'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import styles from './Contact.module.css'

const contactDetails = [
  {
    icon: 'mail',
    label: 'E-mail',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  { icon: 'clock', label: 'Horário', value: siteConfig.contact.hours },
  { icon: 'pin', label: 'Atendimento', value: siteConfig.contact.location },
]

export default function Contact() {
  const showDemoNotice = !isWhatsappConfigured()

  return (
    <Section
      id="contato"
      eyebrow={contact.eyebrow}
      title={contact.title}
      description={contact.description}
    >
      <div className={styles.layout}>
        <Reveal className={styles.info}>
          <ul className={styles.details}>
            {contactDetails.map(({ icon, label, value, href }) => (
              <li key={label} className={styles.detail}>
                <span className={styles.detailIcon}>
                  <Icon name={icon} size={22} />
                </span>
                <div>
                  <p className={styles.detailLabel}>{label}</p>
                  <p className={styles.detailValue}>
                    {href ? <a href={href}>{value}</a> : value}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {showDemoNotice && <p className={styles.notice}>{contact.demoNotice}</p>}
        </Reveal>

        <Reveal delay={2}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
