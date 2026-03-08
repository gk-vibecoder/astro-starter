Review uncommitted workspace changes and advise whether to push.

## Steps

### 1. Check status
- Run `git status` and `git diff --stat` to see all changes since the last commit.
- If there are no changes, say so and stop.

### 2. Categorize changes
Sort every changed file into:
- **Structural** — config files, instruction files, folder moves, templates, workflow rules
- **Content** — pages, components, copy, and other produced material
- **Drafts/WIP** — anything that looks half-finished or in progress

### 3. Assess risk
Consider:
- Are there structural changes that would affect how the project works? (higher urgency)
- How many files have changed since the last push?
- Is any content at risk of being lost if something goes wrong locally?
- Are there any files that shouldn't be committed (secrets, temp files, swap files)?

### 4. Give a recommendation
Respond with one of:
- **Push now** — structural changes are pending, or there's a large batch of work that should be backed up. Suggest running `/push-changes`.
- **Keep going** — changes are minor or in-progress, no urgency to push yet.
- **Flag** — something looks off. Explain what and ask.

Keep the response short: a few sentences max, plus the file summary.
