import YoutubeEmbed from "../../components/common/YoutubeEmbed";
import type { WorkshopCard, WorkshopSection } from "../../content/events/types";

/** Cards have always been laid out two per deck row, in authored order. */
function rowsOfTwo(
  cards: readonly WorkshopCard[],
): readonly (readonly WorkshopCard[])[] {
  const rows: WorkshopCard[][] = [];
  for (let index = 0; index < cards.length; index += 2) {
    rows.push(cards.slice(index, index + 2));
  }
  return rows;
}

function Card({
  card,
  heading,
}: {
  card: WorkshopCard;
  heading: WorkshopSection["heading"];
}) {
  return (
    <div className="text-center content-card">
      <div className="content-card-body">
        <div className="content-card-title heading-five">
          <b>{card.title}</b>
        </div>
        {card.kind === "archivedVideo" ? (
          <>
            {card.subtitle && (
              <div className="mb-2 muted-copy content-card-subtitle heading-six">
                {card.subtitle}
              </div>
            )}
            <YoutubeEmbed embedId={card.embedId} />
            {card.caption && (
              <p className="content-card-text">{card.caption}</p>
            )}
          </>
        ) : (
          card.instructors && (
            <p className="content-card-text">
              {heading === "Panels" ? "Moderators" : "Instructors"}:{" "}
              {card.instructors}
            </p>
          )
        )}
      </div>
      <div className="resource-list-flush resource-list">
        {card.kind === "described" && card.description && (
          <div className="resource-list-item">
            <p className="content-card-text">{card.description}</p>
          </div>
        )}
        {card.links.map((link) => (
          <div className="resource-list-item" key={link.name}>
            <a className="content-card-link" href={link.src}>
              {link.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Workshops({
  sections,
}: {
  sections: readonly WorkshopSection[];
}) {
  return (
    <section className="Section Workshops">
      {sections.map((section) => (
        <div className="workshops-content" key={section.heading}>
          <div className="workshops-title">
            <h2>{section.heading}</h2>
            <div className="pill-divider" />
          </div>
          <div className="workshops-cards">
            {rowsOfTwo(section.cards).map((row, index) => (
              <div className="card-row content-card-row" key={index}>
                {row.map((card) => (
                  <Card
                    card={card}
                    heading={section.heading}
                    key={card.title}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
