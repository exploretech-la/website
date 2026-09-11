import Footer from "../../components/Footer";
import { EVENTS } from "../../content/events";
import type { EventYear, Feedback } from "../../content/events/types";
import { WAIVER_INTRO, WAIVER_NOTE } from "../../content/events/waivers";
import ActionLink from "../../components/ActionLink";
import Faq from "./Faq";
import Maps from "./Maps";
import Schedule from "./Schedule";
import Waivers from "./Waivers";
import Workshops from "./Workshops";

function FeedbackButton({ feedback }: { feedback: Feedback }) {
  if (feedback.kind === "link") {
    return (
      <ActionLink
        href={feedback.href}
        target="_blank"
        className="action action-info action-large"
      >
        Feedback Form
      </ActionLink>
    );
  }
  return (
    <button
      disabled={feedback.disabled}
      type="button"
      className="action action-info action-large"
    >
      Feedback Form (Coming Soon)
    </button>
  );
}

/**
 * One page for every archived annual resources route; the year's differences all
 * come from `src/content/events/<year>.ts`.
 */
export default function EventPage({ year }: { year: EventYear }) {
  const event = EVENTS[year];
  const workshops = <Workshops sections={event.workshops} />;

  return (
    <div className="Resources">
      <div className="resources-title">
        <h1>Resources</h1>
        <div className="pill-divider" />
        <div className="Section resources-text">
          <h5>
            Welcome students and teachers! Confused about the schedule? Lost and
            need a map? Or maybe just curious about what workshops are happening
            and when? This webpage contains important resources you need for the
            exploretech.la {event.year} event! If you can't find what you need,
            feel free to contact{" "}
            <a
              href="mailto:exploretechla@cs.ucla.edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              exploretechla@cs.ucla.edu
            </a>{" "}
            for more questions.
          </h5>
        </div>
        <div className="Section full-length-button">
          <ActionLink
            href={event.programHref}
            target="_blank"
            className="action action-outline action-large"
          >
            Click here to view the full event program
          </ActionLink>
        </div>
        <Schedule items={event.schedule} />
        {event.workshopsPlacement === "before-maps" && workshops}
        <Maps maps={event.maps} linkRel={event.mapsLinkRel} />
        <div className="Section resources-title">
          <h2>Wristbands</h2>
          <div className="pill-divider" />
          <h5>
            <b>Make sure you have your wristband on the entire time!</b>
          </h5>
          <div className="resources-text">
            <h5>
              All high school students are divided into 3 groups, each will get
              a different colored wristband. During each session, 1 group will
              be at the exhibition hall and the other 2 groups will be at the
              workshops. Group 1 (green colored-wristband) will be at the
              exhibition hall during Session 1, Group 2 (blue) during Session 2,
              and Group 3 (red) during Session 3.
            </h5>
          </div>
          {event.wristbandImage && (
            <img
              style={{ marginTop: "50px" }}
              src={event.wristbandImage.src}
              alt={event.wristbandImage.alt}
            />
          )}
        </div>
        {event.workshopsPlacement === "after-wristbands" && workshops}
        {event.faq && <Faq content={event.faq} />}
        {event.waivers && (
          <Waivers
            forms={event.waivers}
            intro={WAIVER_INTRO}
            note={WAIVER_NOTE}
          />
        )}
        <div className="Section resources-title">
          {event.feedbackHeading && <h2>{event.feedbackHeading}</h2>}
          <div className="pill-divider" />
          <div className="resources-text">
            <h5>
              <b>
                Thanks for coming to our event! Got feedback? Let us know by
                filling out this form below!
              </b>
            </h5>
          </div>
        </div>
        <div className="Section full-length-button">
          <FeedbackButton feedback={event.feedback} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
