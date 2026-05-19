# Maintainer Checklist

Use this before any future ARIA update.

## Before Editing

- [ ] Define goal of the version.
- [ ] Confirm whether this is docs-only or runtime-changing.
- [ ] Avoid unnecessary runtime changes.
- [ ] Avoid monetization unless explicitly approved.
- [ ] Avoid external paid services.

## If Runtime Changes

- [ ] Update `const VERSION`.
- [ ] Update `/health`.
- [ ] Update `/docs`.
- [ ] Update `/openapi.json` `info.version`.
- [ ] Update landing page if endpoint changes.
- [ ] Update `/examples` if examples change.
- [ ] Update `/test-pack` only if scoring changes.
- [ ] Verify `/test-pack` locally or live.
- [ ] Copy `worker.js` to clipboard.
- [ ] Paste into Cloudflare dashboard.
- [ ] Deploy.
- [ ] Verify live endpoints.

## Required Live Verification

- [ ] `/health` returns expected version.
- [ ] `/test-pack` returns expected test count.
- [ ] `/test-pack` has `passed:false` count 0.
- [ ] `/openapi.json` returns OpenAPI 3.0.1.
- [ ] `/openapi.json` `info.version` matches runtime.
- [ ] New endpoint exists if any.
- [ ] `/try` still works if runtime changed.

## GitHub

- [ ] `git status` checked.
- [ ] Commit message clear.
- [ ] Push successful.
- [ ] GitHub release only after live validation passes.
- [ ] Repo clean after release.

## Memory Database

After every completed version:

- [ ] State final status.
- [ ] State validation result.
- [ ] State next recommended step.
- [ ] Create/update memory database.
- [ ] Provide downloadable ZIP memory database.

## Common Pitfalls

- Do not use `/tmp` in Termux. Use `.verify-cache`.
- Do not use Wrangler in Termux Android.
- Do not rely on Perl unless installed.
- Avoid long heredoc scripts.
- Use ZIP files for large patches.
- Do not release if OpenAPI version is wrong.
