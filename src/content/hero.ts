import type { NavLink } from '../types/navigation'
import hero828 from '../assets/images/hero-828.webp'
import hero1536 from '../assets/images/hero-1536.webp'
import hero3024 from '../assets/images/hero-3024.webp'
import { SECTION_IDS } from './navigation'

interface HeroImageSource {
  src: string
  width: number
}

interface HeroContent {
  title: string
  description: string
  primaryCta: NavLink
  secondaryCta: NavLink
  image: {
    alt: string
    width: number
    height: number
    sizes: string
    sources: readonly HeroImageSource[]
  }
  animation: {
    duration: number
    offsetY: number
  }
}

export const HERO: HeroContent = {
  title: 'Every Student Deserves to Finish.',
  description:
    'STARAID supports brilliant students and underserved communities across Nigeria with scholarships, upkeep, healthcare',
  primaryCta: {
    label: 'Become a corporate sponsor',
    sectionId: SECTION_IDS.contact,
  },
  secondaryCta: { label: 'See our work', sectionId: SECTION_IDS.programs },
  image: {
    alt: 'A schoolboy in a blue uniform saluting the camera, surrounded by other pupils',
    width: 3024,
    height: 2016,
    sizes: 'max(100vw, 150vh)',
    sources: [
      { src: hero828, width: 828 },
      { src: hero1536, width: 1536 },
      { src: hero3024, width: 3024 },
    ],
  },
  animation: { duration: 0.8, offsetY: 24 },
}
