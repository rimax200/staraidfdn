import { CONTACT } from '../../content/contact'

const { card } = CONTACT
const LINK_CLASS = 'underline-offset-4 hover:underline'
const SOCIAL_BOX = 'flex size-11 items-center justify-center'

export function ContactCard() {
  return (
    <div className="flex flex-col gap-8.5 rounded-4xl bg-action px-6 py-7 text-on-dark md:px-8 md:py-9.25">
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-step-title font-medium">
          {card.title}
        </h3>
        <p className="font-ui text-base text-card-muted">{card.intro}</p>
      </div>
      <hr className="border-t border-dashed border-divider" />
      <dl className="flex flex-col gap-8.5">
        {card.rows.map((row) => (
          <div key={row.id} className="flex gap-5">
            <row.icon aria-hidden="true" className="size-8 shrink-0" />
            <div className="flex min-w-0 flex-col gap-2">
              <dt className="font-ui text-contact-row font-semibold text-card-muted">
                {row.label}
              </dt>
              <dd className="font-ui text-base font-medium break-words">
                {row.values.map((value, index) => (
                  <span key={value.text}>
                    {index > 0 ? card.valueSeparator : null}
                    {value.href ? (
                      <a href={value.href} className={LINK_CLASS}>
                        {value.text}
                      </a>
                    ) : (
                      value.text
                    )}
                  </span>
                ))}
              </dd>
            </div>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-3">
        <p className="font-ui text-contact-row font-semibold">
          {card.socialTitle}
        </p>
        <ul className="-my-2.5 -ml-2.5 flex items-center -space-x-2">
          {card.socials.map(({ id, label, icon: Icon, url }) =>
            url ? (
              <li key={id}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${card.socialLabelPrefix} ${label}`}
                  className={`${SOCIAL_BOX} rounded-control transition-opacity hover:opacity-80 motion-reduce:transition-none`}
                >
                  <Icon aria-hidden="true" className="size-6" />
                </a>
              </li>
            ) : (
              <li key={id} aria-hidden="true">
                <span className={SOCIAL_BOX}>
                  <Icon aria-hidden="true" className="size-6" />
                </span>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}
