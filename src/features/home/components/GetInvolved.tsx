import { MdKeyboardArrowRight } from "react-icons/md";

import OutboundLink from "../../../components/OutboundLink";
import images from "../../../constants/optimizedImages";
import HomePageSections from "../../../content/sections";

// Three cards side by side inside the 1040px section on desktop, a single
// 18rem card in the horizontal scroller below that.
const CardImageSizes =
  "(min-width: 1100px) 340px, (min-width: 768px) 33vw, 18rem";

const MailingListSignUp =
  "https://mailchi.mp/e1197feb6276/ucla-student-mailing-list";

export default function GetInvolved() {
  return (
    <section
      className="Section GetInvolved"
      id={HomePageSections.GET_INVOLVED.name}
    >
      <div className="cards-container">
        <div className="cards-header">
          <h3>Get Involved</h3>
          <div className="pill-divider" />
        </div>
        <div className="content-card-row">
          <div className="high-schools content-card">
            <img
              className="content-card-image"
              {...images["images/teals-vr.jpg"]}
              sizes={CardImageSizes}
              loading="lazy"
              decoding="async"
            />
            <OutboundLink
              target="_blank"
              eventLabel="high_school_interest_form"
            >
              <div className="content-card-overlay">
                <div className="card-content">
                  <div className="content-card-title heading-five">
                    For High Schools
                  </div>
                  <p className="content-card-text">Inspire your students</p>
                  <div className="get-involved-cta">
                    <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
                    <p className="cta-text content-card-text">
                      Interest Form Out Soon
                    </p>
                  </div>
                </div>
                <div className="gradient-back" />
              </div>
            </OutboundLink>
          </div>
          <div className="companies content-card">
            <img
              className="content-card-image"
              {...images["images/taboola-booth.jpg"]}
              sizes={CardImageSizes}
              loading="lazy"
              decoding="async"
            />
            <OutboundLink
              href="mailto:exploretechla@cs.ucla.edu"
              target="_blank"
              eventLabel="email_us_companies"
            >
              <div className="content-card-overlay">
                <div className="card-content">
                  <div className="content-card-title heading-five">
                    For Companies
                  </div>
                  <p className="full-content content-card-text">
                    Become an industry partner
                  </p>
                  <p className="short-content content-card-text">
                    Partner with us
                  </p>
                  <div className="get-involved-cta">
                    <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
                    <p className="cta-text content-card-text">Email us</p>
                  </div>
                </div>
                <div className="gradient-back" />
              </div>
            </OutboundLink>
          </div>
          <div className="ucla-students content-card">
            <img
              className="content-card-image"
              {...images["images/speaker-connie.jpg"]}
              sizes={CardImageSizes}
              loading="lazy"
              decoding="async"
            />
            <OutboundLink
              href={MailingListSignUp}
              target="_blank"
              eventLabel="ucla_student_mailing_list"
            >
              <div className="content-card-overlay">
                <div className="card-content">
                  <div className="content-card-title heading-five">
                    For UCLA Students
                  </div>
                  <p className="content-card-text">Join our team</p>
                  <div className="get-involved-cta">
                    <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
                    <p className="cta-text short-content content-card-text">
                      Get our newsletter
                    </p>
                    <p className="cta-text full-content content-card-text">
                      Sign up for our newsletter
                    </p>
                  </div>
                </div>
                <div className="gradient-back" />
              </div>
            </OutboundLink>
          </div>
        </div>
      </div>
    </section>
  );
}
