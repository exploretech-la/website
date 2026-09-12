import { Link } from "react-router-dom";
import OutboundLink from "../../components/OutboundLink";
import { PROGRAMS } from "../../content/participation";
import images from "../../constants/optimizedImages";

const WorkshopImageSizes =
  "(min-width: 1200px) 340px, (min-width: 992px) 30vw, (min-width: 768px) 45vw, 100vw";
const ProjectImageSizes = "(min-width: 992px) 540px, 100vw";

const PAST_WORKSHOPS = [
  {
    year: 2025,
    workshops: [
      {
        title: "Introduction to Python",
        description:
          "Beginner Python concepts and practical programming projects.",
        image: "images/ignite/python.jpg",
      },
      {
        title: "Game development with Roblox",
        description:
          "A speed-run parkour game in Roblox Studio, with level building and game mechanics scripted in Lua.",
        image: "images/ignite/gamedevroblox.jpg",
      },
      {
        title: "Web development",
        description:
          "Website building with HTML and CSS, leading to a custom website capstone project.",
        image: "images/ignite/webdev.jpg",
      },
    ],
  },
  {
    year: 2024,
    workshops: [
      {
        title: "Introduction to Python",
        description:
          "Beginner Python concepts and practical programming projects.",
        image: "images/ignite/PXL_20250215_212102361.MP.jpg",
      },
      {
        title: "Game development with Unity",
        description:
          "An introduction to game development using the Unity engine.",
        image: "images/ignite/gamdev.jpeg",
      },
      {
        title: "Machine learning",
        description:
          "An introduction to machine learning, a field that uses data to train models to recognize patterns.",
        image: "images/ignite/ML.png",
      },
    ],
  },
] as const;

// Photos appear after the program introduction and cohort details.
function lazyPhoto(key: keyof typeof images, sizes: string) {
  return {
    ...images[key],
    sizes,
    loading: "lazy",
    decoding: "async",
  } as const;
}

export default function Ignite() {
  return (
    <div className="Ignite">
      <section className="ignite-intro" aria-labelledby="ignite-title">
        <div className="page-container">
          <header className="page-header">
            <h1 id="ignite-title">{PROGRAMS.ignite.title}</h1>
            <p>{PROGRAMS.ignite.description}</p>
          </header>
          <div className="status-notice ignite-next">
            <h2>Next Ignite series</h2>
            <p>{PROGRAMS.ignite.status}</p>
            <p>
              Email the team to ask about dates, eligibility, accessibility, and
              how to participate.
            </p>
            <OutboundLink
              href={PROGRAMS.ignite.inquiryHref}
              eventLabel="Ignite inquiry"
              className="action action-primary"
            >
              {PROGRAMS.ignite.actionLabel}
            </OutboundLink>
          </div>
          <nav className="section-links" aria-label="Ignite page sections">
            <Link to="#cohort-2026">2026 cohort details</Link>
            <Link to="#workshops-2025">2025 workshops</Link>
            <Link to="#workshops-2024">2024 workshops</Link>
            <Link to="#past-projects">Past projects</Link>
          </nav>
        </div>
      </section>

      <section id="cohort-2026" aria-labelledby="cohort-2026-heading">
        <div className="page-container">
          <h2 id="cohort-2026-heading" className="section-heading">
            2026 cohort details
          </h2>
          <p className="ignite-section-description">
            The published 2026 schedule listed three Saturday sessions at UCLA.
            These are historical details, not the schedule or arrangements for
            the next series.
          </p>
          {/* Source: Ignite 26 RSVP metadata, https://forms.gle/DKUZARUPjWoxrUif6.
              Keep the past form out of the current participation workflow. */}
          <dl className="ignite-facts">
            <div>
              <dt>2026 session dates</dt>
              <dd>January 31, February 7, and February 14, 2026</dd>
            </div>
            <div>
              <dt>2026 daily schedule</dt>
              <dd>
                <ul>
                  <li>Web development: 10:00 to 11:30 a.m.</li>
                  <li>Lunch break: 11:30 a.m. to 12:30 p.m.</li>
                  <li>Game development: 12:30 to 2:00 p.m.</li>
                </ul>
              </dd>
            </div>
            <div>
              <dt>2026 cost and logistics</dt>
              <dd>
                Participation was free. Transportation to UCLA and lunch were
                not provided. The 2026 information listed an on-site food court
                where participants could buy lunch.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {PAST_WORKSHOPS.map(({ year, workshops }) => (
        <section
          key={year}
          id={`workshops-${year}`}
          className="ignite-workshops"
          aria-labelledby={`workshops-${year}-heading`}
        >
          <div className="page-container">
            <h2 id={`workshops-${year}-heading`} className="section-heading">
              {year} workshops
            </h2>
            <p className="ignite-section-description">
              Topics from the {year} series. Future workshop offerings may
              differ.
            </p>
            <div className="ignite-workshop-grid">
              {workshops.map((workshop) => (
                <article className="ignite-workshop-card" key={workshop.title}>
                  <h3>{workshop.title}</h3>
                  <p>{workshop.description}</p>
                  <img
                    {...lazyPhoto(workshop.image, WorkshopImageSizes)}
                    alt={workshop.title}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="past-projects" aria-labelledby="past-projects-heading">
        <div className="page-container">
          <h2 id="past-projects-heading" className="section-heading">
            Past projects and collaboration
          </h2>
          <p className="ignite-section-description">
            Past workshops combined practice with project work. The 2025 web
            development track included a custom website capstone. These photos
            show project presentations and students working together.
          </p>
          <div className="ignite-project-grid">
            <figure>
              <img
                {...lazyPhoto("images/ignite/collab1.jpg", ProjectImageSizes)}
                alt="An Ignite capstone project presentation"
              />
              <figcaption>Sharing project work</figcaption>
            </figure>
            <figure>
              <img
                {...lazyPhoto("images/ignite/cllab2.jpg", ProjectImageSizes)}
                alt="Students working together during an Ignite workshop"
              />
              <figcaption>Working together during a workshop</figcaption>
            </figure>
          </div>
          <div className="ignite-contact">
            <h2>Interested in taking part?</h2>
            <p>{PROGRAMS.ignite.status}</p>
            <OutboundLink
              href={PROGRAMS.ignite.inquiryHref}
              eventLabel="Ignite inquiry"
              className="action action-primary"
            >
              {PROGRAMS.ignite.actionLabel}
            </OutboundLink>
          </div>
        </div>
      </section>
    </div>
  );
}
