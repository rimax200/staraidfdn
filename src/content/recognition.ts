import bannerImage from '../assets/images/recognition/banner.webp'
import medalGold from '../assets/images/recognition/medal-gold.webp'
import medalPlatinum from '../assets/images/recognition/medal-platinum.webp'
import medalService from '../assets/images/recognition/medal-service.webp'
import type { Banner, Group } from '../types/recognition'
import { JOIN_GROUP_LINK } from './navigation'

interface RecognitionContent {
  label: string
  heading: string
  groups: readonly Group[]
  banner: Banner
}

const SHARED_TAGS = ['Short-term', '1 to 5 years', 'Financial pillars'] as const
const MEDAL_SIZE = 232

export const RECOGNITION: RecognitionContent = {
  label: 'Partner & volunteer recognition',
  heading: 'Every commitment is honoured.',
  groups: [
    {
      id: 'platinum-group',
      title: 'Platinum Group',
      description: 'A lifetime commitment to students and communities.',
      tags: SHARED_TAGS,
      medal: {
        src: medalPlatinum,
        alt: '',
        width: MEDAL_SIZE,
        height: MEDAL_SIZE,
      },
      footerLabel: 'Platinum Medal + Certificate of Honour',
    },
    {
      id: 'gold-elite-group',
      title: 'Gold Elite Group',
      description: 'A strategic partnership cycle of one to five years.',
      tags: SHARED_TAGS,
      medal: { src: medalGold, alt: '', width: MEDAL_SIZE, height: MEDAL_SIZE },
      footerLabel: 'Gold Medal + Certificate of Recognition',
    },
    {
      id: 'gold-contact-group',
      title: 'Gold Contact Group',
      description:
        'Time, professional skills, mentorship and counselling for students in need. The hands and heart of our mission.',
      tags: ['Volunteers', 'Human resource'],
      medal: {
        src: medalService,
        alt: '',
        width: MEDAL_SIZE,
        height: MEDAL_SIZE,
      },
      footerLabel: 'Service Medal + Certificate',
      compact: true,
    },
  ],
  banner: {
    title: 'Your Partnership Is Acknowledged',
    text: 'on our website, brochure, events and across all our campuses, as a testament to your commitment to youth development and national transformation.',
    button: JOIN_GROUP_LINK,
    image: { src: bannerImage, alt: '', width: 2784, height: 1856 },
    glassOpacities: [
      0.8, 0.8, 0.8, 0.8, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.4, 0.16, 0.1, 0.1,
      0.1, 0.44, 0.8, 0.8, 0.8,
    ],
  },
}
