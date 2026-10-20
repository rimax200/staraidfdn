import bg828 from '../assets/images/donate/bg-828.webp'
import bg1536 from '../assets/images/donate/bg-1536.webp'
import bg1880 from '../assets/images/donate/bg-1880.webp'
import ubaLogo from '../assets/images/donate/uba-logo.webp'
import type { DonateContent } from '../types/donate'

const BACKGROUND_WIDTH = 1880
const BACKGROUND_HEIGHT = 1253
const LOGO_WIDTH = 400
const LOGO_HEIGHT = 135
const NOTICE_EMAIL = 'STARAIDfoundation@gmail.com'

export const DONATE: DonateContent = {
  meta: {
    title: 'Donate | STARAID Foundation',
    description:
      'Support a student through scholarships, upkeep, healthcare and mentorship. Donate to STARAID Foundation by bank transfer.',
  },
  heading: ['Stand with a student.', 'Start today'],
  paragraph:
    'Your support helps keep a student in school through scholarships, upkeep, healthcare and mentorship. Thank you for building the nation through its youth.',
  cardTitle: 'Bank Transfer',
  rows: [
    {
      id: 'bank',
      label: 'Bank',
      value: 'United Bank for Africa',
      logo: { src: ubaLogo, width: LOGO_WIDTH, height: LOGO_HEIGHT },
    },
    {
      id: 'account-name',
      label: 'Account Name',
      value: 'Star Aid Students & Community...',
    },
  ],
  accountNumber: { label: 'Account number', value: '1031625947' },
  notice: {
    segments: [
      { text: 'After you transfer, ', emphasis: true },
      { text: 'email your organization name and payment confirmation to ' },
      { text: NOTICE_EMAIL, href: `mailto:${NOTICE_EMAIL}` },
      {
        text: ' so we can acknowledge your partnership. Card and online payments are coming soon.',
      },
    ],
  },
  copy: {
    label: 'Copy account number',
    copied: 'Account number copied',
    failed: 'Could not copy. Select the number and copy it manually.',
    copiedVisible: 'Copied',
    resetMs: 2000,
  },
  background: {
    variants: [
      { src: bg828, width: 828 },
      { src: bg1536, width: 1536 },
      { src: bg1880, width: BACKGROUND_WIDTH },
    ],
    fallbackSrc: bg1536,
    width: BACKGROUND_WIDTH,
    height: BACKGROUND_HEIGHT,
    sizes: '100vw',
  },
}
