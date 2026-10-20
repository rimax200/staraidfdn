import accommodation from '../assets/images/seven-ways/2.jpg'
import community from '../assets/images/seven-ways/7.jpg'
import food from '../assets/images/seven-ways/5.jpg'
import healthcare from '../assets/images/seven-ways/3.jpg'
import mentorship from '../assets/images/seven-ways/6.jpg'
import scholarship from '../assets/images/seven-ways/1.jpg'
import upkeep from '../assets/images/seven-ways/4.jpg'
import type { Program } from '../types/programs'

interface ProgramsContent {
  label: string
  heading: string
  carouselLabel: string
  cards: readonly Program[]
}

const POSTER_SIZE = 1080

export const PROGRAMS: ProgramsContent = {
  label: 'What we do',
  heading: 'Seven ways we keep a student in school.',
  carouselLabel: 'Programs',
  cards: [
    {
      id: 'scholarship',
      title: 'Scholarship',
      image: {
        src: scholarship,
        alt: 'Scholarship, for education. Full or part-time scholarships that keep deserving students in secondary school and university. Two smiling students in checked school uniforms.',
        width: POSTER_SIZE,
        height: POSTER_SIZE,
      },
    },
    {
      id: 'monthly-upkeep',
      title: 'Monthly Upkeep',
      image: {
        src: upkeep,
        alt: 'Monthly upkeep. A steady monthly allowance for deserving students. Hands passing money to open palms.',
        width: POSTER_SIZE,
        height: POSTER_SIZE,
      },
    },
    {
      id: 'food-provisions',
      title: 'Food & Provisions',
      image: {
        src: food,
        alt: 'Food and provisions. Food items and provisions for students and families. Volunteers packing food into paper bags.',
        width: POSTER_SIZE,
        height: POSTER_SIZE,
      },
    },
    {
      id: 'accommodation-transport',
      title: 'Accommodation & Transport',
      image: {
        src: accommodation,
        alt: 'Accommodation and transport, for transport. A safe place to stay and a reliable way to get to class. A yellow school bus.',
        width: POSTER_SIZE,
        height: POSTER_SIZE,
      },
    },
    {
      id: 'healthcare-eye-care',
      title: 'Healthcare & Eye Care',
      image: {
        src: healthcare,
        alt: 'Healthcare and eye care. Free medical outreaches, eye tests and glasses, plus healthcare items. A doctor examining a young boy’s eyes.',
        width: POSTER_SIZE,
        height: POSTER_SIZE,
      },
    },
    {
      id: 'mentorship-counselling',
      title: 'Mentorship & Counselling',
      image: {
        src: mentorship,
        alt: 'Mentorship and counselling. Registered mentors and counsellors who walk with students who need guidance. A mentor talking with a student taking notes.',
        width: POSTER_SIZE,
        height: POSTER_SIZE,
      },
    },
    {
      id: 'community-literacy-skills',
      title: 'Community Literacy & Skills',
      image: {
        src: community,
        alt: 'Community literacy and skills. Literacy classes and vocational training that lift whole households. A woman sewing and a man reading a book.',
        width: POSTER_SIZE,
        height: POSTER_SIZE,
      },
    },
  ],
}
