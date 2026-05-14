import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { HowItWorks } from '../components/HowItWorks'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <Footer />
    </>
  )
}

export default HomePage