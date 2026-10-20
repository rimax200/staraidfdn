import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from 'react-icons/fa6'
import type {
  ContactLinkValue,
  ContactRow,
  ErrorCode,
  FieldContent,
  FieldName,
  SelectOption,
  SocialLink,
} from '../types/contact'
import { RECOGNITION } from './recognition'

const EMAIL: ContactLinkValue = {
  text: 'STARAIDfoundation@gmail.com',
  href: 'mailto:STARAIDfoundation@gmail.com',
}

const INTEREST_OPTIONS: readonly SelectOption[] = RECOGNITION.groups.map(
  ({ title }) => ({ value: title, label: title }),
)

const ROWS: readonly ContactRow[] = [
  {
    id: 'email',
    label: 'Send us an email',
    values: [EMAIL],
    icon: FaEnvelope,
  },
  {
    id: 'phone',
    label: 'Call us',
    values: [
      { text: '+234 805 429 9991', href: 'tel:+2348054299991' },
      { text: '+234 802 446 0000', href: 'tel:+2348024460000' },
    ],
    icon: FaPhone,
  },
  {
    id: 'offices',
    label: 'Our Offices',
    values: [{ text: 'Port Harcourt · Abuja · Lagos, and the rest of Africa' }],
    icon: FaLocationDot,
  },
]

const SOCIALS: readonly SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn },
  { id: 'x', label: 'X', icon: FaXTwitter },
  { id: 'instagram', label: 'Instagram', icon: FaInstagram },
  { id: 'facebook', label: 'Facebook', icon: FaFacebook },
]

export const SOCIAL_LINKS_PENDING = SOCIALS.some(({ url }) => !url)

const FIELDS: Record<FieldName, FieldContent> = {
  firstName: {
    kind: 'text',
    label: 'First Name',
    placeholder: 'Enter first name...',
    autoComplete: 'given-name',
  },
  companyName: {
    kind: 'text',
    label: 'Company Name',
    placeholder: 'Enter company name...',
    autoComplete: 'organization',
  },
  interest: {
    kind: 'select',
    label: "I'm interested in",
    placeholder: 'Choose a commitment...',
  },
  email: {
    kind: 'email',
    label: 'Email',
    placeholder: 'Enter email...',
    autoComplete: 'email',
  },
  message: {
    kind: 'textarea',
    label: 'Message',
    placeholder: 'Tell us how you would like to help...',
  },
}

const FIELD_ERRORS: Record<FieldName, Partial<Record<ErrorCode, string>>> = {
  firstName: {
    required: 'Enter your first name.',
    tooLong: 'First name is too long.',
  },
  companyName: { tooLong: 'Company name is too long.' },
  interest: { required: 'Choose a commitment.' },
  email: {
    required: 'Enter your email address.',
    invalid: 'Enter a valid email address.',
    tooLong: 'Email address is too long.',
  },
  message: {
    required: 'Enter a message.',
    tooLong: 'Message is too long.',
  },
}

export const CONTACT = {
  label: 'Partner with us',
  heading: 'Build the nation through its youth.',
  card: {
    title: 'Contact Information',
    intro:
      'We would be honoured to discuss how your organization can partner with STARAID. Tell us a little and we will be in touch.',
    rows: ROWS,
    valueSeparator: ' · ',
    socialTitle: 'Our social media',
    socialLabelPrefix: 'StarAid on',
    socials: SOCIALS,
  },
  form: {
    fields: FIELDS,
    interestOptions: INTEREST_OPTIONS,
    honeypotName: 'website',
    submit: 'Submit',
    submitting: 'Sending...',
    errors: FIELD_ERRORS,
  },
  success: {
    heading: 'Message sent',
    text: 'Thank you for getting in touch. We will reply as soon as we can.',
    reset: 'Send another message',
  },
  failure: {
    before: 'Your message could not be sent. Please try again, or email us at ',
    email: EMAIL,
    after: '.',
  },
} as const
