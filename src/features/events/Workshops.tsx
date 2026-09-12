import { useId, useState } from "react";
import DocumentLink from "../../components/DocumentLink";
import YoutubeEmbed from "../../components/common/YoutubeEmbed";
import type { WorkshopCard, WorkshopSection } from "../../content/events/types";

function Card({
  card,
  heading,
}: {
  card: WorkshopCard;
  heading: WorkshopSection["heading"];
}) {
  return (
    <details className="workshop-card">
      <summary>
        <span className="workshop-title">{card.title}</span>
        {card.slot && (
          <span className="workshop-slot">
            {card.slot.session} · {card.slot.time}
            <br />
            {card.slot.location}
          </span>
        )}
      </summary>
      <div className="workshop-body">
        {card.kind === "archivedVideo" ? (
          <>
            {card.subtitle && <p>{card.subtitle}</p>}
            <YoutubeEmbed embedId={card.embedId} title={card.title} />
            {card.caption && <p>{card.caption}</p>}
          </>
        ) : (
          <>
            {card.instructors && (
              <p>
                <strong>
                  {heading === "Panels" ? "Moderators" : "Instructors"}:
                </strong>{" "}
                {card.instructors}
              </p>
            )}
            {card.description && <p>{card.description}</p>}
          </>
        )}
        <ul className="document-list">
          {card.links.map((link) => (
            <li key={link.name}>
              <DocumentLink document={link} />
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function Workshops({
  sections,
}: {
  sections: readonly WorkshopSection[];
}) {
  const [query, setQuery] = useState("");
  const searchId = useId();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredSections = sections.map((section) => ({
    ...section,
    cards: section.cards.filter((card) => {
      const description =
        card.kind === "described"
          ? `${card.instructors ?? ""} ${card.description ?? ""}`
          : `${card.subtitle ?? ""} ${card.caption ?? ""}`;
      const slot = card.slot
        ? `${card.slot.session} ${card.slot.time} ${card.slot.location}`
        : "";
      return `${card.title} ${description} ${slot}`
        .toLocaleLowerCase()
        .includes(normalizedQuery);
    }),
  }));
  const total = sections.reduce(
    (count, section) => count + section.cards.length,
    0,
  );
  const count = filteredSections.reduce(
    (sum, section) => sum + section.cards.length,
    0,
  );

  return (
    <section
      id="workshops"
      className="event-section Workshops"
      aria-labelledby="workshops-heading"
    >
      <h2 id="workshops-heading">Workshops and panels</h2>
      <div className="workshop-filter">
        <label htmlFor={searchId}>Filter workshops and panels</label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topic, instructor, session, or room"
        />
        {query && (
          <button
            type="button"
            className="action action-outline"
            onClick={() => setQuery("")}
          >
            Clear filter
          </button>
        )}
      </div>
      <p role="status">
        {count} of {total} workshops and panels
      </p>
      {count === 0 && <p>No workshops or panels match your search.</p>}
      {filteredSections.map(
        (section) =>
          section.cards.length > 0 && (
            <div className="workshop-section" key={section.heading}>
              <h3>{section.heading}</h3>
              <div className="workshop-grid">
                {section.cards.map((card) => (
                  <Card
                    key={card.title}
                    card={card}
                    heading={section.heading}
                  />
                ))}
              </div>
            </div>
          ),
      )}
    </section>
  );
}
