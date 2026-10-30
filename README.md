# QELTHAVORA — The Infinite Archive

A static, fictional-worldbuilding website about an entirely invented faith and its unresolved archive.

## Files
- `index.html` — page structure and original lore
- `style.css` — responsive visual system
- `script.js` — deterministic profile generation, infinite batching, search, profile modal, and clue progress

## Run locally
Open `index.html` in a modern browser. No build step, backend, API key, or database is required. The Google Fonts connection is optional; system fallbacks are included.

## Publish with GitHub Pages
1. Create a GitHub repository.
2. Upload all four project files to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for the Pages URL to appear in the Pages settings.

## Infinite archive design
- The first 300 sequential profile IDs are generated at startup.
- A further batch of 300 is prepared when the visitor approaches the first 100 records / the prepared-batch threshold.
- The same threshold process repeats indefinitely.
- Profiles are deterministic: the same decimal ID always resolves to the same profile identity and content.
- Profile IDs are normalized and handled as decimal strings; `BigInt` is used for sequential arithmetic, never JavaScript `Number`.
- Exact ID search accepts arbitrarily long positive decimal strings, including IDs beyond the current feed batch.
- A virtualized feed keeps only a small visible window of profile cards in the DOM and uses spacer elements to preserve scroll geometry.
- No code calls `scrollTo` during generation. The only scroll restoration is when a profile modal is closed, returning to the position from which it was opened.
- Discovery progress is stored locally in `localStorage`.

## Important implementation note
This is a client-side static archive, not a server-backed global database. The infinite profile sequence is reproducibly generated in each browser from its ID. It can resolve any exact decimal ID without downloading a pre-existing record. Search by ordinary words indexes the first 300 profiles and the authored lore records; exact-ID lookup is unlimited.

## Browser compatibility
Use a current browser with `BigInt`, `IntersectionObserver`, and `requestAnimationFrame` support. On older browsers, the site may not support all infinite-feed features.
