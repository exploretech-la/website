import type { PersonCard } from "../../content/types";
import OutboundLink from "../OutboundLink";

interface PeopleProps {
  readonly people: readonly PersonCard[];
  readonly className?: string;
  /** Number of leading portraits loaded eagerly; the rest load lazily. */
  readonly eagerCount?: number;
}

/**
 * Horizontal-scrolling card list shared by team sections, speakers and
 * panelists. Cards with a profile link become tracked outbound anchors.
 */
export default function People({
  people,
  className,
  eagerCount = 2,
}: PeopleProps) {
  if (people.length === 0) {
    return null;
  }

  return (
    <div className={className ? `People ${className}` : "People"}>
      {people.map((person, index) => {
        const { name, title, descriptions, image, link } = person;
        const body = (
          <>
            {image ? (
              <img
                src={image}
                className="person-image"
                alt={name}
                width="160"
                height="160"
                loading={index < eagerCount ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <div className="person-image" aria-hidden="true" />
            )}
            <h5 className="person-name">{name}</h5>
            {title ? <p className="person-title">{title}</p> : null}
            {descriptions
              ? descriptions.map((description, descriptionIndex) => (
                  <p className="person-description" key={descriptionIndex}>
                    {description}
                  </p>
                ))
              : null}
          </>
        );

        if (link) {
          return (
            <OutboundLink
              href={link}
              target="_blank"
              eventLabel={name}
              key={name}
            >
              <div className="person">{body}</div>
            </OutboundLink>
          );
        }

        return (
          <div className="person" key={name}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
