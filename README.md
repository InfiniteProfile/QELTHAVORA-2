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
- A further batch of 300 is prepared when the visitor reaches 100 records before the end of the prepared sequence. For the first batch, this means preparation begins around profile 100; for the next batch, around profile 400, then 700, 1,000, and so on.
- Each completed batch triggers another threshold check, so a visitor who has already scrolled past a threshold cannot leave generation stalled.
- The same threshold process repeats indefinitely, with no configured maximum profile count.
- Profiles are deterministic: the same decimal ID always resolves to the same profile identity and content. Records are generated from their ID when needed rather than storing every generated object in memory.
- Profile IDs are normalized and handled as decimal strings; `BigInt` is used for sequential arithmetic, never JavaScript `Number`.
- Exact ID search accepts arbitrarily long positive decimal strings, including IDs beyond the current feed batch.
- A virtualized feed keeps a small visible window of cards in the DOM. Fixed-height rows and exact spacer geometry preserve the feed height and scroll position while off-screen cards are recycled. The archive stores only the prepared ID range; it does not retain every generated profile object in a growing array.
- No code calls `scrollTo` during generation. The only scroll restoration is when a profile modal is closed, returning to the position from which it was opened.
- Discovery progress is stored locally in `localStorage`.

## Important implementation note
This is a client-side static archive, not a server-backed global database. The infinite profile sequence is reproducibly generated in each browser from its ID. It can resolve any exact decimal ID without downloading a pre-existing record. Search by ordinary words indexes the first 300 profiles and the authored lore records; exact-ID lookup is unlimited.

## Browser compatibility
Use a current browser with `BigInt`, `IntersectionObserver`, and `requestAnimationFrame` support. On older browsers, the site may not support all infinite-feed features.
