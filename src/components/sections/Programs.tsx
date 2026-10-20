import { useRef } from 'react'
import {
  ENTRY_DURATION,
  ENTRY_EASE,
  ENTRY_OFFSET_Y,
  PEEK_CAP_QUERY,
  PEEK_CAP_RATIO,
  PEEK_CARD_COUNT,
  PEEK_END,
  PEEK_ENTRY_START,
  PEEK_ENTRY_STAGGER,
  PEEK_RESET_END,
  PEEK_RESET_START,
  PEEK_SCRUB_SMOOTHING,
  PEEK_START,
  REDUCED_MOTION_QUERY,
} from '../../config/motion'
import { SECTION_IDS } from '../../content/navigation'
import { PROGRAMS } from '../../content/programs'
import { useDragScroll } from '../../hooks/useDragScroll'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { ProgramCard } from '../ui/ProgramCard'
import { SectionLabel } from '../ui/SectionLabel'

const RELEASE_EVENTS = ['pointerup', 'pointercancel', 'touchend'] as const

export function Programs() {
  const scope = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useDragScroll(track)

  useGSAP(
    () => {
      const trackEl = track.current
      if (!trackEl) return
      const mm = gsap.matchMedia()

      mm.add(REDUCED_MOTION_QUERY, () => {
        const visibleCards = gsap.utils
          .toArray<HTMLElement>('[data-card]')
          .filter((card) => card.getBoundingClientRect().left < innerWidth)
        const entryTargets = [
          ...gsap.utils.toArray<HTMLElement>('[data-entry]'),
          ...visibleCards,
        ]
        gsap.set(entryTargets, { willChange: 'transform' })
        gsap.from(entryTargets, {
          opacity: 0,
          y: ENTRY_OFFSET_Y,
          duration: ENTRY_DURATION,
          ease: ENTRY_EASE,
          stagger: PEEK_ENTRY_STAGGER,
          scrollTrigger: {
            trigger: scope.current,
            start: PEEK_ENTRY_START,
            once: true,
          },
          onComplete: () => {
            gsap.set(entryTargets, { clearProps: 'willChange' })
          },
        })

        const driftDistance = () => {
          const cards = Array.from(trackEl.children) as HTMLElement[]
          const target = cards[Math.min(PEEK_CARD_COUNT, cards.length) - 1]
          if (!target) return 0
          const inset = parseFloat(getComputedStyle(trackEl).paddingLeft)
          const distance = target.offsetLeft - inset
          const max = trackEl.scrollWidth - trackEl.clientWidth
          if (distance < max) return distance
          return matchMedia(PEEK_CAP_QUERY).matches ? max * PEEK_CAP_RATIO : max
        }

        const driftTween = gsap.to(trackEl, {
          scrollLeft: driftDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: PEEK_START,
            end: PEEK_END,
            scrub: PEEK_SCRUB_SMOOTHING,
            invalidateOnRefresh: true,
          },
        })
        const drift = driftTween.scrollTrigger
        if (!drift) return

        let userHasControl = false
        let handOverLeft = 0
        const restoreSnap = () => {
          if (trackEl.scrollLeft !== handOverLeft) {
            trackEl.style.scrollSnapType = ''
          }
        }
        const handOver = () => {
          userHasControl = true
          handOverLeft = trackEl.scrollLeft
          drift.disable(false)
          trackEl.style.scrollSnapType = 'none'
          RELEASE_EVENTS.forEach((type) =>
            trackEl.addEventListener(type, restoreSnap, { once: true }),
          )
        }
        const reset = () => {
          userHasControl = false
          trackEl.scrollLeft = 0
          drift.enable(false, false)
        }

        ScrollTrigger.create({
          trigger: scope.current,
          start: PEEK_RESET_START,
          end: PEEK_RESET_END,
          onLeave: reset,
          onLeaveBack: reset,
          onToggle: (self) => {
            if (self.isActive && !userHasControl) {
              trackEl.style.scrollSnapType = 'none'
            }
          },
        })

        const controller = new AbortController()
        const opts = { signal: controller.signal, passive: true }
        trackEl.addEventListener('pointerdown', handOver, opts)
        trackEl.addEventListener('touchstart', handOver, opts)

        const images = Array.from(trackEl.querySelectorAll('img'))
        Promise.all(
          images.map((img) => img.decode().catch(() => undefined)),
        ).then(() => ScrollTrigger.refresh())

        return () => {
          controller.abort()
          trackEl.style.scrollSnapType = ''
        }
      })

      return () => mm.revert()
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id={SECTION_IDS.programs}
      className="bg-surface-subtle py-12 md:py-15.5"
    >
      <div className="flex flex-col gap-4 px-(--content-inset) md:flex-row-reverse md:items-start md:justify-between">
        <div data-entry>
          <SectionLabel>{PROGRAMS.label}</SectionLabel>
        </div>
        <h2
          data-entry
          className="max-w-programs-heading font-serif text-section-heading font-medium text-on-surface"
        >
          {PROGRAMS.heading}
        </h2>
      </div>
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={PROGRAMS.carouselLabel}
        tabIndex={0}
        className="relative mt-8 scrollbar-hidden flex snap-x snap-mandatory scroll-px-(--content-inset) gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain px-(--content-inset) focus-visible:outline-offset-[-2px] md:mt-17.5 pointer-fine:cursor-grab"
      >
        {PROGRAMS.cards.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </section>
  )
}
