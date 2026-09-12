import images from "../../../constants/optimizedImages";
import capcomLogo from "../../../static/sponsors/capcom.svg";

/**
 * Raster logos spread the generated metadata (src, srcSet, width, height) so the
 * browser can pick a variant and reserve the box. capcom stays vector, so it has
 * no srcSet.
 */
export interface SponsorLogo {
  readonly name: string;
  readonly website: string;
  readonly src: string;
  readonly srcSet?: string;
  readonly width: number;
  readonly height: number;
}

export const LargeLogoSponsors: readonly SponsorLogo[] = [
  {
    name: "Google",
    ...images["sponsors/google-logo.png"],
    website: "https://about.google/",
  },
  {
    name: "UCLA Computer Science",
    ...images["sponsors/ucla-cs.png"],
    website: "https://www.cs.ucla.edu/",
  },
];

export const SmallLogoSponsors: readonly SponsorLogo[] = [
  {
    name: "Balsamiq",
    ...images["sponsors/balsamiq.png"],
    website: "https://balsamiq.com/",
  },
  {
    name: "UCLA Samueli School of Engineering",
    ...images["sponsors/ucla-samueli-engineering.png"],
    website: "https://samueli.ucla.edu/",
  },
  {
    name: "Yubico",
    ...images["sponsors/yubico.png"],
    website: "https://www.yubico.com/",
  },
  {
    name: "Northrop Grumman",
    ...images["sponsors/northrop-grumman.png"],
    website: "https://www.northropgrumman.com/",
  },
  {
    name: "Disney",
    ...images["sponsors/disney.png"],
    website: "https://thewaltdisneycompany.com/",
  },
  {
    name: "Capcom",
    src: capcomLogo,
    width: 5592,
    height: 1024,
    website: "https://www.capcom.com/us/",
  },
  {
    name: "Cloud Girls",
    ...images["sponsors/cloud-girls.png"],
    website: "https://cloudgirls.org/",
  },
];
