import { about } from '../../config/site'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import Section from '../ui/Section'
import styles from './About.module.css'

export default function About() {
  const { paragraphs, pillars, process } = about

  return (
    <Section id="sobre" tone="surface" eyebrow={about.eyebrow} title={about.title}>
      <div className={styles.layout}>
        <Reveal className={styles.text}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <ul className={styles.pillars}>
            {pillars.map((pillar) => (
              <li key={pillar} className={styles.pillar}>
                <span className={styles.pillarIcon}>
                  <Icon name="check" size={16} />
                </span>
                {pillar}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={2} className={styles.process}>
          <h3 className={styles.processTitle}>{process.title}</h3>
          <ol className={styles.steps}>
            {process.steps.map(({ title, description }, index) => (
              <li key={title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h4 className={styles.stepTitle}>{title}</h4>
                  <p className={styles.stepDescription}>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
