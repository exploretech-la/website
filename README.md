# exploretech.la

The React website for [exploretech.la](https://www.exploretech.la/), built with Vite and Dart Sass and hosted on GitHub Pages.

## Development

Use **Node 24.21.0**, pinned in `.nvmrc` and shared with GitHub Actions.

```sh
nvm install
nvm use
npm ci
npm start
```

The development server runs at `http://127.0.0.1:3000`. It fails clearly if that port is already occupied. JSX and stylesheet edits update through Vite's development server.

## Checks and production builds

```sh
npm test                 # Run the regression suite once
npm run test:watch       # Watch tests while developing
npm run images:check     # Check generated image integrity and budgets
npm run build           # Check images, then build into build/
npm run preview         # Serve the production build locally
```

Tests use Vitest and jsdom. Analytics tests use a dummy ID and make no provider requests.

The build/test tooling is modernized independently of the UI libraries. React 16, React Router 5, and Bootstrap 4 remain pinned to their previously deployed versions. Dart Sass currently warns about legacy imports and Bootstrap APIs; those warnings remain visible and belong to a subsequent stylesheet/UI-library upgrade.

## Updating images

Optimized images are checked in. Normal installs, tests, CI, and builds do not need native image-generation tools.

To regenerate images, install `cwebp`, `ffmpeg`, and `ffprobe`. On macOS:

```sh
brew install webp ffmpeg
```

1. Keep the original image under `src/static/`.
2. Add its path and profile to `scripts/image-sources.json`. Portraits use a square crop up to 320px for the 160px team cards. Content images get responsive widths without enlargement. Use a `focus` override when the default crop cuts a face.
3. Run `npm run images`. It applies EXIF orientation, generates WebP files, and updates the manifest and `src/constants/optimizedImages.js`.
4. Import the generated map rather than an original photograph:

```jsx
import images from "constants/optimizedImages";

// Team roster entries retain a plain image URL.
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

5. Run `npm run images:check`, then inspect the affected pages at phone and desktop widths. Check faces, transparent logos, and images revealed by scrolling.

The check validates source/output hashes, recipe freshness, dimensions, byte budgets, generated-map consistency, and raw raster imports in the configured JavaScript sources. Do not edit generated files by hand.

Use `npm run images -- --only <path-fragment>` for a narrow update, or `npm run images -- --force` after changing encoder behavior or tools. Run `npm run images -- --help` for profile budgets and crop settings. Original files remain regeneration inputs; PDF and map links are excluded from this pipeline.

## CI and deployment

- Pull requests targeting **`master`** run `.github/workflows/ci.yml`: `npm ci`, `npm test`, and `npm run build`, including its image checks. This job has read-only repository access, receives no deployment secrets, and never publishes the site.
- Pushes to **`master`** run `.github/workflows/deploy.yml`: install, test, build, then publish the verified `build/` directory to **`gh-pages`**. The deploy token is available only to the publishing step, not to installation, tests, or build tools.
- Both workflows use the Node version in `.nvmrc`, the committed lockfile, npm caching, and SHA-pinned official checkout/setup actions.
- The existing `DEPLOY_ACCESS_TOKEN` and `GOOGLE_ANALYTICS_TRACKING_ID` repository secret names are unchanged. Only the build-time environment variable is renamed to `VITE_GOOGLE_ANALYTICS_TRACKING_ID`.
- Branch protection and review requirements are unchanged. The PR check is named `verify`; an administrator can make it required in branch protection if desired.

`npm run deploy` remains available for an authorized manual release and builds before publishing. Do not run it just to preview changes.

## Runtime and hosting conventions

- Root `index.html` is the Vite entry. It retains the GitHub Pages query-to-route restoration script; `public/404.html` and `public/CNAME` are copied unchanged.
- Public media retain the existing `static/media/<name>.<content-hash>.<extension>` URLs so shared PDF/map links and cached images survive the bundler migration. JavaScript and CSS filenames may change.
- `components/`, `constants/`, `static/`, and `util/` imports resolve from `src/`; `jsconfig.json` keeps the same editor lookup root.
- `VITE_GOOGLE_ANALYTICS_TRACKING_ID` is optional and is used only in production builds. Vite-prefixed variables are public client configuration, not a place for private credentials. Analytics keeps the existing tracker and connected GA4 behavior, queues early commands, and defers vendor loading until idle, interaction, or its deadline.
- Fonts load from an HTML stylesheet link rather than a nested CSS import, preventing an unstyled startup transition in WebKit.
- Initially visible images stay eager; offscreen content uses lazy loading with reserved dimensions. The carousel waits for selected images and skips failures. Archived videos load only after activation.
- GitHub Pages' cache headers and the hosting configuration are unchanged. Longer immutable caching would require a separate hosting/CDN decision.

npm install-script decisions are version-scoped in `package.json`. Review `npm install-scripts ls` before approving scripts introduced by a dependency update.
