---
title: "Audio analysis: format checks, loudness (LUFS), true peak, clipping, duration"
labels: ["backend", "audio", "high priority"]
estimate: "4d"
---

Summary
Implement a worker that analyzes uploaded audio for release-readiness signals, without doing mastering:
- Format validation (sample rate, bit depth)
- Duration detection
- Loudness measurement (integrated LUFS, true-peak dBTP)
- Clipping detection and percent clipped
- Channel count (stereo, mono, more)
- Identify stems vs final mix heuristic

User stories
- As a user I want to know if my file is likely to be rejected by stores (e.g., wrong sample rate or clip) so I can fix it before distribution.
- As a product owner I want structured metadata to feed AI models and UI warnings.

Acceptance criteria
- Worker returns a JSON analysis with keys: sample_rate, bit_depth, channels, duration, integrated_lufs, true_peak_db, clipping_percent, is_stem_bucket (bool).
- UI shows analysis results and warns if integrated_lufs outside recommend range (e.g., -14 to -9 LUFS for streaming masters) or if clipping_percent > 0.1%.
- Analysis runs for both individual audio files and the master inside a zip.

Tasks
- Use ffmpeg/ffprobe + ebur128 plugin or libebur128 to measure LUFS.
- Implement clipping detection by scanning peaks sample-by-sample or using ffmpeg filters.
- Create worker job ingest_analysis that saves result to DB and emits notifications for UI refresh.
- Add retry/backoff for transient ffmpeg errors.

Tech notes
- Watch CPU usage for LUFS scanning; sample large files by segment if needed.
- Store raw analysis results for later model training.