# Site-wide image source repair and logo swap

## What will change
- Replace the landing background, whitelist background, button artwork, corner frames, center frame, footer logo, title logo, preview GIFs, and social icons with jsDelivr links from the ARCSultans repository.
- Replace both visible “ARCSultans” text titles with the supplied title artwork, keeping the landing version large and the panel version compact.
- Preserve the current dimensions, positions, overlays, transitions, button behavior, form behavior, and footer layout.
- Apply crisp pixel rendering to every displayed site image.
- Remove obsolete local image imports from the page so no broken project-asset URL remains in rendered content.

## Verification
- Confirm every jsDelivr image URL responds successfully.
- Check the landing, expanded whitelist, and dialog states in the live preview.
- Verify there are no failed image requests, the corner frames remain aligned, and both title-logo sizes match their existing placements.
- Check desktop and mobile layouts and confirm the project compiles successfully.
