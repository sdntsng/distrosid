---
title: "Analytics pipeline + feedback loop: measure saves, completions, template performance"
labels: ["feature", "data", "medium priority"]
estimate: "8d"
---

Summary
Design the analytics pipeline to ingest event data (clicks, landing page visits, social engagement metrics via connectors), compute signals that matter (saves, completion rates, playlist adds), and feed those into a recommendations engine for templates and promo plans.

Acceptance criteria
- Basic event collection and storage (clicks, downloads, campaign starts).
- Dashboard showing top signals for a release (clicks, smart-link clicks, downloads).
- Feedback mechanism that ranks promo templates by observed uplift (simple A/B capture).

Tasks
- Implement event API and DB schema for events.
- Add basic dashboard endpoints to surface counts and trends.
- Create a job that computes simple heuristics (e.g., conversion = clicks → pre-saves).
- Define experiment schema for testing templates.

Tech notes
- Respect PII and user consent for data collection.
- For v0, start with internal synthetic signals and manual import hooks for streaming analytics.