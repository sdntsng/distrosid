# Issue: 0004 — Artwork generation & store validation

Description
-----------
Generate release artwork candidates and validate them against common store rules:
- Auto‑generate up to 3 3000×3000 cover art candidates using image generation with controlled prompts and banned-content checking.
- Validate artwork for size, aspect ratio, text length, presence of URLs/QR codes, and explicit content warnings.
- Present candidates with an option to regenerate or upload a custom image.

Acceptance criteria
-------------------
- Artwork generator API returns 3 candidate images (3000×3000) and a small thumbnail.
- Validator reports issues: too small, contains URL/QR, infringing text, etc.
- Frontend allows selection and shows validation outcome; invalid images cannot be selected for publish.
- Ensure user must confirm they have rights to the image.

Tasks
-----
- [ ] Integrate image generation model (or local model wrapper).
- [ ] Implement store rule validator module (configurable rules).
- [ ] UI for artwork selection + confirm rights checkbox.
- [ ] Add logging for artwork request / generation prompts for auditing.

Labels
------
- type:feature, area:artwork, priority:high

Estimate
--------
6–12 days (AI + legal review)

Dependencies
------------
- 0003