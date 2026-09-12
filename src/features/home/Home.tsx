import { Link } from "react-router-dom";

import OutboundLink from "../../components/OutboundLink";
import { PROGRAMS } from "../../content/participation";
import About from "./components/About";
import GetInvolved from "./components/GetInvolved";
import Hero from "./components/Hero";
import Speakers from "./components/Speakers";
import Sponsors from "./components/Sponsors";

export default function Home() {
  return (
    <div className="Home">
      <Hero />
      <GetInvolved />
      <section
        className="home-programs page-container"
        aria-labelledby="home-programs-title"
      >
        <h2 id="home-programs-title" className="section-heading">
          Our programs
        </h2>
        <div className="program-grid">
          {Object.entries(PROGRAMS).map(([id, program]) => (
            <article key={id}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <p className="status-notice">{program.status}</p>
              <div className="section-links">
                <Link
                  className="text-link"
                  to={id === "annual" ? "/events" : "/ignite"}
                >
                  {id === "annual"
                    ? "Explore the annual event"
                    : "Explore Ignite"}
                </Link>
                <OutboundLink
                  className="text-link"
                  href={program.inquiryHref}
                  eventLabel={program.actionLabel}
                >
                  {program.actionLabel}
                </OutboundLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <About />
      <Speakers />
      <Sponsors />
    </div>
  );
}
