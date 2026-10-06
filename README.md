# VibeWise for OpenCode

OpenCode port of [vibe-wise](https://github.com/nykooi1/vibe-wise) — a learning-first development workflow.

**You build. AI writes.**

You lead the design; Claude gives feedback, explains concepts, asks follow-ups, and writes the agreed code. Learning comes first.

## Install

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

## Differences from Claude Code version

- No hooks (OpenCode doesn't support session hooks yet)
- Manual context restore: run `@learn` at session start to reload state
- State stored in `.vibe-wise/` in your project

## License

MIT — same as original vibe-wise.
