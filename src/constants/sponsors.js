import images from "./optimizedImages";

// Raster logos spread the generated metadata (src, srcSet, width, height) so the
// browser can pick a variant and reserve the box. capcom stays vector.
export const LargeLogoSponsors = [
  {
    name: "google-logo",
    ...images["sponsors/google-logo.png"],
    website: "https://about.google/",
  },
  {
    name: "ucla-cs",
    ...images["sponsors/ucla-cs.png"],
    website: "https://www.cs.ucla.edu/",
  },
];

export const SmallLogoSponsors = [
  {
    name: "balsamiq",
    ...images["sponsors/balsamiq.png"],
    website: "https://balsamiq.com/",
  },
  {
    name: "ucla_samueli_engineering",
    ...images["sponsors/ucla-samueli-engineering.png"],
    website: "https://samueli.ucla.edu/",
  },
  {
    name: "yubico",
    ...images["sponsors/yubico.png"],
    website: "https://www.yubico.com/",
  },
  {
    name: "northrop-grumman",
    ...images["sponsors/northrop-grumman.png"],
    website: "https://www.northropgrumman.com/",
  },
  {
    name: "disney",
    ...images["sponsors/disney.png"],
    website: "https://thewaltdisneycompany.com/",
  },
  {
    name: "capcom",
    src: require("static/sponsors/capcom.svg"),
    width: 5592,
    height: 1024,
    website: "https://www.capcom.com/us/",
  },
  {
    name: "cloud-girls",
    ...images["sponsors/cloud-girls.png"],
    website: "https://cloudgirls.org/",
  },
];
