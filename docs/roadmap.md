# Distrosid — Roadmap (AI-native music distribution)

Repository: sdntsng/distrosid
Default branch: main
Goal (vision): Build an AI‑native "export → published → promoted" rail that sits after any DAW / AI tool / cloud editor. Make it possible for an artist to drag a master file (or paste a share link) and get a fully scheduled, distributable release plus ready-to-post social assets and a promotion plan in minutes.

This roadmap splits the product into a clear MVP (v0 wedge) and phased epics that follow the 5-step experience:

- Step 1 — Intake from "anywhere" (drop‑zone + smart ingestion)
- Step 2 — AI‑filled distribution form (validation + one‑click distro)
- Step 3 — Auto‑setup profiles and smart links (claim guidance + landing)
- Step 4 — AI‑native promotion layer (shorts, captions, campaign presets)
- Step 5 — Feedback loop & ranking engine (analytics -> template optimization)

MVP wedge (v0): "Drag in a master file, get a release scheduled + smart link + a week of platform-specific social content in under 10 minutes."
- Focus: Drop zone ingestion, basic audio analysis (format, loudness check, clipping, duration), AI metadata extraction (title, artist, featured), auto artwork generation (3000×3000), basic distribution form with "one‑click distro" stub (queue locally / API stub), and simple promo pack: 3x short videos (vertical 9:16 clips), 7x caption suggestions, and a smart link landing page.

Principles
- AI-first UX: Pre-fill, suggest, and validate — user mostly approves.
- Transparent checks: warn about release‑readiness, never auto-master.
- API-first: make aggregator or in-house distro APIs swappable.
- Privacy by design: users own uploads, clear opt-ins for sharing analytics.
- Iterative: ship v0 fast, learn from usage signals, improve templates.

Roadmap (high level milestones)
- Milestone 0 (Discovery & infra): repo scaffolding, basic CI, S3 (or compatible) upload sandbox, job queue, and simple web UI shell.
- Milestone 1 (Drop zone + ingestion): implement multi-format upload + link import + server-side validation + audio analysis.
- Milestone 2 (AI metadata + asset gen): metadata extraction, auto artwork, basic credits, explicit flag, tags; UI to review & edit.
- Milestone 3 (One‑click distro flow): distribution form, store validation rules, scheduling UI, delivery queue + aggregator adapter.
- Milestone 4 (Smart links & profile guidance): smart‑link generator, pixel/UTM support, artist claim guidance flows.
- Milestone 5 (Promo generator): short videos, captions, posting calendar, paid campaign presets.
- Milestone 6 (Data & feedback): analytics collection pipeline, ranking engine for campaign templates & hooks for automated recommendations.

Success metrics (v0 / first 90 days)
- Time-to-release (drag → scheduled) median < 10 minutes.
- % of releases auto-filled to 80%+ of required form fields.
- Conversion: % of users who complete release after drop (%) target: > 30% (early).
- Engagement: % of users using promo pack: > 25% (early).
- Accuracy: AI metadata extraction F1 target > 0.8 on title/artist detection for common cases.

Tech & infra considerations (initial)
- Storage: S3-compatible for uploads + stems zips.
- Audio processing: FFmpeg + loudness (EBU R128) / clipping detect + sample/bit-depth checks.
- AI: Use local/hosted LLMs (or 3rd party) for metadata extraction, artwork generation via image models (or callouts), and promo text/video generation.
- Worker queue: Celery / Sidekiq / Bull / AWS Step Functions (choose based on stack).
- Web UI: React (Vite) for rapid iteration; API: Go/Node/Python depending on team preference.
- Security: signed expiring upload URLs, virus/malware scan for uploads, rate limiting.

Priorities for next sprint (2 weeks)
1. Build drop zone with multi-file and link import + backend ingest pipeline.
2. Implement audio inspection (format, sample rate, duration, clipping, true peak, LUFS).
3. AI metadata extraction prototype (filename + audio fingerprinting heuristics).
4. Roadmap.md and issue creation (this file + issues) so we can triage work.

Open questions / assumptions
- Will we act as distributor or integrate aggregator APIs (e.g., Orchard, TuneCore, DistroKid API)? For v0 assume aggregator adapter pattern with a mock/stub.
- Which 3rd-party AI/image/video APIs are available/budgeted? For v0 allow pluggable connectors.
- Copyright & rights verification: initially we will ask users to attest ownership; build takedown / DMCA later.

What follows in this repo (suggested files)
- /web — React front-end for upload form and dashboard
- /api — backend services for ingest, AI tasks, validation, and delivery
- /workers — background jobs for audio analysis, asset gen, and promo rendering
- /infra — IaC for storage, queues, and monitoring
- /docs — design specs and store validation rules

A prioritized issue list (detailed issue drafts provided in .github/ISSUES/) is included to guide next development sprints.