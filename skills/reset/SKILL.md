---
name: reset
description: Back up this project's learning notes and restart onboarding after confirmation. Does not reset application code.
---

# Reset VibeWise learning

Run this in the main conversation, only when explicitly invoked. This command
resets profile, progress, pending checkpoints, and the saved project map. Source
code, dependencies, Git history, other projects, and other skills stay intact.

## Workflow

1. Find the state directory by searching upward from the current directory for
   `.vibe-wise/` or legacy `.sensible-vibes/`, stopping at `.git`. Prefer
   `.vibe-wise/` when both exist at the same level.

2. If no state directory exists, explain there's nothing to reset and suggest
   using `@learn` to start learning mode.

3. Show the user:
   - The absolute project path
   - The state directory path
   - Which files will be reset (profile.md, progress.md, project-map.md)
   - That originals will be saved in a `backups/` subdirectory

4. Use the Question tool to ask: "Reset learning for [project name]?"
   - Options: **Cancel** (keep learning notes) / **Reset learning** (back up and restart)
   - Wait for explicit confirmation. Invocation alone is not confirmation.

5. Only after **Reset learning** is selected:
   - Create `backups/` directory if needed
   - Create a timestamped backup folder (e.g., `backups/reset-20261006T143022Z/`)
   - Copy existing profile.md, progress.md, project-map.md to the backup
   - Replace with fresh templates:

   **profile.md:**
   ```markdown
   # Learner Profile

   Learning mode: active
   Onboarding: incomplete
   Onboarding reset: pending

   Remaining onboarding: Project situation, experience, stack familiarity, goals, and preferences.
   ```

   **progress.md:**
   ```markdown
   # Learning Progress

   No learning events recorded yet.
   ```

   **project-map.md:**
   ```markdown
   # Project Map

   Not mapped yet. Inspect the current project.
   ```

6. On success, show the backup path and invoke the learn skill to begin fresh
   onboarding. Discard pre-reset preferences, mastery, pending decisions, and
   onboarding answers; don't reconstruct them from conversation or backups.

7. If any step fails, report honestly and show the backup path if one was created.
   Don't claim success or start onboarding on failure.
