import type { PendingSectionId, SectionId } from './navigation'

export interface FooterLink {
  label: string
  sectionId: SectionId | PendingSectionId
  pending?: boolean
}

export interface FooterColumn {
  title: string
  links: readonly FooterLink[]
}

export type NewsletterError = 'required' | 'invalid' | 'tooLong'
export type NewsletterStatus = 'idle' | 'submitting' | 'success' | 'error'
