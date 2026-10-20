import { useRef } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import {
  ENTRY_STAGGER,
  PARTNER_CARD_STACKED_START,
  PARTNER_CARDS_START,
  PARTNER_HEADER_START,
  PARTNER_WIDE_QUERY,
  REDUCED_MOTION_QUERY,
  REVEAL_STAGGER,
} from '../../config/motion'
import { SECTION_IDS } from '../../content/navigation'
import { PARTNER } from '../../content/partner'
import { gsap, useGSAP } from '../../lib/gsap'
import { reveal } from '../../lib/reveal'
import { ArrowRightIcon } from '../ui/ArrowRightIcon'
import { Button } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'

const HEADING_ID = 'partner-heading'
const CARD =
  'rounded-3xl border border-partner-border bg-faq-surface p-6 shadow-partner-card md:p-8 lg:min-h-115'
const CARD_TITLE = 'font-heading text-partner-title font-semibold text-action'

export function Partner() {
  const scope = useRef<HTMLElement>(null)
  const header = useRef<HTMLDivElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const identityCard = useRef<HTMLDivElement>(null)
  const detailsCard = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { motion: REDUCED_MOTION_QUERY, wide: PARTNER_WIDE_QUERY },
        (context) => {
          const { motion, wide } = context.conditions as {
            motion: boolean
            wide: boolean
          }
          const left = identityCard.current
          const right = detailsCard.current
          if (!motion || !scope.current || !row.current || !left || !right)
            return

          reveal(gsap.utils.toArray<Element>(header.current?.children ?? []), {
            trigger: scope.current,
            start: PARTNER_HEADER_START,
            stagger: ENTRY_STAGGER,
          })

          if (wide) {
            reveal([left, right], {
              trigger: row.current,
              start: PARTNER_CARDS_START,
              stagger: REVEAL_STAGGER,
            })
          } else {
            for (const card of [left, right]) {
              reveal([card], {
                trigger: card,
                start: PARTNER_CARD_STACKED_START,
              })
            }
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
      id={SECTION_IDS.partner}
      aria-labelledby={HEADING_ID}
      className="bg-surface px-gutter py-12 md:px-15"
    >
      <div className="mx-auto flex w-full max-w-hero flex-col gap-10 md:gap-12.5">
        <div
          ref={header}
          className="mx-auto flex w-full max-w-content flex-col gap-4 md:flex-row-reverse md:items-start md:justify-between"
        >
          <div>
            <SectionLabel>{PARTNER.label}</SectionLabel>
          </div>
          <h2
            id={HEADING_ID}
            className="font-serif text-section-heading font-medium text-on-surface md:max-w-programs-heading"
          >
            {PARTNER.heading}
          </h2>
        </div>
        <div
          ref={row}
          className="grid gap-5 lg:grid-cols-[var(--width-partner-card)_minmax(0,1fr)]"
        >
          <div
            ref={identityCard}
            className={`${CARD} flex flex-col items-center justify-center gap-1`}
          >
            <img
              src={PARTNER.logo.src}
              alt={PARTNER.logo.alt}
              width={PARTNER.logo.width}
              height={PARTNER.logo.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-(--size-partner-logo) max-w-full"
            />
            <p className="text-center font-ui text-partner-name font-semibold text-ink capitalize">
              {PARTNER.name}
            </p>
            <p className="flex w-full max-w-partner-pill items-center justify-center gap-2.5 rounded-xl bg-surface px-4 py-2.75 font-ui text-base font-medium text-partner-text">
              <FaLocationDot aria-hidden="true" className="size-7 shrink-0" />
              {PARTNER.location}
            </p>
            <p className="text-center font-ui text-base text-partner-text">
              {PARTNER.caption}
            </p>
          </div>
          <div ref={detailsCard} className={`${CARD} flex flex-col gap-3`}>
            <div className="flex flex-col gap-2">
              <h3 className={CARD_TITLE}>{PARTNER.title}</h3>
              <p className="font-ui text-step-body text-partner-text">
                {PARTNER.paragraph}
              </p>
            </div>
            <h3 className={CARD_TITLE}>{PARTNER.areasTitle}</h3>
            <ul className="flex list-disc flex-col gap-4.5 pl-6 font-heading text-base leading-snug font-medium text-text-soft marker:text-text-soft">
              {PARTNER.areas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <Button
              href={PARTNER.button.href}
              external
              variant="partner"
              icon={<ArrowRightIcon />}
              className="mt-auto w-full md:w-auto md:self-end"
            >
              {PARTNER.button.label}
              <span className="sr-only">{PARTNER.newTabNote}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
