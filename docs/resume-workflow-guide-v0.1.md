# Resume Workflow Guide v0.1

## Purpose

This guide explains how to resume the project after a pause.

## Resume Input

The user only needs to say:

```text
Database terbaru sudah saya upload ke Project Source.
```

AI must then:

```text
[ ] read PROJECT_MEMORY_DATABASE.txt
[ ] identify latest LOG
[ ] identify next phase
[ ] define target
[ ] define 100% success criteria
[ ] continue without asking user to name the phase
```

## Do Not Ask User To

```text
tell whether the phase succeeded
send a special prompt for the next phase
decide the next technical phase
decide whether database should be updated
```

## AI Must

```text
evaluate logs
decide if phase succeeded
continue same phase if not complete
generate PROJECT_MEMORY_DATABASE.txt if complete
append a new LOG
wait for user upload before next phase
```

## Allowed Pause Responses

If no work is needed:

```text
Project is safely paused.
Runtime remains v0.2.0.
Next action requires new bug evidence, docs review findings, or user direction.
```

## Safe Default After Pause

```text
Manual repo review actual execution using Phase 8.2 checklist
or
pause development
```
