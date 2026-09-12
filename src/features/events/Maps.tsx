import type { DocumentLink as Document } from "../../content/types";
import DocumentLink from "../../components/DocumentLink";

export default function Maps({ maps }: { maps: readonly Document[] }) {
  return (
    <section
      id="maps"
      className="event-section Maps"
      aria-labelledby="maps-heading"
    >
      <h2 id="maps-heading">Maps</h2>
      <p>Venue and bus maps retained from this event.</p>
      <ul className="document-list">
        {maps.map((map) => (
          <li key={map.name}>
            <DocumentLink document={map} className="action action-outline" />
          </li>
        ))}
      </ul>
    </section>
  );
}
