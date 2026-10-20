import type { NavLink } from './navigation'

export interface RecognitionImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Group {
  id: string
  title: string
  description?: string
  tags: readonly string[]
  medal: RecognitionImage
  footerLabel: string
  compact?: boolean
}

export interface Banner {
  title: string
  text: string
  button: NavLink
  image: RecognitionImage
  glassOpacities: readonly number[]
}
