export interface NoticeSegment {
  text: string
  emphasis?: boolean
  href?: string
}

export interface DonateRowLogo {
  src: string
  width: number
  height: number
}

export interface DonateRow {
  id: string
  label: string
  value: string
  logo?: DonateRowLogo
}

export interface BackgroundVariant {
  src: string
  width: number
}

export interface DonateContent {
  meta: { title: string; description: string }
  heading: readonly string[]
  paragraph: string
  cardTitle: string
  rows: readonly DonateRow[]
  accountNumber: { label: string; value: string }
  notice: { segments: readonly NoticeSegment[] }
  copy: {
    label: string
    copied: string
    failed: string
    copiedVisible: string
    resetMs: number
  }
  background: {
    variants: readonly BackgroundVariant[]
    fallbackSrc: string
    width: number
    height: number
    sizes: string
  }
}
