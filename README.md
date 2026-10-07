# VibeWise for OpenCode

OpenCode port of [vibe-wise](https://github.com/nykooi1/vibe-wise) — a learning-first development workflow.

**You build. AI writes.**

You lead the design; Claude gives feedback, explains concepts, asks follow-ups, and writes the agreed code. Learning comes first.

## Install

### Option 1: Plugin (recommended — auto-restores context)

Add to your `opencode.jsonc`:

```jsonc
{
  "plugins": ["./path/to/vibe-wise-opencode/plugin"]
}
```

Or install globally in `~/.config/opencode/opencode.jsonc`.

### Option 2: Skills only (manual context restore)

Copy skills to your global OpenCode skills directory:

```bash
cp -r skills/* ~/.config/opencode/skills/
```

Or symlink for easy updates:

```bash
ln -s "$(pwd)/skills/learn" ~/.config/opencode/skills/learn
ln -s "$(pwd)/skills/reset" ~/.config/opencode/skills/reset
```

## Usage

In any OpenCode session:

```
@learn
```

Setup asks one question at a time. Then ask Claude to build something.

To reset learning for a project:

```
@reset
```

## How it works

| Checkpoint | What happens |
|------------|--------------|
| **Build** | You reason through how to approach the problem with Claude |
| **Design** | Review the design. **Confirm and continue** records it; no code yet |
| **Implementation** | Review code changes. **Implement this step** authorizes Claude to make them |

## Plugin vs Skills-only

| Feature | Plugin | Skills-only |
|---------|--------|-------------|
| Auto-restore context on session start | ✅ | ❌ (run `@learn` manually) |
| Learning workflow | ✅ | ✅ |
| State persistence | ✅ | ✅ |
| Works across projects | ✅ | ✅ |

## State

Learning notes live in `.vibe-wise/` in your project:
- `profile.md` — learner preferences and understanding
- `progress.md` — learning history and pending decisions
- `project-map.md` — system architecture notes

Add `.vibe-wise/` to `.gitignore` to keep notes out of version control.

## License

MIT — same as original vibe-wise.
