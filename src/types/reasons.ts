export interface ReasonImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Reason {
  id: string
  step: string
  title: string
  body: string
  image: ReasonImage
}
