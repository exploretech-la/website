import type { DocumentLink } from "../../content/types";
import ActionLink from "../../components/ActionLink";

export default function Maps({
  maps,
  linkRel,
}: {
  maps: readonly DocumentLink[];
  linkRel?: string;
}) {
  return (
    <section className="Section Maps">
      <div className="maps-content">
        <div className="maps-title">
          <h2>Maps</h2>
          <div className="pill-divider" />
        </div>
        <h5>
          Below are links to view all the maps you may need throughout the day!
        </h5>
        <div className="buttons">
          {maps.map((map) => (
            <ActionLink
              key={map.name}
              href={map.src}
              target="_blank"
              rel={linkRel}
              className="action action-outline action-large"
            >
              {map.name}
            </ActionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
