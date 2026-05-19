# Append-Only Memory Rule

## Purpose

`PROJECT_MEMORY_DATABASE.txt` is the main memory database for NEXUS-X ARIA.

It must be updated by appending new information to the end of the existing file.

## Correct Pattern

```text
old database content
+
append-only update block
=
continued database
```

## Incorrect Pattern

```text
new summary database replacing old history
```

## Required Behavior

For every milestone:

```text
[ ] read current PROJECT_MEMORY_DATABASE.txt
[ ] keep old content intact
[ ] add a new APPEND-ONLY UPDATE block at the bottom
[ ] include status, files, commits, validation, and next steps
[ ] do not erase old decisions
[ ] do not rewrite history
```

## Update Block Format

```text
---

# APPEND-ONLY UPDATE — LOG-XXXX — <MILESTONE NAME>

Tanggal update:
YYYY-MM-DD

Jenis update:
APPEND-ONLY UPDATE

Status terbaru:
...

Files changed:
...

Validation:
...

Next step:
...
```
