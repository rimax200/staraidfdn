import logo from '../assets/images/partner/voitheia-logo.webp'
import type { Partner } from '../types/partner'

const LOGO_SIZE = 500

export const PARTNER: Partner = {
  label: 'Organizational Synergy',
  heading: 'International Strategic Partner',
  name: 'Voitheia Inc.',
  location: 'California, USA (Antioch, CA)',
  caption: '501(c)(3) Faith-Based Non-Profit Public Charity',
  logo: {
    src: logo,
    alt: 'Voitheia Inc. logo',
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  title: 'Faith-Driven Compassion & Practical African Community Elevation',
  paragraph:
    'Voitheia Inc. is a California-based 501(c)(3) non-profit public charity dedicated to uplifting individuals and providing aid and relief to families and communities locally and globally. Anchored in faith, compassion, and practical service, Voitheia Inc. partners strategically with Star Aid Foundation to deliver vital digital technology, educational materials, and sustainable healthcare to students and communities across Nigeria and Africa.',
  areasTitle: 'Key Strategic Partnership Areas',
  areas: [
    'Transatlantic Student Tech & Software Access Linkage',
    'Community Free Medical & Optometric Outreach Missions',
    'Emergency Academic Relief & Tuition Safeguard Grants',
    'Youth Creative Arts, Digital Literacy & Mentorship Programs',
    'Holistic Community Welfare & Nutritional Sustenance',
  ],
  button: {
    label: 'Learn More at Voitheia.ngo',
    href: 'https://voitheia.ngo/',
  },
  newTabNote: ' (opens in a new tab)',
}
