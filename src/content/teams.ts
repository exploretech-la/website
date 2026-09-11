import { people } from "./people";
import type { PersonCard, TeamSection, TeamSectionId } from "./types";

/**
 * Ordered team sections. Each member references a profile in `people.ts` and
 * supplies the title that person holds *in this section*; the same person may
 * appear in several sections with different titles.
 *
 * Key order is the order the tabs and cards render in.
 */
export const teamSectionsById = {
  leadership: {
    id: "leadership",
    navLabel: "Leadership",
    heading: "Leadership",
    members: [
      { personId: "spoorthy-nalumachu", title: "Executive Director" },
      { personId: "clara-zhang", title: "Executive Director" },
      { personId: "annika-renganathan", title: "External Advisor" },
      { personId: "shaina-grover", title: "Content Advisor" },
      { personId: "sandra-pan", title: "Design Advisor" },
      { personId: "eli-drewry", title: "Content Director" },
      { personId: "matthew-chen", title: "Content Director" },
      {
        personId: "isabelle-chang",
        title: "Design Director & UI/UX Design Lead",
      },
      { personId: "sarah-zhao", title: "Design Director" },
      { personId: "eric-chen", title: "Operations Director" },
      { personId: "christina-uong", title: "Operations Director" },
      { personId: "sadie-scott", title: "External Director" },
      { personId: "jubilee-yul", title: "External Director" },
      { personId: "benjamin-garcia", title: "Web Dev Lead" },
    ],
  },
  content: {
    id: "content",
    navLabel: "Content",
    heading: "Content",
    members: [
      { personId: "eli-drewry", title: "Content Director" },
      { personId: "matthew-chen", title: "Content Director" },
      { personId: "ridhima-seth", title: "Content Member" },
      { personId: "sofia-matos", title: "Content Member" },
      { personId: "paul-macapinlac", title: "Content Member" },
      { personId: "joy-szeto", title: "Content Member" },
      { personId: "benjamin-garcia", title: "Content Member" },
    ],
  },
  design: {
    id: "design",
    navLabel: "Design",
    heading: "Design",
    members: [
      { personId: "isabelle-chang", title: "Design Director" },
      { personId: "sarah-zhao", title: "Design Director" },
      { personId: "allison-gao", title: "Design Member" },
      { personId: "izabella-chan", title: "Design Member" },
      { personId: "ela-defne-erkan", title: "Design Member" },
    ],
  },
  operations: {
    id: "operations",
    navLabel: "Operations",
    heading: "Operations",
    members: [
      { personId: "eric-chen", title: "Operations Director" },
      { personId: "christina-uong", title: "Operations Director" },
      { personId: "angeleena-poothavelil", title: "Operations Member" },
      { personId: "aansh-singh", title: "Operations Member" },
      { personId: "esther-yao", title: "Operations Member" },
    ],
  },
  external: {
    id: "external",
    navLabel: "External",
    heading: "External",
    members: [
      { personId: "sadie-scott", title: "External Director" },
      { personId: "jubilee-yul", title: "External Director" },
      { personId: "shayla-kumaresan", title: "External Member" },
      { personId: "luisa-chen", title: "External Member" },
      { personId: "kayla-wai", title: "External Member" },
    ],
  },
  "web-dev": {
    id: "web-dev",
    navLabel: "Web Dev",
    heading: "Web Dev",
    members: [
      { personId: "benjamin-garcia", title: "Web Dev Lead" },
      { personId: "shayla-kumaresan", title: "Web Dev Member" },
      { personId: "aansh-singh", title: "Web Dev Member" },
      { personId: "paul-macapinlac", title: "Web Dev Member" },
      { personId: "angeleena-poothavelil", title: "Web Dev Member" },
      { personId: "isabelle-chang", title: "UI/UX Design Lead" },
      { personId: "ela-defne-erkan", title: "UI/UX Designer" },
      { personId: "allison-gao", title: "UI/UX Designer" },
    ],
  },
  marketing: {
    id: "marketing",
    navLabel: "Marketing",
    heading: "Marketing",
    members: [{ personId: "luisa-chen", title: "Marketing Member" }],
  },
} satisfies Record<TeamSectionId, TeamSection>;

export const teamSections: readonly TeamSection[] =
  Object.values(teamSectionsById);

/** Resolves a section's assignments into renderable cards, in order. */
export function teamCards(id: TeamSectionId): readonly PersonCard[] {
  return teamSectionsById[id].members.map(({ personId, title }) => ({
    ...people[personId],
    title,
  }));
}
