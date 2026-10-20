import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })
document.fonts.ready.then(() => ScrollTrigger.refresh())

export { gsap, ScrollTrigger, useGSAP }
