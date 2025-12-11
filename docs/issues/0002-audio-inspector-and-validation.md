# Issue: 0002 — Audio inspector & release‑readiness checks

Description
-----------
Implement an audio inspection pipeline that analyzes uploaded audio and returns structured diagnostics:
- Format checks (sample rate, bit depth, channels)
- Loudness (LUFS quick estimate), peak clipping detection
- Duration
- Presence of silence/padding at start/end
- Stem detection heuristics (multi‑track zips vs single master)
- Return warnings/suggestions to user (e.g., "peak clipping detected", "LUFS -6dB — recommended mastering")

Acceptance criteria
-------------------
- Each Upload triggers analysis job that stores an AnalysisResult record.
- AnalysisResult includes JSON fields: format, sample_rate, bit_depth, duration, loudness_lufs_estimate, clipping: boolean, clipping_timestamps[]
- Frontend shows warnings and suggested next steps.
- Unit tests for analysis functions and at least 1 integration test using an example file.

Tasks
-----
- [ ] Add AnalysisResult model and migration.
- [ ] Integrate ffmpeg/sox for format/duration/peaks.
- [ ] Implement LUFS estimate (lib or heuristic).
- [ ] Build clipping detection and summary.
- [ ] Expose analysis via API for frontend to consume.
- [ ] Add UI warnings and suggested CTA (e.g., "upload new file", "proceed anyway").

Labels
------
- type:feature, area:audio, priority:high

Estimate
--------
3–6 days (1 engineer)

Dependencies
------------
- 0001 (upload ingest) complete