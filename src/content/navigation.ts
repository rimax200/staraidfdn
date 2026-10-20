import type { NavLink, SectionId } from '../types/navigation'

export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  programs: 'programs',
  whyPartner: 'why-partner',
  impact: 'impact',
  recognition: 'recognition',
  faq: 'faq',
  partner: 'partner',
  contact: 'contact',
} as const satisfies Record<string, SectionId>

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', sectionId: SECTION_IDS.home },
  { label: 'About', sectionId: SECTION_IDS.about },
  { label: 'Programs', sectionId: SECTION_IDS.programs },
  { label: 'Why partner', sectionId: SECTION_IDS.whyPartner },
  { label: 'Impact', sectionId: SECTION_IDS.impact },
  { label: 'Recognition', sectionId: SECTION_IDS.recognition },
]

export const DONATE_LINK = {
  label: 'Donate Now',
  href: '/donate',
} as const

export const JOIN_GROUP_LINK: NavLink = {
  label: 'Join a group',
  sectionId: SECTION_IDS.contact,
}

export const PENDING_SECTION_IDS: readonly SectionId[] = []
