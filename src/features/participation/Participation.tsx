import { Link } from "react-router-dom";
import OutboundLink from "../../components/OutboundLink";
import {
  AUDIENCES,
  CONTACT_EMAIL,
  UCLA_UPDATES_URL,
} from "../../content/participation";

export default function Participation() {
  return (
    <div className="Participation">
      <header className="page-header page-container">
        <h1>Get involved</h1>
        <p className="page-lead">
          Find the right contact for your school, volunteer interest, or
          organization.
        </p>
        <nav className="section-links" aria-label="Participation options">
          <Link to="#schools">Schools and students</Link>
          <Link to="#volunteer">UCLA volunteers</Link>
          <Link to="#partners">Partners and sponsors</Link>
        </nav>
      </header>

      <div className="page-container participation-sections">
        <section
          id="schools"
          className="participation-section"
          aria-labelledby="schools-heading"
        >
          <h2 id="schools-heading">For schools and students</h2>
          <p>
            Teachers and school coordinators can ask about bringing a group.
            Students and families can contact us to learn which participation
            options are available.
          </p>
          <OutboundLink
            className="action action-primary"
            href={AUDIENCES.schools.inquiryHref}
            eventLabel="School Participation Enquiry"
          >
            {AUDIENCES.schools.actionLabel}
          </OutboundLink>
          <div className="status-notice">
            <p>
              Check the program information, then ask the team to confirm dates
              and arrangements before planning a visit.
            </p>
            <Link className="text-link" to="/events">
              Compare the programs
            </Link>
          </div>
          <h3>What to include in your enquiry</h3>
          <ul>
            <li>Your school or organization and the year groups interested.</li>
            <li>
              An approximate group size, if you are planning a school visit.
            </li>
            <li>
              Questions about eligibility, permissions, transport, lunch, or
              accessibility arrangements.
            </li>
          </ul>
          <p>
            The team can confirm dates and arrangements before you plan a visit.
            Please do not send student waivers or personal information using
            instructions from a past event archive.
          </p>
        </section>

        <section
          id="volunteer"
          className="participation-section"
          aria-labelledby="volunteer-heading"
        >
          <h2 id="volunteer-heading">Volunteer with the UCLA team</h2>
          <p>
            Help create workshop content, design event materials, organize
            activities, build the website, or support outreach. You can explore
            the existing departments before contacting us.
          </p>
          <div className="action-row">
            <OutboundLink
              className="action action-primary"
              href={AUDIENCES.volunteer.inquiryHref}
              eventLabel="UCLA Volunteer Enquiry"
            >
              {AUDIENCES.volunteer.actionLabel}
            </OutboundLink>
            <OutboundLink
              className="action action-outline"
              href={UCLA_UPDATES_URL}
              target="_blank"
              eventLabel="UCLA Newsletter Signup"
            >
              Get UCLA email updates
              <span className="visually-hidden"> (opens in a new tab)</span>
            </OutboundLink>
          </div>
          <Link
            className="text-link inline-flex min-h-11 items-center"
            to="/our_team/leadership"
          >
            Meet the team and explore departments
          </Link>
          <h3>Start a conversation</h3>
          <ul>
            <li>
              Tell us what you are interested in contributing and any relevant
              experience.
            </li>
            <li>
              Ask about available roles, recruitment timing, and the expected
              commitment.
            </li>
          </ul>
          <p>
            This enquiry is separate from joining the mailing list. The team
            will confirm the current recruitment process.
          </p>
        </section>

        <section
          id="partners"
          className="participation-section"
          aria-labelledby="partners-heading"
        >
          <h2 id="partners-heading">Partner with exploretech.la</h2>
          <p>
            Our programs connect high school students with UCLA students and
            people working in technology. Contact us to discuss how your
            organization could contribute.
          </p>
          <OutboundLink
            className="action action-primary"
            href={AUDIENCES.partners.inquiryHref}
            eventLabel="Partnership Enquiry"
          >
            {AUDIENCES.partners.actionLabel}
          </OutboundLink>
          <h3>Ways to discuss helping</h3>
          <ul>
            <li>
              Share experience through a panel, mentoring, or an exhibition.
            </li>
            <li>Contribute expertise or materials to a hands-on workshop.</li>
            <li>Ask about financial or in-kind support for an event.</li>
          </ul>
          <p>
            Include your organization, a contact person, the kind of support you
            have in mind, and your timeframe. The team can discuss suitable
            opportunities and arrangements with you.
          </p>
        </section>

        <section
          className="participation-contact"
          aria-labelledby="participation-contact-heading"
        >
          <h2 id="participation-contact-heading">Prefer to write directly?</h2>
          <p>
            The enquiry links open your email app. You can also copy this
            address into the email service you use:
          </p>
          <a
            className="contact-address text-link"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </section>
      </div>
    </div>
  );
}
