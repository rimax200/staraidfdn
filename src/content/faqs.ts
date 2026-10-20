import type { Faq } from '../types/faq'

interface FaqContent {
  label: string
  heading: string
  faqs: readonly Faq[]
}

export const FAQ: FaqContent = {
  label: 'what people are asking',
  heading: 'Frequently Asked Questions',
  faqs: [
    {
      id: 'what-is-staraid',
      question: 'What is STARAID?',
      answer: [
        {
          type: 'paragraph',
          text: 'STARAID is the Students and Community Empowerment Foundation, a registered Nigerian NGO (RC No. 9022409). We support secondary and university students who have talent but lack textbooks, upkeep, accommodation, transport or healthcare. We also run health outreaches, literacy classes and vocational training for underserved communities.',
        },
      ],
    },
    {
      id: 'where-we-work',
      question: 'Where do you work?',
      answer: [
        {
          type: 'paragraph',
          text: 'We work in Port Harcourt, Abuja and Lagos, and we are growing across the rest of Africa.',
        },
      ],
    },
    {
      id: 'support-students',
      question: 'How can my organization support students?',
      answer: [
        { type: 'paragraph', text: 'You can sponsor in several ways:' },
        {
          type: 'list',
          items: [
            'Scholarships: full or part-time.',
            'Monthly upkeep: for deserving students.',
            'Food and provisions.',
            'Accommodation and transport support.',
            'Healthcare: items, free medical outreaches, eye tests and glasses.',
          ],
        },
        {
          type: 'paragraph',
          text: 'You can also give time and skills as a mentor or counsellor.',
        },
      ],
    },
    {
      id: 'platinum-vs-gold',
      question: 'What is the difference between the Platinum and Gold groups?',
      answer: [
        {
          type: 'list',
          items: [
            'Platinum Group (Life Members): a lifetime commitment, recognised with a Platinum Medal and Certificate of Honour.',
            'Gold Elite Group: a partnership of one to five years, recognised with a Gold Medal and Certificate of Recognition.',
            'Gold Contact Group (Volunteers): time, professional skills, mentorship and counselling, recognised with a Service Medal and Certificate.',
          ],
        },
        {
          type: 'paragraph',
          text: 'All medals are presented at our Annual Awards & Recognition Ceremony.',
        },
      ],
    },
    {
      id: 'become-partner',
      question: 'How do I become a partner or volunteer?',
      answer: [
        {
          type: 'paragraph',
          text: 'Send us a message through the form on this page, or contact us directly at STARAIDfoundation@gmail.com, +234 805 429 9991 or +234 802 446 0000. We will talk with you about the best way for your organization to partner with us.',
        },
      ],
    },
  ],
}
