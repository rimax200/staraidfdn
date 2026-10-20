export interface ProgramImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Program {
  id: string
  title: string
  image: ProgramImage
}
