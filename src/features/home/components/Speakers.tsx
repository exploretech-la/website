import People from "../../../components/common/People";
import HomePageSections from "../../../content/sections";
import { pastSpeakers } from "../../../content/speakers";
import { people } from "../../../content/people";

export default function Speakers() {
  return (
    <section
      className="Speakers page-container"
      id={HomePageSections.SPEAKERS.name}
    >
      <div className="speakers-container">
        <div className="speakers-header">
          <h2 className="section-heading">Past speakers</h2>
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
