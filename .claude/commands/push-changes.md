Commit and push workspace changes to GitHub.

## Steps

### 1. Check status
- Run `git status` and `git diff --stat` to see all staged, unstaged, and untracked changes.
- If there are no changes, say so and stop.

### 2. Group changes into logical commits
Categorize every changed file into one of these groups:
- **Structural** — config files, instruction files, folder moves, templates, workflow rules. These are the "operating system" of the project.
- **Content by area** — group produced material by area (e.g., all component changes together, all copy/content changes together).
- **Mixed** — if a content change and a config/instruction file changed together, keep them in one commit.

### 3. Propose a commit plan
Show a numbered list of planned commits, each with:
- A draft commit message (1-2 sentences, explains what and why)
- The files included

Wait for approval, adjustment, or merging before proceeding.

### 4. Commit and push
- Stage and commit each group separately, in order: structural first, then content.
- Push to `origin/main` after all commits are created.
- Show a final summary: number of commits, files changed, and commit hashes.

## Rules
- Never force-push or rewrite history.
- Never commit files that look like secrets (`.env`, credentials, tokens).
- If a file looks like a draft or half-finished work, flag it and ask whether to include it.
- If there are merge conflicts, stop and explain — don't resolve automatically.
