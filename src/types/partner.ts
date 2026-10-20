export interface PartnerLogo {
  src: string
  alt: string
  width: number
  height: number
}

export interface Partner {
  label: string
  heading: string
  name: string
  location: string
  caption: string
  logo: PartnerLogo
  title: string
  paragraph: string
  areasTitle: string
  areas: readonly string[]
  button: { label: string; href: string }
  newTabNote: string
}
