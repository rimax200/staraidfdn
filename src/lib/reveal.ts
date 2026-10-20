import {
  ENTRY_DURATION,
  ENTRY_EASE,
  ENTRY_OFFSET_Y,
  IMAGE_SCALE_FROM,
  REVEAL_TOGGLE_ACTIONS,
} from '../config/motion'
import { gsap, ScrollTrigger } from './gsap'

interface RevealOptions {
  trigger: Element
  start: string
  stagger?: number
  photo?: Element
}

const hasPassed = (trigger: Element, start: string) => {
  const probe = ScrollTrigger.create({ trigger, start })
  const passed = probe.scroll() >= probe.start
  probe.kill()
  return passed
}

export const reveal = (targets: Element[], options: RevealOptions) => {
  const { trigger, start, stagger = 0, photo } = options
  if (hasPassed(trigger, start)) return

  const timing = {
    duration: ENTRY_DURATION,
    ease: ENTRY_EASE,
    stagger,
    scrollTrigger: { trigger, start, toggleActions: REVEAL_TOGGLE_ACTIONS },
  }
  gsap.set(targets, { opacity: 0, y: ENTRY_OFFSET_Y, willChange: 'transform' })
  gsap.to(targets, {
    opacity: 1,
    y: 0,
    ...timing,
    onComplete: () => {
      gsap.set(targets, { clearProps: 'willChange' })
    },
  })
  if (photo) {
    gsap.set(photo, { scale: IMAGE_SCALE_FROM, willChange: 'transform' })
    gsap.to(photo, {
      scale: 1,
      ...timing,
      stagger: 0,
      onComplete: () => {
        gsap.set(photo, { clearProps: 'willChange' })
      },
    })
  }
}
