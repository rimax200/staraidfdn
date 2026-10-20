export type SectionId =
  | 'home'
  | 'about'
  | 'programs'
  | 'why-partner'
  | 'impact'
  | 'recognition'
  | 'faq'
  | 'partner'
  | 'contact'

export interface NavLink {
  label: string
  sectionId: SectionId
}

export type PendingSectionId = 'news' | 'volunteer'
