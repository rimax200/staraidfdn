import type { Reason } from '../../types/reasons'

interface ReasonStepProps {
  reason: Reason
  index: number
  interactive: boolean
  onSelect: (index: number) => void
}

const SELECT_AREA =
  'cursor-pointer text-left after:absolute after:inset-0 after:rounded-highlight focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-current'

export function ReasonStep({
  reason,
  index,
  interactive,
  onSelect,
}: ReasonStepProps) {
  const { step, title, body } = reason

  return (
    <li
      data-step
      data-active={index === 0}
      aria-current={index === 0 ? 'step' : undefined}
      className="group relative z-10 px-4 py-(--reasons-step) md:px-8"
    >
      <p className="font-body text-step-label-sm font-semibold text-step-tag md:text-step-label">
        {step}
      </p>
      <h3
        data-step-title
        className="mt-1 font-heading text-step-title-sm font-medium text-on-surface md:mt-(--reasons-step) md:text-step-title"
      >
        {interactive ? (
          <button
            type="button"
            onClick={() => onSelect(index)}
            className={SELECT_AREA}
          >
            {title}
          </button>
        ) : (
          title
        )}
      </h3>
      <div className="grid grid-rows-[1fr] motion-safe:tall:max-md:grid-rows-[0fr] motion-safe:tall:max-md:group-data-[active=true]:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="pt-2 font-ui text-step-body-sm text-text-soft md:pt-3 md:text-step-body">
            {body}
          </p>
        </div>
      </div>
    </li>
  )
}
