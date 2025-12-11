# Issue: 0006 — Distribution adapter interface & mock aggregator

Description
-----------
Create a Distribution Adapter interface to abstract store/aggregator integrations. Implement a mock aggregator adapter for end‑to‑end testing (it simulates delivery, accepts payloads, and returns statuses).

Acceptance criteria
-------------------
- Adapter interface defined with methods: preparePayload(release), submit(payload), checkStatus(task_id)
- Mock adapter implements interface and returns deterministic success/failure responses.
- Queue engine can call adapter per platform and persist results.
- Integration tests validate that a release goes through the queue and ends with a "submitted" status (mock).

Tasks
-----
- [ ] Design adapter interface and types.
- [ ] Implement mock adapter service.
- [ ] Build queue worker that uses adapters.
- [ ] Add DB fields to store adapter responses and error messages.

Labels
------
- type:infrastructure, area:distribution, priority:medium

Estimate
--------
3–6 days (BE)

Dependencies
------------
- 0005