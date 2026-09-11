import Footer from "../../components/Footer";
import images from "../../constants/optimizedImages";
import { REGISTRATION_2021 } from "../../content/events/2021";
import ActionLink from "../../components/ActionLink";
import Faq from "../events/Faq";
import Waivers from "../events/Waivers";
import ImportantLinks from "./ImportantLinks";
import RegistrationAlert from "./RegistrationAlert";
import TwoDaySchedule from "./TwoDaySchedule";

/** The 2021 event information page, served at /register. */
export default function RegistrationPage() {
  const content = REGISTRATION_2021;
  const { waivers } = content;

  return (
    <div className="Register">
      <div className="banner">
        {/*
          The banner is the first thing on the page, so it stays eager and
          keeps its intrinsic dimensions to reserve the space it needs.
        */}
        <img
          {...images["images/banner.png"]}
          sizes="100vw"
          decoding="async"
          className="banner"
          alt="banner"
        />
      </div>
      <RegistrationAlert alert={content.alert} />
      <div className="registration-title">
        <h1>{content.title}</h1>
      </div>
      <TwoDaySchedule days={content.schedule} />
      <ImportantLinks links={content.importantLinks} />
      <Faq content={content.faq} />
      <Waivers forms={waivers.forms} intro={waivers.intro} note={waivers.note}>
        <div className="waivers-text">
          <p>
            <b>{waivers.allFormsHeading}</b>
          </p>
          <p>{waivers.allFormsBody}</p>
          <div className="button">
            <ActionLink
              href={waivers.allForms.src}
              className="action action-outline action-large"
            >
              {waivers.allForms.name}
            </ActionLink>
          </div>
        </div>
      </Waivers>
      <Footer />
    </div>
  );
}
