---
title: "User rights attestation & minimal legal flow"
labels: ["compliance", "legal", "low priority"]
estimate: "2d"
---

Summary
Create a simple rights attestation and terms flow to capture that the uploader has the rights to distribute audio and artwork. This is a legal-first, minimal flow for v0.

Acceptance criteria
- During distribution submission, user must check a rights attestation box.
- Store a signed attestation record with timestamp and user agent.
- Provide easy-link to TOS and Privacy policy stub.

Tasks
- Add attestation checkbox to distribution UI and persist.
- Include attestation in delivery adapter payload.

Tech notes
- Not a replacement for full legal review; will evolve with counsel.