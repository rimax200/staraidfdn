import { useRef } from 'react'
import {
  ENTRY_STAGGER,
  RECOGNITION_BANNER_START,
  RECOGNITION_CARD_STACKED_START,
  RECOGNITION_CARDS_START,
  RECOGNITION_HEADER_START,
  RECOGNITION_WIDE_QUERY,
  REDUCED_MOTION_QUERY,
  REVEAL_STAGGER,
} from '../../config/motion'
import { SECTION_IDS } from '../../content/navigation'
import { RECOGNITION } from '../../content/recognition'
import { gsap, useGSAP } from '../../lib/gsap'
import { reveal } from '../../lib/reveal'
import { toAnchor } from '../../utils/anchor'
import { ArrowRightIcon } from '../ui/ArrowRightIcon'
import { Button } from '../ui/Button'
import { GroupCard } from '../ui/GroupCard'
import { SectionLabel } from '../ui/SectionLabel'

const HEADING_ID = 'recognition-heading'
const { banner } = RECOGNITION

export function Recognition() {
  const scope = useRef<HTMLElement>(null)
  const header = useRef<HTMLDivElement>(null)
  const cardRow = useRef<HTMLDivElement>(null)
  const bannerEl = useRef<HTMLDivElement>(null)
  const photo = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { motion: REDUCED_MOTION_QUERY, wide: RECOGNITION_WIDE_QUERY },
        (context) => {
          const { motion, wide } = context.conditions as {
            motion: boolean
            wide: boolean
          }
          if (!motion || !scope.current) return

          reveal(gsap.utils.toArray<Element>(header.current?.children ?? []), {
            trigger: scope.current,
            start: RECOGNITION_HEADER_START,
            stagger: ENTRY_STAGGER,
          })

          const cards = gsap.utils.toArray<Element>('[data-reveal-card]')
          if (wide && cardRow.current) {
            reveal(cards, {
              trigger: cardRow.current,
              start: RECOGNITION_CARDS_START,
              stagger: REVEAL_STAGGER,
            })
          } else {
            cards.forEach((card) =>
              reveal([card], {
                trigger: card,
                start: RECOGNITION_CARD_STACKED_START,
              }),
            )
          }

          if (bannerEl.current && photo.current) {
            reveal([bannerEl.current], {
              trigger: bannerEl.current,
              start: RECOGNITION_BANNER_START,
              photo: photo.current,
            })
          }
        },
      )
      return () => mm.revert()
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id={SECTION_IDS.recognition}
      aria-labelledby={HEADING_ID}
      className="bg-ink px-gutter py-12 text-on-dark md:px-15 md:py-15.5"
    >
      <div className="mx-auto flex w-full max-w-recognition flex-col gap-10 md:gap-20">
        <div
          ref={header}
          className="flex max-w-content flex-col gap-4 md:flex-row-reverse md:items-start md:justify-between"
        >
          <div>
            <SectionLabel className="text-on-dark">
              {RECOGNITION.label}
            </SectionLabel>
          </div>
          <h2
            id={HEADING_ID}
            className="font-serif text-section-heading font-medium text-on-dark md:max-w-programs-heading"
          >
            {RECOGNITION.heading}
          </h2>
        </div>
        <div ref={cardRow} className="grid gap-5 lg:grid-cols-3">
          {RECOGNITION.groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
        <div
          ref={bannerEl}
          className="relative flex min-h-(--height-banner-sm) flex-col justify-end overflow-hidden rounded-banner md:min-h-(--height-banner)"
        >
          <img
            ref={photo}
            src={banner.image.src}
            alt={banner.image.alt}
            width={banner.image.width}
            height={banner.image.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-(--object-position-banner)"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-(image:--gradient-banner-overlay)"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-(image:--gradient-banner-overlay-mobile) md:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 flex shadow-banner-inset"
          >
            {banner.glassOpacities.map((opacity, index) => (
              <div
                key={index}
                style={{ opacity }}
                className="h-full flex-1 bg-(image:--gradient-banner-strip) backdrop-blur-sm"
              />
            ))}
          </div>
          <div className="relative flex w-full max-w-banner-content flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-12.5">
            <div className="flex max-w-banner-title flex-col gap-5">
              <h3 className="font-heading text-banner-title font-semibold text-on-dark">
                {banner.title}
              </h3>
              <p className="max-w-banner-text font-body text-banner-text text-on-dark-soft">
                {banner.text}
              </p>
            </div>
            <Button
              href={toAnchor(banner.button.sectionId)}
              variant="primary"
              icon={<ArrowRightIcon />}
              className="w-full shrink-0 md:w-auto"
            >
              {banner.button.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
