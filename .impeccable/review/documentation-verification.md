# Choir documentation verification

Date: 2026-10-19
Disposition: documentation refreshed; source and rendered review agree within the assigned child-app scope.

## Scope and authority

Refreshed only `microduck-singing/DESIGN.md`, `microduck-singing/.impeccable/design.json` and this verification note. The parent assigned an explicit documentation refresh of the inherited copies, so the existing documents were inspected before merging true shared identity with the implemented choir-specific system. No implementation, PRODUCT.md, README or parent design file was changed by this handoff.

The inherited Creative North Star remains “奶油搪瓷街机 · Enamel Toy Sports Arcade”. Cream enamel, marine ink and selection, coral action, self-hosted Bungee, rounded docks and inline SVG grammar remain. Choir prose now describes the thin-mint environment, circular wooden rehearsal floor, four seated colored robots, programme, audition and transport. Football scores, player-name fields, shooting controls, dance policy and alternate race/football worlds were removed from this child design contract.

## Evidence inspected

- Product authority: `PRODUCT.md` and `.impeccable/surfaces/choir.md`.
- Implementation: `index.html`, `src/style.css`, `src/stage.js`, and `src/main.js` for generated controls and state semantics.
- Existing captures inspected visually: `.impeccable/review/desktop.png` (1440 × 900) and `.impeccable/review/mobile.png` (390 × 945 full page). No browser was opened and no new UI verification loop was started.
- Parent-provided finish disposition: ship at 1440 × 900, 1280 × 720 and 390px full-page mobile; no fixes requested. The 1280 capture was not independently re-reviewed in this documentation pass.

## Documentation checks

- All eight canonical DESIGN.md sections are present in order. Token primitives remain in the YAML frontmatter; extensions remain in the schemaVersion 2 sidecar.
- Restricted frontmatter mapping syntax, JSON-compatible scalar values, allowed component properties, typography properties and all token references were checked. A separate PyYAML parser was unavailable; no external schema-linter result is claimed.
- All 22 documented color primitives occur in child CSS or stage source. Sidecar color and typography metadata keys exactly match their frontmatter counterparts. Every color has an eight-step dark-to-light synthesized OKLCH ramp; these are preview extensions, not extra application tokens.
- Nine preview components cover the primary and quiet buttons, programme navigation, default and selected voice buttons, native volume range, native read-only progress, transport card and about card. Every `refersTo` resolves. HTML uses `ds-` classes and inline SVG, with no image or framework dependency. Existing CSS custom properties use fallback values; other source values are literal. Interactive previews include focus and hover rules where meaningful. Native ranges keep native interaction. No invented universal active displacement or transition was added.
- North Star, overview, characteristics, named rules and do/don't bullets match between DESIGN.md and sidecar verbatim.
- Breakpoints, short-desktop behavior, shadow removal on mobile, native range/progress semantics, reduced motion, disabled/loading and selected/muted states are documented from code. The documentation does not claim a modal dialog or timeline seeking.

## Preexisting parent drift (reported only)

The parent `/Users/wander/PyProjects/MicroDuck/DESIGN.md` describes independently trained DuckEMW dance weights and physical dance performance. Its `.impeccable/design.json` still has older narrative bullets describing original choreography and saying the dance is not DuckEMW model inference (`narrative.dos[3]`, `narrative.donts[2]`). This is an inherited inconsistency outside the child-app boundary; neither parent file was changed. No inference about the actual parent implementation is made in this documentation pass.

## Artifact fingerprints

- `DESIGN.md`: SHA-256 `a31d061b3d49d99c1de2e547dd1dd84e0807ad8c830328983d00ec39129870bb`.
- `.impeccable/design.json`: SHA-256 `8f204bc60a6f466ba2ac32ada98114303a84800de9e9230879c24332fdfc4e59`.


## User-requested close framing follow-up

The user supplied a near-framing reference and requested a closer default camera. Initial framing and the restore-view button now share the same responsive defaults: desktop position (0.378, 0.597, 1.159), target (0, 0.11, 0), FOV 32°; scene width ≤760px uses position (0.45, 0.77, 1.38), target (0, 0.19, 0), FOV 48°. The desktop is closer and raised; compact view preserves four complete ducks. DESIGN.md and the sidecar extensions record these source values.

Latest evidence: user-1450.png is the 1450×857 page cropped from a fresh native Chrome capture after refresh; mobile.png is the 390×945 page cropped from Chrome responsive mode. Browser toolbar/device panels are excluded. Tiny right-side translator icons are Chrome extensions, not application content. Prior desktop.png/desktop-1280.png are earlier far-camera history and do not prove the latest framing. The fresh reviewer scored its sole framing correction resolved, disposition ship, in close-view-verdict.md. This follow-up does not claim new physics/audio validation.
