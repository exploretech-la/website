import type { DocumentLink as Document } from "../../content/types";
import DocumentLink from "../../components/DocumentLink";

export default function Waivers({ forms }: { forms: readonly Document[] }) {
  return (
    <section
      className="event-section Waivers"
      aria-labelledby="waivers-heading"
    >
      <h2 id="waivers-heading">Archived waiver documents</h2>
      <p>
        Historical reference only. Do not submit these forms to register for a
        future event.
      </p>
      <ul className="document-list">
        {forms.map((form) => (
          <li key={form.name}>
            <DocumentLink document={form} />
          </li>
        ))}
      </ul>
    </section>
  );
}
