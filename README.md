# exploretech.la

The website for [exploretech.la](https://www.exploretech.la/): a React single-page app written in TypeScript, built with Vite and Tailwind, and hosted on GitHub Pages.

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
| `src/content/sections.ts` | Home page section ids used by header hash links | A home page anchor is added or renamed |
| `src/features/` | Page rendering and feature-specific home or Ignite copy | A page layout or its local copy changes |
| `src/components/` | Shared UI and media only | Something is genuinely used by more than one feature |
| `src/styles/` | `theme.css` entry, tokens, reset, and per-area layers | The design changes |
| `src/constants/optimizedImages.ts` | Generated image map — never edit by hand | Never; run `npm run images` |
| `src/static/` | Original photographs and documents, and generated WebP output | You add a source image or document |
| `scripts/` | Image pipeline, content check, browser smoke, test server, parity tools | Tooling changes |
| `src/app/` | Entry, routes, analytics and scroll effects | A route is added or removed |

Content is central on purpose: authors change `src/content` without knowing which component renders it, and features read content without owning it.

Home carousel and sponsor records live in `src/features/home/content/`. Team and speaker identities always live in the shared people registry.

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

A person with no portrait simply omits `image`; their card still renders with name and role.

### Change a roster or a role

Edit `src/content/teams.ts`. Each member is a reference plus the title held *in that section*, so the same person can appear in several teams with different titles. Card order follows the array; tab order follows the section order.

```ts
{ personId: "benjamin-garcia", title: "Web Dev Lead" },
```

`personId` is checked against the registry at compile time and again by `npm run content:check`.

### Change an event

Edit the year module under `src/content/events/` (`2022.ts` is served at `/resources`, `2023.ts` at `/resources2023`, `2026.ts` at `/resources2026`, and `2021.ts` is the registration page at `/register`). Schedules, workshop cards, maps, waivers, FAQ entries and the feedback link are all data there. Archived workshop videos hold a bare YouTube id, never a watch URL, and always render behind the click-to-load facade.

### Add an event year

1. Add `src/content/events/<year>.ts` exporting an `EventContent`.
2. Register it in `src/content/events/index.ts`: the module in `EVENTS`, and its path, year and menu label in `EVENT_ROUTES`.

That is the whole change. The router and the Resources menu are generated from `EVENT_ROUTES`, which is also why the menu label lives there: `/resources` serves the 2022 content under the label "exploretech 2021" it shipped with.

Old years stay published. They are history, not dead code.

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
npm run build        # Checks images, then builds into build/
npm run preview      # Serve the production build locally
```

`npm run content:check` loads the content modules through Vite, so imported images and documents are resolved the way the app resolves them. It reports missing people, duplicate profiles or roles, shared profile links, missing assets, malformed URLs and video ids, and duplicate routes or workshop titles. It makes no network requests: a syntactically valid but dead external link still passes.

### Browser smoke

```sh
npx playwright install chromium   # once per machine
npm run build
npm run test:browser
```

The suite (`scripts/browser-smoke.spec.ts`, configured in `playwright.config.ts`) runs Chromium against the **built** site served by `scripts/serve-built-site.cjs`, which answers unknown paths with `404.html` exactly as GitHub Pages does. Point it at another build with `SMOKE_ROOT=/path/to/build`, or move it off port 4390 with `SMOKE_PORT`.

Every cross-origin request is aborted and recorded, so the suite is offline and reaches no analytics or video vendor. It covers:

- all 13 routes, the `/our_team` alias, its trailing slash, and the not-found page and title;
- deep links surviving the Pages 404-to-root restore with their query and hash intact;
- the phone menu opening, navigating, closing, and still landing on a hash section;
- a repeated same-hash click scrolling back;
- a pushed route starting at the top while Back leaves scrolling to the browser;
- all seven team sections, eager-then-lazy portraits, and cards with no portrait;
- archived videos requesting nothing before activation, keyboard activation, and unchanged geometry after it;
- every shared PDF and map link answering 200;
- the carousel holding the current slide until a slow one loads, and skipping a broken one without locking up.

Add a case when you fix a bug a user could see; keep it in this one file.

`npm run visual:parity` captures the screenshot and geometry matrix used to compare a change against a saved baseline build. It is a review tool, not part of CI.

Use the same browser version for both captures. Serve the saved baseline and candidate builds with `scripts/serve-built-site.cjs` on separate ports, then run:

```sh
SITE_URL=http://127.0.0.1:4391 OUTPUT_DIR=/tmp/site-before npm run visual:parity
SITE_URL=http://127.0.0.1:4392 OUTPUT_DIR=/tmp/site-after BASELINE_DIR=/tmp/site-before npm run visual:parity
node scripts/asset-parity.cjs /path/to/baseline/build build
```

`WIDTHS=390,768,1440` narrows a capture. The default includes every Bootstrap-era breakpoint and its adjacent pixels. Read [the UI canon](docs/ui-canon.md) before changing shared controls or styling.

## CI and deployment

- Pull requests targeting **`master`** run `.github/workflows/ci.yml` as the `verify` job: `npm ci`, typecheck, lint, formatting, content check, tests, `npm run build` including its image checks, then Chromium smoke against that build. On failure it uploads the Playwright traces and screenshots. The job has read-only repository access, receives no deployment secrets, and never publishes the site.
- Pushes to **`master`** run `.github/workflows/deploy.yml`: install, test, build, then publish the verified `build/` directory to **`gh-pages`**. The deploy token is available only to the publishing step.
- Both workflows use the Node version in `.nvmrc`, the committed lockfile, npm caching, and SHA-pinned official actions.
- The `DEPLOY_ACCESS_TOKEN` and `GOOGLE_ANALYTICS_TRACKING_ID` secret names are unchanged; the build-time client variable is `VITE_GOOGLE_ANALYTICS_TRACKING_ID`.
- Branch protection and review requirements are unchanged. An administrator can make `verify` a required check.

`npm run deploy` remains available for an authorized manual release and builds before publishing. Do not run it to preview changes.

## Runtime and hosting conventions

- Root `index.html` is the Vite entry and keeps the GitHub Pages query-to-route restoration script; `public/404.html` and `public/CNAME` are copied unchanged.
- Public media keep their `static/media/<name>.<content-hash>.<extension>` URLs so shared PDF, map and image links survive a rebuild. JavaScript and CSS filenames may change.
- Styling is Tailwind utilities plus the layered stylesheets in `src/styles`, entered from `theme.css`. Tailwind's Preflight is deliberately not imported: the site's geometry depends on the reset it shipped with, which `src/styles/reset.css` carries explicitly. Do not add `@import "tailwindcss"` back.
- Fonts load from a stylesheet link in the HTML rather than a nested CSS import, which prevents an unstyled startup flash in WebKit.
- Initially visible images stay eager; offscreen content is lazy with reserved dimensions. The carousel waits for a selected image and skips failures. Archived videos load only after activation.
- `VITE_GOOGLE_ANALYTICS_TRACKING_ID` is optional and used only in production builds. Vite-prefixed variables are public client configuration, not a place for credentials. Analytics keeps the existing tracker, queues early commands, and defers vendor loading until idle, interaction, or its deadline.
- GitHub Pages' cache headers and hosting configuration are unchanged. Longer immutable caching would need a separate hosting decision.
- npm install-script decisions are version-scoped in `package.json`; the optional watcher source builds are denied and supported platforms use prebuilt packages. Review `npm install-scripts ls` before changing them.
