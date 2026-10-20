import { SECTION_IDS } from '../content/navigation'
import type { PendingSectionId, SectionId } from '../types/navigation'

export const toAnchor = (sectionId: SectionId | PendingSectionId): string =>
  sectionId === SECTION_IDS.home ? '/' : `/#${sectionId}`
