import { useRef, useState } from 'react'
import {
  FAQ_ENTRY_START,
  FAQ_ENTRY_STAGGER,
  REDUCED_MOTION_ACTIVE_QUERY,
  REDUCED_MOTION_QUERY,
} from '../../config/motion'
import { FAQ } from '../../content/faqs'
import { SECTION_IDS } from '../../content/navigation'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { reveal } from '../../lib/reveal'
import { FaqItem } from '../ui/FaqItem'
import { SectionLabel } from '../ui/SectionLabel'

const HEADING_ID = 'faq-heading'

export function Faq() {
  const scope = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>(FAQ.faqs[0]?.id ?? null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_QUERY, () => {
        const section = scope.current
        if (!section) return
        reveal(gsap.utils.toArray<Element>('[data-faq-reveal]'), {
          trigger: section,
          start: FAQ_ENTRY_START,
          stagger: FAQ_ENTRY_STAGGER,
        })
      })
      return () => mm.revert()
    },
    { scope },
  )

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
    if (matchMedia(REDUCED_MOTION_ACTIVE_QUERY).matches) {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
  }

  return (
    <section
      ref={scope}
      id={SECTION_IDS.faq}
      aria-labelledby={HEADING_ID}
      className="bg-surface px-gutter py-12 md:px-15"
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-10 md:gap-12.5">
        <div className="flex flex-col gap-4 md:flex-row-reverse md:items-start md:justify-between">
          <div data-faq-reveal>
            <SectionLabel>{FAQ.label}</SectionLabel>
          </div>
          <h2
            id={HEADING_ID}
            data-faq-reveal
            className="font-serif text-section-heading font-medium text-on-surface md:max-w-programs-heading"
          >
            {FAQ.heading}
          </h2>
        </div>
        <div
          data-faq-reveal
          className="mx-auto flex w-full max-w-faq flex-col gap-4"
        >
          {FAQ.faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
