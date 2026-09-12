# UI canon

The current UI prioritizes participation, readable archives, and keyboard access. The earlier visual-parity migration is recorded separately in `docs/refactor-plan.md`; its layouts and control APIs are not the current design contract.

`src/styles/theme.css` is the only stylesheet entry. Tailwind's theme and utilities are combined with explicit base and component layers. Preflight remains excluded. Brand colors and font tokens live in `styles/tokens.css`; normal text and actions use dark navy rather than low-contrast turquoise text treatments.

## Native controls and shared behavior

- Use a native anchor for email/external destinations and a React Router `Link` for app routes or in-page navigation. Use a native button for an action. Do not suppress normal link keyboard behavior or resurrect `ActionLink`.
- Primary actions use `action action-primary`; secondary actions use `action action-outline`. Definitions live in `styles/controls.css`. Both have a minimum 44px target, visible keyboard focus, and brand-navy colors. Features must not introduce a competing action palette.
- `OutboundLink` adds outbound analytics and navigation completion to native anchor props. Give each destination a meaningful `eventLabel`; distinguish inquiries from newsletter signups or actual registrations.
- `Header` owns the shared navigation. Native disclosure buttons expose expanded state and associated links. Escape returns focus; phone navigation closes after selecting a destination. Labels and links describe programs and audiences rather than internal page structure.
- `Collapse` handles menu and FAQ visibility. `disclosure` avoids Tailwind's unrelated visibility utility. FAQ callers own native question buttons, `aria-expanded`, `aria-controls`, and named answer regions. Zero-duration transitions settle visibility and focus completion immediately instead of waiting for an animation fallback.
- The home photo gallery is manual. Arrow and indicator buttons have specific names, selected state, and 44px targets. No autoplay or hover-only pause behavior. Keep the current image until the requested image loads; reconcile cached image completion during hydration and skip failures without letting stale events replace a newer selection.
- `YoutubeEmbed` requires the actual workshop title. It reserves 16:9 space, requests no player before activation, and moves keyboard focus into the titled iframe after activation.
- People portraits are decorative when the visible name identifies the person. Use empty portrait alt text so a profile link announces the name once. Modified outbound clicks, including Alt-click, retain native browser behavior.
- Workshop cards use native `details`/`summary`, an explicitly labeled filter, a result count, and a clear-filter action. Do not hide essential maps or schedules inside the workshop list.
- `DocumentLink` displays the document name, verified local format/size metadata when available, and a new-tab notice. Never invent sizes for remote document collections.

## Layout and focus

`page-container` provides a maximum 1120px content area plus 24px side gutters. `Section` supplies vertical rhythm only. Do not add global padding to every nested `section`.

Navigation expands at 992px. The home hero stacks until 1100px. People use two phone columns, three from 640px, and four from 992px; the phone department picker replaces the desktop links below 768px. Check content fit at both sides of each affected breakpoint rather than selecting a breakpoint solely because it is a framework default.

App owns one skip link, one `main`, and one footer outside `main`. Client route changes focus the new page heading; hash links focus their destination after a phone menu closes. The department selector opts into retaining focus during its route-based filtering with `data-preserve-route-focus`. POP navigation leaves scroll restoration to the browser. Static and client URLs share canonical metadata; pageview tracking normalizes their trailing slash without dropping query attribution.

## Content and verification

`content/participation.ts` owns published status notices and the real inquiry destinations. Do not infer current registration availability from old forms. Archives must identify their year and must not invite current registration, waiver submission, Zoom attendance, or feedback collection for past events.

Run the README checks, including generated HTML with JavaScript disabled, hydration/console checks, keyboard journeys, mobile overflow and 44px targets, contrast, reduced motion, and slow/failed/cached-image cases. Inspect screenshots for hierarchy and readability, not just presence of controls. Email delivery and third-party form/player behavior are not proven by local link checks.

The base reset contains selected Bootstrap-derived rules; its complete license remains in `licenses/bootstrap.txt`. Bootstrap, React Bootstrap, and Sass are not runtime dependencies or styling APIs.
