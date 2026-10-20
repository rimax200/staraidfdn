import step1 from '../assets/images/participation/help-the-students.jpg'
import step2 from '../assets/images/participation/help-the-community.jpeg'
import step3 from '../assets/images/participation/secure-the-future.jpeg'
import type { Reason } from '../types/reasons'

interface ReasonsContent {
  label: string
  heading: string
  listLabel: string
  reasons: readonly Reason[]
}

export const REASONS: ReasonsContent = {
  label: 'Why Staraid',
  heading: 'Three reasons your participation matters.',
  listLabel: 'Reasons your participation matters',
  reasons: [
    {
      id: 'help-the-students',
      step: 'Step 01',
      title: 'Help the Students',
      body: 'Your support keeps a student in school, restores dignity, and shows that excellence will not be abandoned for poverty.',
      image: {
        src: step1,
        alt: 'A group of smiling boys in checked school shirts and green shorts posing together outdoors',
        width: 1600,
        height: 1143,
      },
    },
    {
      id: 'help-the-community',
      step: 'Step 02',
      title: 'Help the community',
      body: 'Free health outreaches, eye care, food support, vocational training and literacy programs create a ripple effect of hope and productivity.',
      image: {
        src: step2,
        alt: 'Volunteers in green Star Aid Foundation shirts packing food, water and clothing into boxes at an outdoor outreach',
        width: 1536,
        height: 1024,
      },
    },
    {
      id: 'secure-the-future',
      step: 'Step 03',
      title: 'Secure the future of our country',
      body: 'By developing quality leaders from our universities today, we secure the future of Nigeria and Africa.',
      image: {
        src: step3,
        alt: 'A speaker in a dark suit addressing a packed congregation at a university hall, with worshippers raising their hands',
        width: 2000,
        height: 1333,
      },
    },
  ],
}
