import type { TransitionEvent } from 'react'
import { ScrollTrigger } from '../../lib/gsap'
import type { Faq } from '../../types/faq'

interface FaqItemProps {
  faq: Faq
  isOpen: boolean
  onToggle: (id: string) => void
}

const SETTLED_PROPERTY = 'grid-template-rows'

function PlusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={`size-8 shrink-0 transition-transform duration-350 ease-out motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}
    >
      <path d="M16 7V25M7 16H25" />
    </svg>
  )
}

export function FaqItem({ faq, isOpen, onToggle }: FaqItemProps) {
  const { id, question, answer } = faq
  const buttonId = `faq-${id}-button`
  const panelId = `faq-${id}-panel`

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (
      event.target === event.currentTarget &&
      event.propertyName === SETTLED_PROPERTY
    ) {
      ScrollTrigger.refresh()
    }
  }

  return (
    <div className="rounded-2xl bg-faq-surface shadow-highlight">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(id)}
          className={`flex min-h-11 w-full items-start justify-between gap-4 rounded-2xl px-5 py-4 text-left font-heading font-medium text-faq-question transition-colors duration-350 ease-out motion-reduce:transition-none md:px-8 md:py-6 ${isOpen ? 'text-on-surface' : 'text-faq-question'}`}
        >
          <span>{question}</span>
          <PlusIcon isOpen={isOpen} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        onTransitionEnd={handleTransitionEnd}
        className={`grid transition-[grid-template-rows,visibility] duration-350 ease-out motion-reduce:transition-none ${isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-w-faq-answer space-y-3 px-5 pt-3 pb-4 font-heading text-step-body font-medium text-text-soft md:px-8 md:pb-6">
            {answer.map((block, index) =>
              block.type === 'paragraph' ? (
                <p key={index}>{block.text}</p>
              ) : (
                <ul key={index} className="list-disc space-y-1 pl-5">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
