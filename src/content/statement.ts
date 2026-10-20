interface Sentence {
  text: string
}

interface StatementContent {
  heading: string
  lead: Sentence
  trail: Sentence
}

export const STATEMENT: StatementContent = {
  heading: 'We Bridge The Gap Between Potential And Opportunity.',
  lead: {
    text: 'Every day we meet brilliant secondary and university students whose dreams are cut short, not by lack of talent, but by lack of textbooks, upkeep, accommodation, transport and healthcare.',
  },
  trail: {
    text: 'When a student is empowered, a whole community is transformed.',
  },
}
