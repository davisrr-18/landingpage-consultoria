import { benefits } from '../../config/site'
import FeatureGrid from '../ui/FeatureGrid'
import Section from '../ui/Section'

export default function Benefits() {
  return (
    <Section
      id="diferenciais"
      tone="dark"
      eyebrow={benefits.eyebrow}
      title={benefits.title}
      description={benefits.description}
    >
      <FeatureGrid items={benefits.items} variant="dark" />
    </Section>
  )
}
