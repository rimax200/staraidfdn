import { useRef, useSyncExternalStore } from 'react'
import {
  ENTRY_DURATION,
  ENTRY_EASE,
  ENTRY_OFFSET_Y,
  ENTRY_STAGGER,
  IMAGE_FADE_DURATION,
  IMAGE_SCALE_FROM,
  PIN_START,
  REASONS_ENTRY_START,
  REASONS_FALLBACK_END,
  REASONS_FALLBACK_QUERY,
  REASONS_FALLBACK_START,
  REASONS_PIN_QUERY,
  REDUCED_MOTION_ACTIVE_QUERY,
  STEP_SCROLL_VH,
  STEP_TRANSITION_DURATION,
  STEP_TRANSITION_EASE,
} from '../../config/motion'
import { SECTION_IDS } from '../../content/navigation'
import { REASONS } from '../../content/reasons'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { ReasonStep } from '../ui/ReasonStep'
import { SectionLabel } from '../ui/SectionLabel'

type GoTo = (index: number, instant?: boolean) => void

const subscribeToReducedMotion = (onChange: () => void) => {
  const query = matchMedia(REDUCED_MOTION_ACTIVE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const prefersReducedMotion = () =>
  matchMedia(REDUCED_MOTION_ACTIVE_QUERY).matches
const noReducedMotionOnServer = () => false

export function Reasons() {
  const scope = useRef<HTMLElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const marker = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLDivElement>(null)
  const tail = useRef<HTMLDivElement>(null)
  const highlight = useRef<HTMLDivElement>(null)
  const goToRef = useRef<GoTo>()

  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    prefersReducedMotion,
    noReducedMotionOnServer,
  )

  useGSAP(
    () => {
      const listEl = list.current
      const markerEl = marker.current
      const fillEl = fill.current
      const tailEl = tail.current
      const highlightEl = highlight.current
      if (!listEl || !markerEl || !fillEl || !tailEl || !highlightEl) return

      const steps = gsap.utils.toArray<HTMLElement>('[data-step]')
      const images = gsap.utils.toArray<HTMLElement>('[data-reason-image]')
      const count = steps.length
      let active = -1

      const goTo: GoTo = (index, instant = false) => {
        const previous = active
        active = index
        steps.forEach((step, i) => {
          step.dataset.active = String(i === index)
          if (i === index) step.setAttribute('aria-current', 'step')
          else step.removeAttribute('aria-current')
        })
        markerEl.textContent = String(index + 1)

        const origin = listEl.getBoundingClientRect()
        const box = steps[index]?.getBoundingClientRect()
        const title = steps[index]
          ?.querySelector('[data-step-title]')
          ?.getBoundingClientRect()
        if (!box || !title) return

        const center = title.top - origin.top + title.height / 2
        const trackHeight = fillEl.offsetHeight
        const move = {
          duration: instant ? 0 : STEP_TRANSITION_DURATION,
          ease: STEP_TRANSITION_EASE,
          overwrite: 'auto' as const,
        }
        gsap.to(markerEl, { y: center - markerEl.offsetHeight / 2, ...move })
        gsap.to(tailEl, { y: center, ...move })
        gsap.to(fillEl, { scaleY: Math.min(1, center / trackHeight), ...move })
        gsap.to(highlightEl, {
          y: box.top - origin.top,
          height: box.height,
          ...move,
        })

        images.forEach((image, i) => {
          const fade = {
            duration: instant ? 0 : IMAGE_FADE_DURATION,
            ease: STEP_TRANSITION_EASE,
            overwrite: 'auto' as const,
          }
          if (i !== index) {
            gsap.to(image, { opacity: 0, ...fade })
          } else if (instant || previous === -1) {
            gsap.to(image, { opacity: 1, scale: 1, ...fade })
          } else {
            gsap.fromTo(
              image,
              { scale: IMAGE_SCALE_FROM },
              { opacity: 1, scale: 1, ...fade },
            )
          }
        })
      }
      goToRef.current = goTo

      const indexAt = (progress: number) =>
        Math.min(count - 1, Math.floor(progress * count))

      const mm = gsap.matchMedia()
      mm.add(
        {
          pinned: REASONS_PIN_QUERY,
          fallback: REASONS_FALLBACK_QUERY,
          reduced: REDUCED_MOTION_ACTIVE_QUERY,
        },
        (context) => {
          const { pinned, fallback } = context.conditions as {
            pinned: boolean
            fallback: boolean
          }
          goTo(0, true)
          if (!pinned && !fallback) return

          const entryTargets = gsap.utils.toArray<HTMLElement>('[data-entry]')
          gsap.set(entryTargets, { willChange: 'transform' })
          gsap.from(entryTargets, {
            opacity: 0,
            y: ENTRY_OFFSET_Y,
            duration: ENTRY_DURATION,
            ease: ENTRY_EASE,
            stagger: ENTRY_STAGGER,
            scrollTrigger: {
              trigger: scope.current,
              start: REASONS_ENTRY_START,
              once: true,
            },
            onComplete: () => {
              gsap.set(entryTargets, { clearProps: 'willChange' })
            },
          })

          let lastProgress = 0
          const trigger = ScrollTrigger.create({
            trigger: scope.current,
            ...(pinned
              ? {
                  start: PIN_START,
                  end: `+=${count * STEP_SCROLL_VH}%`,
                  pin: true,
                  pinSpacing: true,
                  anticipatePin: 1,
                }
              : { start: REASONS_FALLBACK_START, end: REASONS_FALLBACK_END }),
            onUpdate: (self) => {
              const next = indexAt(self.progress)
              const jumped = Math.abs(self.progress - lastProgress) > 1 / count
              lastProgress = self.progress
              if (next !== active) goTo(next, jumped)
            },
            onRefresh: (self) => goTo(indexAt(self.progress), true),
          })
          goTo(indexAt(trigger.progress), true)
        },
      )

      return () => mm.revert()
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id={SECTION_IDS.whyPartner}
      className="bg-surface motion-safe:tall:h-svh motion-safe:tall:pt-(--header-height)"
    >
      <div className="flex h-full flex-col justify-center gap-(--reasons-gap) px-(--content-inset) py-(--reasons-y)">
        <div className="flex flex-col gap-4 md:flex-row-reverse md:items-start md:justify-between">
          <div data-entry>
            <SectionLabel>{REASONS.label}</SectionLabel>
          </div>
          <h2
            data-entry
            className="font-serif text-section-heading font-normal text-on-surface md:max-w-programs-heading lg:max-w-none"
          >
            {REASONS.heading}
          </h2>
        </div>
        <div className="flex flex-col gap-(--reasons-step) lg:flex-row lg:gap-11.75">
          <div
            data-entry
            className="relative h-(--height-reasons-image-sm) w-full shrink-0 overflow-hidden rounded-image lg:h-(--height-reasons-image) lg:w-(--width-reasons-image)"
          >
            {REASONS.reasons.map(({ id, image }) => (
              <img
                key={id}
                data-reason-image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover opacity-0 first:opacity-100"
              />
            ))}
          </div>
          <div data-entry className="flex flex-1 gap-3 md:gap-5.5">
            <div aria-hidden="true" className="relative w-7 shrink-0 md:w-8.5">
              <div className="absolute inset-x-0 top-0 bottom-(--reasons-step) mx-auto w-1.25 overflow-hidden rounded-full bg-track">
                <div
                  ref={fill}
                  className="h-full origin-top scale-y-0 bg-progress"
                />
                <div
                  ref={tail}
                  className="absolute inset-x-0 top-0 h-20 bg-(image:--gradient-progress-tail)"
                />
              </div>
              <div
                ref={marker}
                className="absolute top-0 left-0 flex size-7 items-center justify-center rounded-full bg-progress font-ui text-marker font-semibold text-on-dark md:size-8.5"
              />
            </div>
            <div ref={list} className="relative flex-1">
              <div
                ref={highlight}
                aria-hidden="true"
                className="absolute inset-x-0 top-0 rounded-highlight border-8 border-surface bg-surface-highlight shadow-highlight"
              />
              <ol
                aria-label={REASONS.listLabel}
                className="relative flex flex-col gap-2 md:gap-5"
              >
                {REASONS.reasons.map((reason, index) => (
                  <ReasonStep
                    key={reason.id}
                    reason={reason}
                    index={index}
                    interactive={reduced}
                    onSelect={(i) => goToRef.current?.(i, true)}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
