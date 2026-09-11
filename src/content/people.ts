import images from "../constants/optimizedImages";
import type { PersonProfile } from "./types";

/**
 * The authoritative profile for every team member and past speaker.
 *
 * One entry per person. Contextual role titles are NOT stored here: a person
 * can hold different titles in different teams, so titles live with the
 * assignment in `teams.ts`. To update someone's name, portrait or profile
 * link, edit exactly one entry below.
 */
export const people = {
  "spoorthy-nalumachu": {
    name: "Spoorthy Nalumachu",
    image: images["team/leadership/2027/spoorthy-nalumachu.jpg"].src,
    link: "https://www.linkedin.com/in/spoorthy-nalumachu",
  },
  "clara-zhang": {
    name: "Clara Zhang",
    image: images["team/leadership/2027/clara-zhang.jpg"].src,
    link: "https://www.linkedin.com/in/clara-zhang-009497197/",
  },
  "annika-renganathan": {
    name: "Annika Renganathan",
    image: images["team/leadership/annika-renganathan.jpg"].src,
    link: "https://www.linkedin.com/in/annika-renganathan-b437022b9",
  },
  "shaina-grover": {
    name: "Shaina Grover",
    image: images["team/leadership/shaina-grover.jpg"].src,
    link: "https://www.linkedin.com/in/shaina-grover",
  },
  "sandra-pan": {
    name: "Sandra Pan",
    image: images["team/leadership/sandra-pan.jpg"].src,
    link: "https://www.linkedin.com/in/sandra-pan-b994802aa",
  },
  "eli-drewry": {
    name: "Eli Drewry",
    image: images["team/leadership/2027/eli-drewry.jpg"].src,
  },
  "matthew-chen": {
    name: "Matthew Chen",
    image: images["team/leadership/2027/matthew-chen.jpg"].src,
  },
  "isabelle-chang": {
    name: "Isabelle Chang",
    image: images["team/design/isabelle-chang.png"].src,
  },
  "sarah-zhao": {
    name: "Sarah Zhao",
    image: images["team/leadership/2027/sarah-zhao.jpg"].src,
  },
  "eric-chen": {
    name: "Eric Chen",
    image: images["team/leadership/2027/eric-chen.jpg"].src,
  },
  "christina-uong": {
    name: "Christina Uong",
    image: images["team/leadership/2027/christina-uong.jpg"].src,
  },
  "sadie-scott": {
    name: "Sadie Scott",
    image: images["team/leadership/2027/sadie-scott.jpg"].src,
  },
  // Spelling is user-authoritative: the source photo is named "jubilee-yu".
  "jubilee-yul": {
    name: "Jubilee Yul",
    image: images["team/leadership/2027/jubilee-yul.jpg"].src,
  },
  "benjamin-garcia": {
    name: "Benjamin Garcia",
    image: images["team/content/benjamin-garcia.jpg"].src,
  },
  "ridhima-seth": {
    name: "Ridhima Seth",
    image: images["team/content/ridhima-seth.png"].src,
  },
  "sofia-matos": {
    name: "Sofia Matos",
    image: images["team/content/sofia-matos.jpg"].src,
  },
  "paul-macapinlac": {
    name: "Paul Macapinlac",
    image: images["team/content/paul-headshot.png"].src,
  },
  "joy-szeto": {
    name: "Joy Szeto",
    image: images["team/operations/joy-szeto-headshot.jpeg"].src,
  },
  // Deliberately has no portrait; the card still renders name and role.
  "allison-gao": {
    name: "Allison Gao",
  },
  // Deliberately has no portrait; the card still renders name and role.
  "izabella-chan": {
    name: "Izabella Chan",
  },
  "ela-defne-erkan": {
    name: "Ela Defne Erkan",
    image: images["team/design/ela_defne_erkan.png"].src,
  },
  "angeleena-poothavelil": {
    name: "Angeleena Poothavelil",
    image: images["team/operations/angeleena-poothavelil.png"].src,
  },
  "aansh-singh": {
    name: "Aansh Singh",
    image: images["team/operations/aansh-singh.jpeg"].src,
  },
  "esther-yao": {
    name: "Esther Yao",
    image: images["team/operations/esther-yao-headshot.jpg"].src,
  },
  "shayla-kumaresan": {
    name: "Shayla Kumaresan",
    image: images["team/external/shayla-kumaresan-headshot.jpg"].src,
  },
  "luisa-chen": {
    name: "Luisa Chen",
    image: images["team/operations/luisa-chen.png"].src,
  },
  "kayla-wai": {
    name: "Kayla Wai",
    image: images["team/operations/kayla-wai.jpg"].src,
  },
  "alfredo-ayala": {
    name: "Alfredo Ayala",
    image: images["speakers/alfredo-ayala.jpg"].src,
    link: "https://www.linkedin.com/in/alfredo-ayala-b0094426/",
  },
  "carey-nachenberg": {
    name: "Carey Nachenberg",
    image: images["speakers/carey-nachenberg.png"].src,
    link: "https://www.linkedin.com/in/carey-nachenberg-14bbb03/",
  },
  "jayathi-murthy": {
    name: "Jayathi Murthy",
    image: images["speakers/jayathi-murthy.png"].src,
    link: "https://samueli.ucla.edu/jayathi-y-murthy/",
  },
  "justin-brezhnev": {
    name: "Justin Brezhnev",
    image: images["speakers/justin-brezhnev.png"].src,
    link: "https://www.linkedin.com/in/brezh/",
  },
  "tyler-menezes": {
    name: "Tyler Menezes",
    image: images["speakers/tyler-menezes.png"].src,
    link: "https://www.linkedin.com/in/tylermenezes/",
  },
  "solomon-russell": {
    name: "Solomon Russell",
    image: images["speakers/solomon-russell.jpeg"].src,
    link: "https://www.linkedin.com/in/solomon-russell-220aa014/",
  },
  "ruth-johnson": {
    name: "Ruth Johnson",
    image: images["speakers/ruth-johnson.jpeg"].src,
    link: "https://www.linkedin.com/in/ruthjohnson13/",
  },
  "nick-corral": {
    name: "Nick Corral",
    image: images["speakers/nick-corral.jpg"].src,
    link: "https://www.linkedin.com/in/nick-corral-595723106/",
  },
} satisfies Record<string, PersonProfile>;

/** Every valid person reference, derived from the registry keys. */
export type PersonId = keyof typeof people;
