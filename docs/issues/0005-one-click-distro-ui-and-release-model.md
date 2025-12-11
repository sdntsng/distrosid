# Issue: 0005 — One‑click distro UI & release model

Description
-----------
Design and implement the central "release" form that the user approves. The AI will have prefilled most fields. The UI should surface:
- Extracted metadata fields (editable)
- Artwork selection
- Release date picker + quick "ship now" / "fast mode (<48h)"
- Platform selection (Spotify, Apple, YouTube, TikTok, etc.)
- Rights confirmation and ISRC/UPC options

Acceptance criteria
-------------------
- Release object created with validated fields.
- One‑click action enqueues Distribution Task(s).
- UI clearly shows fields filled by AI and allows edit.
- Quick mode shows warnings about lead times per platform.

Tasks
-----
- [ ] Define Release DB model and migration.
- [ ] Build frontend release form with prefilled data.
- [ ] Implement server side validation and create queue tasks.
- [ ] Add release status page and logs for distribution attempts.

Labels
------
- type:feature, area:release, priority:high

Estimate
--------
5–10 days (FE + BE)

Dependencies
------------
- 0001, 0002, 0003, 0004