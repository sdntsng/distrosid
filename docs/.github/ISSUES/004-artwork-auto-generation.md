---
title: "Auto‑generate release artwork (3000×3000) and validate per store rules"
labels: ["feature", "ai", "design", "medium priority"]
estimate: "4d"
---

Summary
Automatically generate square cover art at 3000×3000 px using:
- Track metadata (title, artist, mood tags)
- Optional user-supplied image (crop, upscale)
- Templates and style presets

Also implement artwork validation rules (size, dimensions, banned content: URLs/QRs/etc) and UI to edit/crop.

Acceptance criteria
- Generated artwork saved as PNG/JPEG at 3000×3000 and presented to the user.
- Validator flags artwork that has text with URLs, QR-code like patterns, or dimensions < 1000×1000.
- UI allows user to accept or upload replacement.

Tasks
- Integrate image model (or call to 3rd party) with template presets.
- Implement automatic cropping and center composition; maintain safe area for text.
- Validate per simple rules and surface specific error messages.
- Provide "Regenerate" with randomized stylistic variants.

Tech notes
- Ensure copyright claims: if user uploads an image, require attestation to rights.
- For v0 allow coarse NSFW filter and banned content heuristics.