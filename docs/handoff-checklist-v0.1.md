# Handoff Checklist v0.1

Use this checklist when pausing or resuming NEXUS-X ARIA work.

## Before Pause

```text
[ ] latest commit pushed
[ ] repo clean
[ ] latest PROJECT_MEMORY_DATABASE.txt generated
[ ] user uploaded PROJECT_MEMORY_DATABASE.txt to Project Source
[ ] no runtime work is pending
[ ] no Cloudflare deploy is pending
[ ] no release is pending
```

## Before Resume

```text
[ ] read latest PROJECT_MEMORY_DATABASE.txt
[ ] confirm latest LOG ID
[ ] confirm canonical file is PROJECT_MEMORY_DATABASE.txt
[ ] confirm no PROJECT_MEMORY_DATABASE_CURRENT.txt is canonical
[ ] identify next phase from database
[ ] define target phase
[ ] define 100% success criteria
[ ] continue automatic cycle
```

## If There Is a Conflict

```text
[ ] do not guess
[ ] mark conflict as KONFLIK
[ ] use latest append-only LOG as most recent status
[ ] ask only if conflict blocks work
```

## If There Are Multiple Database Files

```text
canonical = PROJECT_MEMORY_DATABASE.txt
ignore alternative names unless user explicitly says otherwise
explain which file is canonical
do not create a new memory database from zero
```

## If Runtime Work Is Requested

```text
[ ] require clear bug/evidence
[ ] require test case
[ ] require local validation
[ ] require Cloudflare deploy
[ ] require live validation
[ ] require release gate before GitHub release
```
