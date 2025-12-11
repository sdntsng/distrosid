# Issue: 0001 — Drop‑zone ingest (v0): single upload + URL fetch

Description
-----------
Build a single, responsive "drop‑zone" component and backend ingest endpoint that accepts:
- Local file uploads (WAV, MP3, ZIP)
- Resumable uploads for large files
- Pasteable cloud URLs (Google Drive, Dropbox, S3 HTTP links, Suno/Udio/BandLab links if publicly accessible)

The ingest should:
- Store file metadata (filename, size, mime, hash)
- Generate a temporary audio preview (16‑32k MP3 30s) for UI playback
- Return an Upload object and progress events for the frontend

Acceptance criteria
-------------------
- Frontend drop‑zone supports drag‑drop, file selection, and paste URL.
- Backend endpoint accepts file streams and stores to object store with UUID keys.
- URL fetcher validates accessibility and streams into the same storage pipeline.
- Upload progress displayed to user; upload resumable for >50MB files.
- Create an Upload object in DB with status: pending → processed.

Tasks
-----
- [ ] Design drop‑zone React component (or chosen frontend) with accessible UI.
- [ ] Implement backend /api/uploads (POST) supporting multipart and chunked uploads.
- [ ] Implement URL fetcher service with timeouts and safety checks.
- [ ] Save raw files to object storage (S3/GCS) with lifecycle tags (tmp → release on publish).
- [ ] Create DB schema for Upload objects.
- [ ] Generate 30s preview and store preview ref.
- [ ] Add basic tests and e2e scenario.

Labels
------
- type:feature, area:ingest, priority:high

Estimate
--------
5–8 days (1 engineer)

Dependencies
------------
- Object storage configured
- Authentication (or provide guest token behaviour)

Related
-------
- 0002 (audio inspector), 0003 (metadata extraction)