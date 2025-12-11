---
title: "Delivery adapter interface + mock aggregator for v0"
labels: ["backend", "integration", "high priority"]
estimate: "5d"
---

Summary
Implement a delivery adapter interface that can be swapped to different aggregator integrations. For v0, provide a mock aggregator that simulates store acceptance, returns sample UPC/ISRC, and emits delivery status events.

Acceptance criteria
- Adapter interface documented (methods: validateArtwork, submitRelease, checkStatus).
- Mock aggregator implementation that simulates queueing and success/failure flows.
- Delivery records persisted with statuses and store responses (mock values).

Tasks
- Define adapter interface and sample JSON contract.
- Implement mock aggregator service and hook into delivery queue.
- Provide CLI / admin UI to inspect delivery jobs and re-run.

Tech notes
- Make the interface resilient to partial failures; store full request/response for audits.