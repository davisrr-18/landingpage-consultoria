import { services } from '../../config/site'
import FeatureGrid from '../ui/FeatureGrid'
import Section from '../ui/Section'

export default function Services() {
  return (
    <Section
      id="servicos"
      eyebrow={services.eyebrow}
      title={services.title}
      description={services.description}
    >
      <FeatureGrid items={services.items} />
    </Section>
  )
}
