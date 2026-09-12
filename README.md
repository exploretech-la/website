# exploretech.la

The website for [exploretech.la](https://www.exploretech.la/), built with React, TypeScript, Vite, and Tailwind. GitHub Pages serves generated HTML for each published route; React hydrates it for navigation and interactive controls.

## Development

Use **Node 24.21.0**, pinned in `.nvmrc` and shared with GitHub Actions.

```sh
nvm install
nvm use
npm ci
npm start
```

The development server runs at `http://127.0.0.1:3000` and fails clearly if that port is occupied.

## Where things live

| Path | Holds | Edit it when |
| --- | --- | --- |
| `src/content/people.ts` | One profile per person: name, portrait, profile link | Someone joins, leaves, or changes their photo or link |
| `src/content/teams.ts` | Ordered team sections and the role each person holds in them | A roster or job title changes |
| `src/content/speakers.ts` | Ordered historical speaking roles referencing the people registry | A past speaker's displayed title or order changes |
| `src/content/events/` | One module per event year, plus `index.ts` listing them | A schedule, workshop, map, waiver or FAQ changes |
| `src/content/participation.ts` | Current program notices, school/volunteer/partner inquiry links, UCLA updates link | Verified program information or a contact destination changes |
| `src/content/pages.ts` | Published routes and their titles, descriptions, and canonical URLs | Page metadata changes |
| `src/content/sections.ts` | Home page section ids used by header hash links | A home page anchor is added or renamed |
| `src/features/` | Page rendering and feature-specific home or Ignite copy | A page layout or its local copy changes |
| `src/components/` | Shared UI and media only | Something is genuinely used by more than one feature |
| `src/styles/` | `theme.css` entry, tokens, reset, and per-area layers | The design changes |
| `src/constants/optimizedImages.ts` | Generated image map, never edit by hand | Never; run `npm run images` |
| `src/static/` | Original photographs and documents, and generated WebP output | You add a source image or document |
| `scripts/` | Image pipeline, content check, browser smoke, test server, parity tools | Tooling changes |
| `src/app/` | Entry, routes, analytics and scroll effects | A route is added or removed |

Content is central on purpose: authors change `src/content` without knowing which component renders it, and features read content without owning it.

Home gallery and sponsor records live in `src/features/home/content/`. Team and speaker identities always live in the shared people registry.

## Contributor tasks

### Update a person

Edit the one entry in `src/content/people.ts`. Every team that lists them picks the change up.

```ts
"sandra-pan": {
  name: "Sandra Pan",
  image: images["team/leadership/sandra-pan.jpg"].src,
  link: "https://www.linkedin.com/in/sandra-pan-b994802aa",
},
```

A person with no portrait omits `image`; their card shows initials, name, and role.

### Change a roster or a role

Edit `src/content/teams.ts`. Each member is a reference plus the title held *in that section*, so the same person can appear in several teams with different titles. Card order follows the array. The department links and phone selector follow the section order.

```ts
{ personId: "benjamin-garcia", title: "Web Dev Lead" },
```

`personId` is checked against the registry at compile time and again by `npm run content:check`.

### Publish verified program information

Edit `src/content/participation.ts` for notices and inquiry actions shared by the home page, `/events`, `/get-involved`, and Ignite. Until the organization confirms new details, keep the explicit unpublished-details notice and the working email inquiry.

Do not infer that registration is open or closed from an old form. Confirm dates, eligibility, transportation, meals, deadlines, and application destinations with the organization before publishing them. Keep school participation, UCLA volunteering, and partnership inquiries separate. The existing UCLA mailing list is for updates, not a school application or a volunteer application.

Use the audience sections at `/get-involved#schools`, `#volunteer`, and `#partners` as the public entry points. Their mailto links use the shared contact address and a topic-specific subject. Check the destination without sending a message.

### Change an archived event

Edit the year module under `src/content/events/`. `/register` is the 2021 archive, `/resources` is the 2022 archive, and `/resources2023` and `/resources2026` serve their named years. Keep year labels consistent in headings and archive links.

Schedules, workshop cards, maps, waivers, and historical FAQ entries live in these modules. Do not restore past registration, Zoom attendance, or feedback collection actions. Archived workshop videos use a bare YouTube id and their actual workshop title, and load only after activation.

Local downloads use `DocumentLink` records with `name`, imported `src`, and `file: { format, bytes }`. Use the file's actual byte size, not a rounded display value. The shared component displays the format, decimal MB or kB size, and new-tab notice. Keep old PDFs and maps reachable at their existing URLs.

The 2026 workshop session, time, and room fields come from the archived program. Change them only against that source. Workshop details use native disclosures, and filtering must leave a visible result count and a way to clear the query.

### Add an event year

1. Add `src/content/events/<year>.ts` exporting an `EventContent`.
2. Register the module in `EVENTS` and its path, year, and matching archive label in `EVENT_ROUTES`.
3. Add the route's metadata in `src/content/pages.ts` if it is not derived from the event route list.
4. Run the content, build, and browser checks below. Confirm the generated route contains a heading and metadata with JavaScript disabled.

`EVENT_ROUTES` supplies the archived event routes and archive links. `/events` is the program hub; a newer archive is not evidence of an upcoming event.

### Add or replace an image

Optimized images are checked in, so normal installs, tests, CI and builds need no native tools. Regeneration needs `cwebp`, `ffmpeg` and `ffprobe`:

```sh
brew install webp ffmpeg
```

1. Put the original under `src/static/`.
2. Add its path and profile to `scripts/image-sources.json`. Portraits are cropped square up to 320px for the 160px team cards; content images get responsive widths without enlargement. Add a `focus` override when the default crop cuts a face.
3. Run `npm run images`. It applies EXIF orientation, writes the WebP variants, and regenerates the manifest and `src/constants/optimizedImages.ts`.
4. Use the generated map rather than the original file:

```tsx
import images from "../../constants/optimizedImages"; // relative to your module

// A roster portrait needs only the URL.
const portrait = images["team/leadership/sandra-pan.jpg"].src;

// Content images carry responsive sources and intrinsic dimensions.
<img
  {...images["images/explore-tech-2022.jpg"]}
  sizes="(min-width: 768px) 480px, 100vw"
  loading="lazy"
  decoding="async"
  alt="Our Team"
/>;
```

5. Run `npm run images:check`, then look at the affected pages at phone and desktop widths: faces, transparent logos, and images revealed by scrolling.

The check validates source and output hashes, recipe freshness, dimensions, byte budgets, generated-map consistency, and raw raster imports in the configured sources. Keep the originals; they are the regeneration inputs. Use `npm run images -- --only <path-fragment>` for a narrow update, `npm run images -- --force` after changing tools, and `npm run images -- --help` for profile budgets.

## Checks

```sh
npm run typecheck    # TypeScript, strict, no emit
npm run lint         # ESLint
npm run format:check # Prettier (npm run format writes)
npm test             # Vitest unit and component regressions
npm run content:check # References between people, teams, events and their assets
npm run images:check # Generated image integrity and budgets
npm run build        # Check images, build client assets, generate route HTML
npm run preview      # Serve the production build locally
```

`npm run content:check` loads the content modules through Vite, so imported images and documents resolve as they do in the app. It reports missing people, duplicate profiles or roles, shared profile links, missing assets, malformed URLs and video ids, duplicate routes or workshop titles, mismatched archive years, incorrect download sizes, and broken participation inquiry destinations. TypeScript owns data shapes; this check owns cross-record and filesystem facts. It makes no network requests, so a syntactically valid but dead external link still passes.

### Browser smoke

```sh
npx playwright install chromium   # once per machine
npm run build
npm run test:browser
```

For a full cross-engine pass:

```sh
npx playwright install chromium firefox webkit
npm run test:browser:all
```

CI keeps the faster Chromium gate. On macOS, the WebKit keyboard cases use the native Option+Tab link-navigation shortcut; the tests do not change your system or Safari settings. Geometry checks round to hundredths of a CSS pixel to avoid floating-point reporting noise.

The suite in `scripts/browser-smoke.spec.ts`, configured in `playwright.config.ts`, runs Chromium against the built site served by `scripts/serve-built-site.cjs`. Known directory routes redirect to a trailing slash with their query preserved and return generated HTML with status 200. Unknown paths and the `/our_team` alias return `404.html` and exercise the Pages restore script. Missing assets return a plain 404, not the app shell.

Point the suite at another generated build with `SMOKE_ROOT=/path/to/build`, or change port 4390 with `SMOKE_PORT`. The server starts fresh for each run to avoid accidentally checking a different build.

Every cross-origin request is aborted and recorded. The suite does not contact analytics or video vendors, send email, or submit forms. It covers:

- published routes, route-specific HTML and metadata without JavaScript, hydration errors, aliases, and the not-found page;
- query and hash preservation, first-tab skip navigation, phone menu dismissal, pushed-route focus, repeated hash links, and Back scroll restoration;
- the visible phone mission and overflow at 320, 390, 768, 1024, and 1440px;
- school, volunteer, and partner journeys ending at real inquiry links, shared program notices, explicit archives, and obsolete collection actions;
- all seven team grids, deferred portraits, and initials for missing photos;
- keyboard FAQ expansion with named panels, workshop disclosures and filtering, and event shortcuts;
- specific footer and video names, keyboard player activation, focus transfer, and reserved video geometry;
- 44px core controls, primary-action text contrast, and visible keyboard focus;
- download format and byte-size labels against actual served documents;
- manual gallery buttons and status, no autoplay with reduced motion or keyboard focus, slow images, failed images, and stale image loads.

These checks do not replace a visual review or a screen-reader pass. Before requesting review, inspect the changed pages at the listed widths, tab through each task, and check new external destinations without submitting anything.

Add a case when you fix a bug a user could see; keep it in this one file.

`npm run visual:parity` captures the screenshot and geometry matrix used to compare a change against a saved baseline build. It is a review tool, not part of CI.

Use the same browser version for both captures. Serve the saved baseline and candidate builds with `scripts/serve-built-site.cjs` on separate ports, then run:

```sh
SITE_URL=http://127.0.0.1:4391 OUTPUT_DIR=/tmp/site-before npm run visual:parity
SITE_URL=http://127.0.0.1:4392 OUTPUT_DIR=/tmp/site-after BASELINE_DIR=/tmp/site-before npm run visual:parity
node scripts/asset-parity.cjs /path/to/baseline/build build
```

`WIDTHS=390,768,1440` narrows a capture. The default includes the historical responsive breakpoints and their adjacent pixels. Parity against an old design is not an acceptance gate for an intentional UX change. Read [the UI canon](docs/ui-canon.md) before changing shared controls or styling.

## CI and deployment

- Pull requests targeting **`master`** run `.github/workflows/ci.yml` as the `verify` job: `npm ci`, typecheck, lint, formatting, content check, tests, `npm run build` including its image checks, then Chromium smoke against that build. On failure it uploads the Playwright traces and screenshots. The job has read-only repository access, receives no deployment secrets, and never publishes the site.
- Pushes to **`master`** run `.github/workflows/deploy.yml`: install, test, build, then publish the verified `build/` directory to **`gh-pages`**. The deploy token is available only to the publishing step.
- Both workflows use the Node version in `.nvmrc`, the committed lockfile, npm caching, and SHA-pinned official actions.
- The `DEPLOY_ACCESS_TOKEN` and `GOOGLE_ANALYTICS_TRACKING_ID` secret names are unchanged; the build-time client variable is `VITE_GOOGLE_ANALYTICS_TRACKING_ID`.
- Branch protection and review requirements are unchanged. An administrator can make `verify` a required check.

`npm run deploy` remains available for an authorized manual release and builds before publishing. Do not run it to preview changes.

## Runtime and hosting conventions

- Root `index.html` is the Vite entry and keeps the GitHub Pages query-to-route restoration script. `npm run build` runs the client build and `scripts/prerender.mjs`, using `src/app/prerender.tsx` and `src/content/pages.ts` to write each published route's `index.html`. Canonical URLs end with a slash except the root. `public/404.html` and `public/CNAME` remain the hosting fallback and domain configuration.
- Public media keep their `static/media/<name>.<content-hash>.<extension>` URLs so shared PDF, map and image links survive a rebuild. JavaScript and CSS filenames may change.
- Styling is Tailwind utilities plus the layered stylesheets in `src/styles`, entered from `theme.css`. Tailwind's Preflight is deliberately not imported: the site's geometry depends on the reset it shipped with, which `src/styles/reset.css` carries explicitly. Do not add `@import "tailwindcss"` back.
- Fonts load from a stylesheet link in the HTML rather than a nested CSS import, which prevents an unstyled startup flash in WebKit.
- Initially visible images stay eager; offscreen content is lazy with reserved dimensions. The gallery is manual, keeps the last loaded selection visible while another loads, and skips failures. Archived videos load only after activation.
- `VITE_GOOGLE_ANALYTICS_TRACKING_ID` is optional and used only in production builds. Vite-prefixed variables are public client configuration, not a place for credentials. Analytics keeps the existing tracker, queues early commands, and defers vendor loading until idle, interaction, or its deadline.
- GitHub Pages' cache headers and hosting configuration are unchanged. Longer immutable caching would need a separate hosting decision.
- npm install-script decisions are version-scoped in `package.json`; the optional watcher source builds are denied and supported platforms use prebuilt packages. Review `npm install-scripts ls` before changing them.
