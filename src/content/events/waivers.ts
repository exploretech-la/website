import liabilityWaiver from "../../static/pdf/exploretech_la_2022_Liability_Waiver.pdf";
import multimediaRelease from "../../static/pdf/exploretech_la_2022_Multimedia_Release_Form.pdf";
import studentVerification from "../../static/pdf/exploretech_la_2022_Student_Verification_Form.pdf";

import type { DocumentLink } from "../types";

/**
 * Historic PDFs retained on /register and /resources. Their filenames and
 * document dates are 2022, including the copies linked from the 2021 page.
 */
export const WAIVER_FORMS: readonly DocumentLink[] = [
  {
    name: "2022 Liability Waiver",
    src: liabilityWaiver,
    file: { format: "PDF", bytes: 67111 },
  },
  {
    name: "2022 Multimedia Release Form",
    src: multimediaRelease,
    file: { format: "PDF", bytes: 64140 },
  },
  {
    name: "2022 Student Verification Form",
    src: studentVerification,
    file: { format: "PDF", bytes: 79227 },
  },
];
