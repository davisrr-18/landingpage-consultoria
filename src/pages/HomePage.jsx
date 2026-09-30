import About from '../components/sections/About'
import Benefits from '../components/sections/Benefits'
import CallToAction from '../components/sections/CallToAction'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'
import Header from '../components/sections/Header'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import SkipLink from '../components/ui/SkipLink'
import WhatsAppFloat from '../components/ui/WhatsAppFloat'
import { useSmoothAnchorScroll } from '../hooks/useSmoothAnchorScroll'

export default function HomePage() {
  useSmoothAnchorScroll()

  return (
    <>
      <SkipLink />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Services />
        <Benefits />
        <About />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
