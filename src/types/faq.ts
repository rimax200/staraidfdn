export type AnswerBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: readonly string[] }

export interface Faq {
  id: string
  question: string
  answer: readonly AnswerBlock[]
}
