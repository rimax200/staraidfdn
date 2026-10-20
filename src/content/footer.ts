import type { FooterColumn, NewsletterError } from '../types/footer'
import { SECTION_IDS } from './navigation'

interface FooterContent {
  brand: string
  logoSize: number
  description: string
  columns: readonly FooterColumn[]
  copyrightMark: string
  copyright: string
  stripOpacities: readonly number[]
  newsletter: {
    title: string
    helper: string
    label: string
    placeholder: string
    submit: string
    submitting: string
    honeypotName: string
    errors: Record<NewsletterError, string>
    success: string
    failure: string
  }
}

export const FOOTER: FooterContent = {
  brand: 'STARAID',
  logoSize: 49,
  description:
    'Students & Community Empowerment Foundation, empowering students and communities for health, knowledge and sustainable growth.',
  columns: [
    {
      title: 'Foundation',
      links: [
        { label: 'About', sectionId: SECTION_IDS.about },
        { label: 'Programs', sectionId: SECTION_IDS.programs },
        { label: 'Impact', sectionId: SECTION_IDS.impact },
        { label: 'News', sectionId: 'news', pending: true },
      ],
    },
    {
      title: 'Get Involved',
      links: [
        { label: 'Why partner', sectionId: SECTION_IDS.whyPartner },
        { label: 'Recognition', sectionId: SECTION_IDS.recognition },
        { label: 'Volunteer', sectionId: 'volunteer', pending: true },
        { label: 'Contact', sectionId: SECTION_IDS.contact },
      ],
    },
  ],
  copyrightMark: '©',
  copyright: 'STARAID Foundation · RC No. 9022409',
  stripOpacities: [
    0.8, 0.8, 0.8, 0.8, 0.6, 0.4, 0.4, 0.1, 0.1, 0.1, 0.4, 0.4, 0.6, 0.8, 0.8,
    0.8, 0.8,
  ],
  newsletter: {
    title: 'Stay Connected With StarAid',
    helper:
      'Get updates on events, stories, and ways to make a difference—straight to your inbox.',
    label: 'Email Address',
    placeholder: 'Email Address',
    submit: 'Submit',
    submitting: 'Sending...',
    honeypotName: 'website',
    errors: {
      required: 'Enter your email address.',
      invalid: 'Enter a valid email address.',
      tooLong: 'Email address is too long.',
    },
    success: 'Thank you for subscribing. We will keep you updated.',
    failure:
      'Something went wrong and you were not subscribed. Please try again.',
  },
}
