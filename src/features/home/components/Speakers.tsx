import People from "../../../components/common/People";
import HomePageSections from "../../../content/sections";
import { pastSpeakers } from "../../../content/speakers";
import { people } from "../../../content/people";

export default function Speakers() {
  return (
    <section className="Section Speakers" id={HomePageSections.SPEAKERS.name}>
      <div className="speakers-container">
        <div className="speakers-header">
          <h3>Past Speakers</h3>
          <div className="pill-divider" />
        </div>
        <People
          people={pastSpeakers.map(({ personId, title }) => ({
            ...people[personId],
            title,
          }))}
          eagerCount={0}
        />
      </div>
    </section>
  );
}
