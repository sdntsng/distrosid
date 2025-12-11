---
title: "Store validation rules + AI‑filled distribution form"
labels: ["feature", "backend", "integration", "high priority"]
estimate: "6d"
---

Summary
Implement a distribution form prefilled by AI and validated against common store rules:
- Artwork (dimensions/content)
- Text fields (no URLs, allowed characters)
- Artist name dedupe checks
- File format and loudness rules
- Basic rights attestation

Also, implement a "one‑click distro" flow that records platform choices and enqueues delivery jobs.

Acceptance criteria
- Form fields are auto-filled by extractor and editable.
- Validation runs in real-time and prevents scheduling if critical errors exist.
- A "Queue for delivery" action stores a delivery job (no live store API required for v0; use adapter pattern).
- UI warns about store lead times and offers "fast mode" toggle.

Tasks
- Implement a rules engine that holds validations per platform (start with Spotify, Apple, YouTube Music).
- Frontend: distribution review UI with platform toggles and calendar.
- Backend: delivery queue + adapter interface for connectors.
- Add admin-configurable rules JSON to evolve validations without code changes.

Tech notes
- Keep platform rules as JSON with severity (error/warn/info) and messages.
- For v0, use mock adapter that simulates acceptance and returns sample ISRC/UPC if requested.