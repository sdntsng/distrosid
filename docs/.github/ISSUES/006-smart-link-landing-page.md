---
title: "Smart link generator & landing page with pre-saves and UTM/pixel support"
labels: ["feature", "frontend", "medium priority"]
estimate: "4d"
---

Summary
Generate a shareable smart-link landing page per release that aggregates platforms, supports pre-saves where available, and includes UTM and pixel/measurement configuration for ad campaigns.

Acceptance criteria
- Given a release ID, system can generate a short smart link (slug) and a landing page listing platform links.
- Pre-save option stub for Spotify (mocked).
- Landing page supports UTM parameters and a pixel snippet (mock).
- Admin can configure default social cards and meta tags.

Tasks
- UI: landing page template & preview in app.
- Backend: slug generation, link registry, and redirect endpoints.
- Analytics: basic click tracking (store in DB) for UTM attribution.

Tech notes
- For initial release, host landing page in the app domain; later allow white-label pages.
- Respect privacy regs for pixel usage (consent banner later).