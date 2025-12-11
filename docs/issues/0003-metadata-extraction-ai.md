# Issue: 0003 — Metadata extraction (AI): titles, artists, featured, language, lyrics/no‑lyrics

Description
-----------
Use filename, embedded metadata (ID3), and an LLM-based prompt to extract suggested metadata:
- Track title
- Primary artist
- Featured artists / collaborators
- Suggested release type (single/EP)
- Language / vocal vs instrumental
- Suggested explicit flag
- Suggested short description / pitch

Acceptance criteria
-------------------
- API endpoint /jobs/extract-metadata that returns structured suggestions.
- Suggestions include confidence score and source (filename, ID3, audio-analysis, LLM).
- Frontend displays suggestions in editable form fields and highlights low‑confidence items.
- Provide unit tests and at least two sample files with expected suggestions.

Tasks
-----
- [ ] Define metadata schema + DB changes.
- [ ] Build service that combines ID3 parsing + filename heuristics.
- [ ] Integrate LLM service for refinement (prompt design, safety).
- [ ] Return suggestion provenance and confidence.
- [ ] Frontend: populate release form with suggestions and allow edits.

Labels
------
- type:feature, area:ai, priority:high

Estimate
--------
5–10 days (ML + FE)

Dependencies
------------
- 0001, 0002