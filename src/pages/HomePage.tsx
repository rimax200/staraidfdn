import { Footer } from '../components/layout/Footer'
import { Contact } from '../components/sections/Contact'
import { Faq } from '../components/sections/Faq'
import { Hero } from '../components/sections/Hero'
import { Impact } from '../components/sections/Impact'
import { Partner } from '../components/sections/Partner'
import { Programs } from '../components/sections/Programs'
import { Reasons } from '../components/sections/Reasons'
import { Recognition } from '../components/sections/Recognition'
import { Statement } from '../components/sections/Statement'

export function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Statement />
        <Programs />
        <Reasons />
        <Recognition />
        <Impact />
        <Faq />
        <Partner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
