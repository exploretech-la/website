# exploretech.la

The website for [exploretech.la](https://www.exploretech.la/)

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the React Guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

Use Node **14.16.0** for installation, development, and builds. The existing Create React App and node-sass versions do not support current Node releases.

## Updating images

Optimized images are checked in, so normal installs and builds need only Node.
To regenerate them, install `cwebp`, `ffmpeg`, and `ffprobe`. On macOS:

```sh
brew install webp ffmpeg
```

1. Keep the original image under `src/static/`.
2. Add its path and profile to `scripts/image-sources.json`. Portraits use a square crop up to 320px for the 160px team cards. Content images get responsive widths without enlargement. Use an optional `focus` override when the default crop cuts a face.
3. Run `npm run images`. This applies EXIF orientation, generates WebP files, and updates the manifest and `src/constants/optimizedImages.js`.
4. Use the generated map instead of importing an original photograph:

```jsx
import images from "constants/optimizedImages";

// Team roster entries retain a plain image URL.
const portrait = images["team/leadership/sandra-pan.jpg"].src;

// Content images also carry responsive sources and intrinsic dimensions.
<img
  {...images["images/explore-tech-2022.jpg"]}
  sizes="(min-width: 768px) 480px, 100vw"
  loading="lazy"
  decoding="async"
  alt="Our Team"
/>;
```

5. Run `npm run images:check`, then inspect the affected pages at phone and desktop widths. Check faces, transparent logos, and images revealed by scrolling.

`npm run build` runs the image check automatically. It checks source and output hashes, recipe freshness, dimensions, byte budgets, generated-map consistency, and raw raster imports in the configured JavaScript sources. It needs no native image tools. Do not edit generated files by hand.

Use `npm run images -- --only <path-fragment>` for a narrow update, or `npm run images -- --force` after changing encoder behavior or tools. Run `npm run images -- --help` for profile budgets and crop settings. Original files remain regeneration inputs; PDF and map links are excluded from this pipeline.

## Loading and deployment decisions

- Keep above-fold images eager. Offscreen portraits, photos, and sponsor logos use native lazy loading with reserved dimensions. The carousel keeps its current image until a requested slide loads.
- Archived videos make no YouTube requests until the visitor activates a play button.
- Internal routes use React Router. Hash navigation, mobile menu closure, and browser Back scroll restoration are handled without reloading the document.
- Analytics retains the configured tracker and connected GA4 tag. Commands queue immediately; the vendor loads after page load during idle time, on interaction, or after a four-second deadline. Development and builds without `REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID` do not initialize analytics.
- Bootstrap is included once through `src/App.scss`.
- GitHub Pages currently serves hashed assets with a ten-minute cache lifetime. React cannot change those HTTP headers. Longer immutable caching requires a separate hosting/CDN decision; adding a `_headers` file here would not configure GitHub Pages.
- Route imports remain static. The measured first-party JavaScript was about 100 KB compressed; image delivery was the dominant cost. Reconsider route splitting if future measurements justify additional chunk-loading behavior.

To verify changes locally, run `npm test -- --watchAll=false --runInBand` and `npm run build`. The analytics tests use a dummy ID and make no provider requests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
