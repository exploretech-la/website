import type { PersonCard } from "../../content/types";
import OutboundLink from "../OutboundLink";

interface PeopleProps {
  readonly people: readonly PersonCard[];
  readonly className?: string;
  /** Number of leading portraits loaded eagerly; the rest load lazily. */
  readonly eagerCount?: number;
}

export default function People({
  people,
  className,
  eagerCount = 2,
}: PeopleProps) {
  if (people.length === 0) return null;

  return (
    <ul className={className ? `People ${className}` : "People"}>
      {people.map(({ name, title, descriptions, image, link }, index) => {
        const body = (
          <>
            {image ? (
              <img
                src={image}
                className="person-image"
                alt=""
                width="160"
                height="160"
                loading={index < eagerCount ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <div className="person-image person-initials" aria-hidden="true">
                {name
                  .split(/\s+/)
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
            <h3 className="person-name">{name}</h3>
            {title ? <p className="person-title">{title}</p> : null}
            {descriptions?.map((description, descriptionIndex) => (
              <p className="person-description" key={descriptionIndex}>
                {description}
              </p>
            ))}
          </>
        );
        return (
          <li className="person" key={name}>
            {link ? (
              <OutboundLink
                className="person-profile"
                href={link}
                target="_blank"
                eventLabel={name}
              >
                {body}
              </OutboundLink>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ul>
  );
}
