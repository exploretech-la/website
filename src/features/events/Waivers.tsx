import type { ReactNode } from "react";

import type { DocumentLink } from "../../content/types";
import ActionLink from "../../components/ActionLink";

/**
 * Shared by /resources and /register. `children` carries the extra
 * "all forms" block that only the registration page shows.
 */
export default function Waivers({
  forms,
  intro,
  note,
  children,
}: {
  forms: readonly DocumentLink[];
  intro: string;
  note: string;
  children?: ReactNode;
}) {
  return (
    <section className="Waivers">
      <div className="waivers-title">
        <h2 className="title">Waivers</h2>
        <div className="pill-divider" />
        <p>{intro}</p>
        <p>
          <em>{note}</em>
        </p>
      </div>
      <div className="buttons">
        {forms.map((form) => (
          <div className="button" key={form.name}>
            <ActionLink
              href={form.src}
              className="action action-info action-large"
            >
              {form.name}
            </ActionLink>
          </div>
        ))}
      </div>
      {children}
    </section>
  );
}
