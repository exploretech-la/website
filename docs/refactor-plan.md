# PR #108 refactor verification, historical record

This records the original parity refactor against `f435aca`. PR #108 subsequently merged as `b57ae7d` and was deployed. The tables below retain that effort's original scope and measurements; they are not a current UI specification or working-tree status. For current controls, layouts, participation workflows, and checks, use the [README](../README.md) and [UI canon](ui-canon.md). The later UX pass intentionally replaces several preserved legacy behaviors.

## Mission

Centralize people, role assignments, and annual event content; organize typed feature renderers; replace the old runtime and styling dependencies without redesigning the site. No CMS, backend, database, hosting migration, deployment, merge, branch-protection change, or secret change is included.

Baseline: `origin/master` at `f435aca007fbaf3bc2726c8239bdd784d56b8d6d`, the independently verified PR #107 merge. Work started on `refactor-contributor-architecture`, not the already-merged modernization branch. The Node/Vite/Vitest modernization was retained.

## Implementation sequence and decisions

1. Fetch and verify master, preserve the user-owned image and local handoffs, build an immutable baseline, then capture screenshots and geometry before changing CSS.
2. Establish shared profile/role/event types, content ownership, brand tokens, and the observed breakpoint/reset contract. Parallel feature writers owned disjoint files; integration owned runtime, navigation, analytics, and configuration.
3. Centralize all 35 people in `content/people.ts`. The seven team sections contain 45 contextual assignments; `content/speakers.ts` contains eight historical speaking roles. Names, portraits, links, titles, order, and missing-photo slots remain unchanged.
4. Consolidate annual resources into `content/events/<year>.ts` plus shared renderers. `/resources` deliberately retains its 2022 page content and "exploretech 2021" menu label. Registration remains the distinct 2021 two-day event. `EVENT_ROUTES` drives both routing and navigation; its keys determine valid event years.
5. Upgrade to stable React/DOM 19.3.0, Router 7.18.3, and Tailwind 4.3.3. TypeScript 6.0.3 is the latest stable compatible with typescript-eslint 8.70.0; TypeScript 7 is outside that linter's peer range. No forced peer resolution is used.
6. Replace Bootstrap's generic class API with the small `action`, `site-nav`, `site-menu`, `content-card`, and `resource-list` canon. Layout and dimensions use exact-value Tailwind utilities. Motion and state effects remain explicit CSS. Preflight is excluded. The former Sass cascade's missing tablet rules and width overrides were preserved rather than corrected into a redesign.
7. Remove old JS/JSX, Sass, copied annual components, unused content/dependencies, classic-JSX compatibility configuration, and unused scaffold files. Retain every image-generation input and public document.
8. Extend the existing CI job, add content checks and durable browser smoke, document contributor tasks and the [UI canon](ui-canon.md), then perform independent review and final verification.

## Acceptance ledger

| Requirement | State | Evidence |
| --- | --- | --- |
| Latest master and fresh branch | done | Fetch, branch creation, GitHub PR #107 merge verification |
| Baseline screenshots and geometry | done | 210 baseline cells at 14 routes and 15 widths, including breakpoint-adjacent pixels |
| One person profile and contextual assignments | done | `content/people.ts`, `teams.ts`, `speakers.ts`; 35 profiles, 53 total roles; content and browser checks |
| Shared annual data/rendering and archives | done | `content/events`, `features/events`, `features/registration`; preserved route text, image order, links and schedules |
| Feature and content ownership | done | README ownership table and edit-person/roster/event/image instructions |
| Strict TS and compatible stable runtime | done | No application JS/JSX; strict typecheck, lint, cold Vite startup and live JSX HMR without document reload |
| Tailwind cutover and small shared UI canon | done | No Bootstrap/React Bootstrap/Sass dependencies or application imports; semantic selectors, explicit reset/tokens, shared ActionLink/OutboundLink/Collapse |
| Proven dead code removed | done | Unreachable annual copies, inactive components, old constants, all Sass files and unused scaffold removed; original assets retained |
| Shipped image loading and regressions preserved | done | 12 Vitest tests, including the original failed/stale carousel and analytics assertions; browser slow/failing-image cases |
| Public binary URLs and bytes retained | done | `asset-parity.cjs`: all 102 public image/PDF/icon URLs and SHA-256 hashes unchanged; `404.html` and `CNAME` byte-identical |
| CI content checks and browser smoke | done | Existing read-only `verify` extended with types, lint, formatting, content, image/build and 34 Chromium cases; no deployment secrets |
| Contributor documentation | done | README, UI canon, this ledger, committed parity summary and comparison images |
| Clean install/types/lint/format/tests/images/build | done | `npm ci`, all listed checks, production build; npm audit reports zero vulnerabilities at verification time |
| Responsive and interaction parity | done | 210 final geometry/style/content cells; 34 WebKit plus 34 Firefox scenarios; 25 hover/focus/video/carousel states; autoplay, pause/resume, interrupted menu and keyboard probes |
| Analytics semantics retained | done | Dummy-ID build with real retained `analytics.js`: one tracker/script, resolved-only alias pageview, query changes, no hash-only pageview, correct outbound attribution; collection blocked |
| Independent findings resolved | done | Runtime and content/style reviews, followed by targeted approvals after the two fixes below |
| Reviewable pull request without merge/deploy | done | [PR #108](https://github.com/exploretech-la/website/pull/108) is open against master; no merge or deployment performed |

## Demonstrated regressions and fixes

- Tailwind's `collapse` utility initially hid open FAQ answers. Renaming the component's state classes to `disclosure` and `disclosure-transition` removed the collision without an override or compatibility layer.
- The first navigation implementation wrapped dropdown keyboard selection. The baseline clamps at the first/last item and does not open on ArrowUp. A new browser regression failed against that candidate build and passes after the correction; the ten-step baseline/candidate keyboard sequences now match.
- Independent runtime review found that the Back-navigation test replaced its spy array while the spy retained the old one. The test now clears the array in place and first proves it observed pushed-route scrolling. Targeted re-review approved the fix.
- Independent content review found a registration schedule variant that was accepted by types but not rendered. The unused union and conditional were removed; registration now requires and always renders its two-day tuple. Targeted re-review approved the fix.

## Verification results and limits

Machine-readable results: [verification/refactor-parity.json](verification/refactor-parity.json).

- Final geometry matrix: 210/210 passed. Maximum observed difference is 0.03125 CSS pixels against a 0.05px ceiling. Text, destinations, image order/loading attributes, and the sampled computed styles compare exactly. Implementation class names are recorded but not treated as a visual contract.
- Final PNG comparison: 210 pairs, no dimension changes, 121 byte-identical pairs, 142 with no flagged pixels. The largest flagged fraction is 0.005645%, using pixelmatch threshold 0.1 with antialiasing excluded. Screenshots are not universally pixel-identical. Sampled residual differences are in text rasterization; diff bounds and counts are in the committed summary.
- All 25 measured hover/focus/video/carousel states match. Slide motion has observed intermediate transforms and the same 600ms easing. Autoplay advances, pauses on hover, and resumes on both baseline and candidate. Interrupted menu operations settle correctly; intermediate samples depend on frame scheduling.
- WebKit and Firefox each pass 34 scenarios, including actual Back reading-position restoration. Chromium's durable test separately proves that the app does not override POP scrolling.
- CSS gzip changed from 28.23KB to 8.41KB after removing the unused resource-list active states. Application JS gzip changed from 99.60KB to 112.98KB with the newer runtime. These are build sizes, not field-performance claims.
- Browser viewports are emulated. Playwright WebKit is not native Safari or a physical iPhone. External links are syntax-checked, not all contacted. Analytics testing proves local vendor processing, not production-property ingestion.

Before is on the left and after is on the right in these representative, unscaled viewport crops:

- [Phone team comparison](verification/team-phone.png)
- [Tablet home comparison](verification/home-tablet.png)
- [Desktop resources comparison](verification/resources-desktop.png)

The full local screenshot/JSON set and nonzero pixel-diff images remain under `/tmp/exploretech-refactor-baseline` and `/tmp/exploretech-refactor-candidate`. The README documents rerunning the capture and asset comparisons. Temporary migration and diagnostic scripts are not application dependencies.

## Protected state

`src/image.png` remains untracked and unchanged, with SHA-256 `901b37768de40e95b2718c8a350f5761d6d341f02f2e23c9337164ad95f5ae3b`. The local `/handoffs/` exclusion remains effective. Deployment workflow, hosting, secrets, and branch protection are unchanged.
