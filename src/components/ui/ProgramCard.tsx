import type { Program } from '../../types/programs'

interface ProgramCardProps {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  const { title, image } = program

  return (
    <article
      aria-label={title}
      data-card
      className="aspect-square w-(--width-card-mobile) shrink-0 snap-start overflow-hidden rounded-card md:w-(--size-card)"
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="size-full object-cover"
      />
    </article>
  )
}
