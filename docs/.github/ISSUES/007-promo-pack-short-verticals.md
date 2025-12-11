---
title: "Promo pack: generate short vertical clips + captions + posting calendar"
labels: ["feature", "ai", "media", "high priority"]
estimate: "8d"
---

Summary
Automatically generate social content targeted to TikTok/Instagram Reels/YouTube Shorts:
- 3x vertical clips (9:16) focused on strongest hook (12–30s)
- 7x caption suggestions / hashtags
- 1‑week posting calendar with suggested times & platforms

Acceptance criteria
- System identifies the 12s–30s "hook" using loudness envelope / chorus detection / vocal prominence heuristics, then generates clips by sampling and applying simple visualizer overlays or waveform + artwork.
- Captions produced by AI include CTA lines and can be edited.
- Posting calendar UI allows scheduling/export of clips.

Tasks
- Build "hook finder" worker that scores 3 candidate segments.
- Implement video generator: static artwork + waveform + simple zoom/pan + audio segment.
- Integrate caption generator (LLM) with template presets.
- Provide download and scheduled-post export (download for manual posting in v0).

Tech notes
- Keep video rendering server-side (ffmpeg) and cache outputs.
- For visuals, start with safe, fast templates (artwork + waveform + subtitles).