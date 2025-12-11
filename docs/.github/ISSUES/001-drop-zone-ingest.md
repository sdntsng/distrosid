---
title: "Drop zone: universal intake (file upload + link import)"
labels: ["feature", "high priority", "frontend", "backend"]
estimate: "5d"
---

Summary
Build a single "drop zone" UI and backend intake pipeline that accepts:
- Local files: WAV, MP3, FLAC, AAC, stems (multi-track), zip archives
- Paste links: cloud storage (S3, Google Drive, Dropbox), share links from Suno / Udio / BandLab
- Drag & drop multiple files (single track + optional stems)

Goals / user stories
- As a user I can drag a file or paste a share link and start an ingestion pipeline.
- As a user I can see immediate validation (file type, size, duration).
- As a developer the backend stores an immutable upload and enqueues analysis jobs.

Acceptance criteria
- Frontend: drop zone UI accepts files and links, shows progress, and returns upload success or error.
- Backend: receives upload, generates signed URL storage reference, stores metadata record, and enqueues an "ingest_analysis" job.
- Uploads are virus scanned (placeholder / mock during v0).
- Link import supports fetching public URLs and saving to storage (handles redirects & basic auth errors).
- Uploads support at least 500MB file sizes.

Tasks
- UI: create DropZone component with file + link modes, previews, progress bars.
- API: POST /uploads to get signed upload URL or to fetch link into storage.
- Worker: enqueue ingest job: create DB record, store original filename, size, source, timestamp.
- Logging & errors: surface transient errors and suggest user actions (retry, contact).
- Tests: unit tests for UI component; integration test for API + worker enqueue (mocked).

Tech notes
- Use signed URLs for direct-to-S3 upload; for link imports, server downloads into storage.
- Validate file extension and sniff MIME type server-side with ffprobe.
- Record SHA256 of final object for dedupe and integrity.