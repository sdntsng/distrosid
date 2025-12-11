---
title: "AI metadata extraction: title, artist, featured artists, release type, language, explicit"
labels: ["feature", "ai", "backend", "medium priority"]
estimate: "5d"
---

Summary
Build an AI-assisted metadata extractor that uses:
- Filename heuristics
- Short user-provided description (optional)
- Audio-derived signals (silence boundaries, vocal detection, lyric presence)
- External hints (ID3 tags if present, embedded metadata)

It should auto-fill the distribution form: track title, main artist, featured artists, suggested release type (single/EP), language estimate, explicit flag suggestion.

Acceptance criteria
- Given a test set of filenames and short descriptions, the extractor fills fields with >80% accuracy for simple cases.
- The extraction returns confidence scores and highlights fields likely wrong.
- UI shows prefilled values and allows editing before confirm.

Tasks
- Create simple rule-based preprocessor for filenames (e.g., "Artist - Title (feat XYZ) [[explicit]]").
- Plug into an LLM/ML model for fuzzy cases (e.g., language detection, explicitness).
- Add endpoint POST /extract-metadata that returns suggestions + confidences.
- Add UI review panel that surfaces suggestions with inline edit.

Tech notes
- Keep the model pluggable (support for hosted LLMs or local).
- Do not send raw user audio to third-party LLMs unless opt-in; use derived metadata and small text payloads.