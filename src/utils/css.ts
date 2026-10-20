import type { CSSProperties } from 'react'

export const readCssVar = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export const MASK_ICON_CLASS =
  'block shrink-0 bg-current mask-contain mask-center mask-no-repeat'

export const maskStyle = (src: string): CSSProperties => ({
  maskImage: `url("${src}")`,
})
