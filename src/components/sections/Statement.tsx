import { Fragment, useRef } from 'react'
import {
  END_HOLD_RATIO,
  ENTRY_DURATION,
  ENTRY_EASE,
  ENTRY_OFFSET_Y,
  ENTRY_STAGGER,
  ENTRY_START,
  PIN_LENGTH_VH,
  PIN_START,
  REDUCED_MOTION_QUERY,
  REVEAL_FROM_COLOR_VAR,
  REVEAL_TO_COLOR_VAR,
  SCRUB_SMOOTHING,
  WORD_OVERLAP,
} from '../../config/motion'
import { SECTION_IDS } from '../../content/navigation'
import { STATEMENT } from '../../content/statement'
import { gsap, useGSAP } from '../../lib/gsap'
import { readCssVar } from '../../utils/css'

const TRAIL_WORDS = STATEMENT.trail.text.split(' ')
const FULL_PARAGRAPH = `${STATEMENT.lead.text} ${STATEMENT.trail.text}`

export function Statement() {
  const scope = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const paragraph = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(REDUCED_MOTION_QUERY, () => {
        const entryTargets = [heading.current, paragraph.current]
        gsap.set(entryTargets, { willChange: 'transform' })
        gsap.from(entryTargets, {
          opacity: 0,
          y: ENTRY_OFFSET_Y,
          duration: ENTRY_DURATION,
          ease: ENTRY_EASE,
          stagger: ENTRY_STAGGER,
          scrollTrigger: {
            trigger: scope.current,
            start: ENTRY_START,
            once: true,
          },
          onComplete: () => {
            gsap.set(entryTargets, { clearProps: 'willChange' })
          },
        })

        const words = gsap.utils.toArray<HTMLElement>('[data-word]')
        const from = readCssVar(REVEAL_FROM_COLOR_VAR)
        const to = readCssVar(REVEAL_TO_COLOR_VAR)
        const revealEnd = words.length - 1 + WORD_OVERLAP
        const holdDuration = revealEnd / (1 - END_HOLD_RATIO) - revealEnd

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: scope.current,
            start: PIN_START,
            end: `+=${PIN_LENGTH_VH}%`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: SCRUB_SMOOTHING,
            invalidateOnRefresh: true,
          },
        })

        words.forEach((word, index) => {
          timeline.fromTo(
            word,
            { color: from },
            { color: to, duration: WORD_OVERLAP },
            index,
          )
        })
        timeline.to({}, { duration: holdDuration }, revealEnd)
      })

      return () => mm.revert()
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id={SECTION_IDS.about}
      className="flex items-center justify-center bg-surface px-gutter py-24 motion-safe:h-svh motion-safe:scroll-mt-0 motion-safe:pt-(--header-height) motion-safe:pb-0 md:px-gutter-lg"
    >
      <div className="mx-auto flex w-full max-w-hero flex-col items-center gap-6 text-center md:gap-7.5">
        <h2
          ref={heading}
          className="font-heading text-statement-heading font-semibold text-balance text-brand md:leading-statement-heading-md"
        >
          {STATEMENT.heading}
        </h2>
        <p
          ref={paragraph}
          className="font-ui text-statement-lede font-medium text-pretty text-ink capitalize md:max-w-statement-lede md:leading-statement-lede-md"
        >
          <span className="sr-only">{FULL_PARAGRAPH}</span>
          <span aria-hidden="true">
            {STATEMENT.lead.text}{' '}
            {TRAIL_WORDS.map((word, index) => (
              <Fragment key={index}>
                <span data-word className="motion-safe:text-muted">
                  {word}
                </span>
                {index < TRAIL_WORDS.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        </p>
      </div>
    </section>
  )
}
