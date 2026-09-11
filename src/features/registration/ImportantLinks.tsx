import type { RegistrationContent } from "../../content/events/2021";
import ActionLink from "../../components/ActionLink";

export default function ImportantLinks({
  links,
}: {
  links: RegistrationContent["importantLinks"];
}) {
  const { support } = links;

  return (
    <section className="ImportantLinks">
      <div className="links-title">
        <h2 className="title">Important Links</h2>
        <div className="pill-divider" />
        <p>{links.intro}</p>
      </div>
      <div className="button">
        <ActionLink
          href={links.platform.src}
          className="action action-warning action-large"
        >
          {links.platform.name}
        </ActionLink>
      </div>
      <div className="buttons">
        {links.documents.map((document) => (
          <div className="button" key={document.name}>
            <ActionLink
              href={document.src}
              className="action action-info action-large"
            >
              {document.name}
            </ActionLink>
          </div>
        ))}
      </div>
      <div className="links-text">
        <h2 className="title">{support.heading}</h2>
        <div className="pill-divider" />
        {support.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <br />
        <h4>{support.liveHeading}</h4>
        <p>{support.liveBody}</p>
        <div className="button">
          <ActionLink
            href={support.zoom.src}
            className="action action-info action-large"
          >
            {support.zoom.name}
          </ActionLink>
        </div>
        <br />
        <p>
          <b>{support.hoursLabel}</b> {support.hours}
        </p>
      </div>
    </section>
  );
}
