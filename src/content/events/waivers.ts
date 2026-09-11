import liabilityWaiver from "../../static/pdf/exploretech_la_2022_Liability_Waiver.pdf";
import multimediaRelease from "../../static/pdf/exploretech_la_2022_Multimedia_Release_Form.pdf";
import studentVerification from "../../static/pdf/exploretech_la_2022_Student_Verification_Form.pdf";

import type { DocumentLink } from "../types";

/**
 * The same three signed forms are offered on /register and on /resources.
 * Both pages link the identical PDFs, so they are authored once here.
 */
export const WAIVER_FORMS: readonly DocumentLink[] = [
  { name: "Liability Waiver", src: liabilityWaiver },
  { name: "Multimedia Release Form", src: multimediaRelease },
  { name: "Student Verification Form", src: studentVerification },
];

export const WAIVER_INTRO =
  "Please download and sign the following waivers. They are a required part of your registration.";

export const WAIVER_NOTE =
  "Note: For high school students, the waivers require a parent/guardian signature.";
