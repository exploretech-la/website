# UI canon

This is a styling-system migration, not a redesign. `src/styles/theme.css` is the only stylesheet entry. It loads Tailwind's theme and utilities, then explicit base and component layers. Preflight is excluded because it changes the site's heading, image, list, and button geometry.

## Shared controls

- `ActionLink` renders a native anchor and preserves the existing Space-key behavior of action links. Use `action` with one of the site's five existing color treatments: `action-info`, `action-primary`, `action-warning`, `action-outline`, or `action-inverse`. `action-large` is the existing large size. The definitions live in `styles/controls.css`; do not add another button palette in a feature.
- `OutboundLink` owns outbound analytics, email redaction through the analytics module, and same-window navigation completion. Its props are native anchor props plus `eventLabel`.
- `Collapse` owns the menu and FAQ height transition. `disclosure` and `disclosure-transition` avoid Tailwind's unrelated `collapse` visibility utility. The 350ms CSS transition and the previously shipped 300ms fallback remain distinct on purpose.
- `Header` owns the single navigation layout and dropdown behavior. `site-nav-*` and `site-menu-*` are internal selectors, not another component library.
- `content-card-*` and `resource-list-*` supply the shared static card structure. Features compose native elements rather than passing variant props through wrappers.
- `People` and `YoutubeEmbed` own reserved media geometry and loading behavior. The home carousel owns its slide classes and timing separately.

## Values and breakpoints

`styles/tokens.css` owns the brand colors and section spacing. Breakpoints are 576, 768, 992, and 1200px, not Tailwind's defaults. Existing feature queries include 575.98px and an inclusive 768px mobile team rule; those boundaries remain deliberate.

Layout, sizing, spacing, and typography use Tailwind utilities through `@apply`. Exact existing values use arbitrary utilities where a default would change geometry. Motion, gradients, pseudo-elements, and state-specific effects remain ordinary CSS. Group utilities only when their properties do not override one another.

The base reset and some control values derive from the former Bootstrap dependency. Their license is retained in `licenses/bootstrap.txt`; Bootstrap itself, its generic class API, React Bootstrap, and Sass are removed.

## Verify a change

Run the type, lint, content, image, build, and browser checks listed in the README. Compare phone, tablet, desktop, and both sides of affected breakpoints. A screenshot with motion disabled does not prove an animation: exercise the transition separately, including keyboard focus and interrupted open/close actions.

The parity tool stores raw geometry, computed styles, content, links, image attributes, and screenshots. Its comparison ignores implementation class names and permits at most 0.05 CSS pixels of geometry rounding. It does not ignore differences in text, destinations, image order, loading policy, or computed style values.
