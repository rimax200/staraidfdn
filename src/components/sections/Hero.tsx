import { useRef } from 'react'
import { HERO } from '../../content/hero'
import { SECTION_IDS } from '../../content/navigation'
import { gsap, useGSAP } from '../../lib/gsap'
import { toAnchor } from '../../utils/anchor'
import { ArrowRightIcon } from '../ui/ArrowRightIcon'
import { Button } from '../ui/Button'

const SRC_SET = HERO.image.sources
  .map((source) => `${source.src} ${source.width}w`)
  .join(', ')

// React 18 only forwards the lowercase attribute.
const HIGH_PRIORITY = { fetchpriority: 'high' }

const FALLBACK_SRC = HERO.image.sources[HERO.image.sources.length - 1]?.src

export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(content.current, {
          opacity: 0,
          y: HERO.animation.offsetY,
          duration: HERO.animation.duration,
          ease: 'power2.out',
        })
      })
      return () => mm.revert()
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id={SECTION_IDS.home}
      className="relative h-svh overflow-hidden bg-page"
    >
      <img
        src={FALLBACK_SRC}
        srcSet={SRC_SET}
        sizes={HERO.image.sizes}
        width={HERO.image.width}
        height={HERO.image.height}
        alt={HERO.image.alt}
        {...HIGH_PRIORITY}
        decoding="async"
        className="absolute inset-0 size-full object-cover object-(--object-position-hero) md:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-(image:--gradient-hero-overlay) opacity-(--opacity-overlay-mobile) md:opacity-(--opacity-overlay)"
      />
      <div className="relative flex h-full flex-col justify-end px-gutter pb-15 md:px-gutter-lg">
        <div ref={content} className="mx-auto w-full max-w-hero">
          <div className="flex flex-col gap-5">
            <h1 className="-mb-1 bg-(image:--gradient-hero-title) bg-clip-text pb-1 font-heading text-hero-title font-semibold text-transparent">
              {HERO.title}
            </h1>
            <p className="max-w-hero-lede font-body text-hero-lede text-hero-muted">
              {HERO.description}
            </p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Button
                href={toAnchor(HERO.primaryCta.sectionId)}
                variant="primary"
              >
                {HERO.primaryCta.label}
              </Button>
              <Button
                href={toAnchor(HERO.secondaryCta.sectionId)}
                variant="secondary"
                icon={<ArrowRightIcon />}
              >
                {HERO.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
