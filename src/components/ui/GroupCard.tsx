import type { Group } from '../../types/recognition'

interface GroupCardProps {
  group: Group
}

const TAG_SEPARATOR = ' · '

export function GroupCard({ group }: GroupCardProps) {
  const { id, title, description, tags, medal, footerLabel, compact } = group
  const titleId = `group-${id}`

  return (
    <article
      aria-labelledby={titleId}
      data-reveal-card
      className="@container flex flex-col gap-1"
    >
      <div
        className={`flex flex-1 flex-col gap-6 rounded-image bg-surface px-6 md:px-8 ${compact ? 'py-8' : 'py-9.25'}`}
      >
        <img
          src={medal.src}
          alt={medal.alt}
          width={medal.width}
          height={medal.height}
          loading="lazy"
          decoding="async"
          className="size-29"
        />
        <div className="border-t border-dashed border-divider" />
        <div className="flex flex-col gap-3">
          <h3
            id={titleId}
            className={`font-ui font-semibold text-ink ${compact ? 'text-group-title-compact' : 'text-group-title'}`}
          >
            {title}
          </h3>
          {description ? (
            <p
              className={`font-ui text-paragraph ${compact ? 'text-group-body-compact' : 'text-group-body'}`}
            >
              {description}
            </p>
          ) : null}
        </div>
        <p className="font-ui text-group-body font-semibold text-ink">
          {tags.join(TAG_SEPARATOR)}
        </p>
      </div>
      <p className="flex min-h-19.25 items-center rounded-image bg-surface px-5 py-4.5 font-ui text-group-footer font-medium text-ink">
        {footerLabel}
      </p>
    </article>
  )
}
