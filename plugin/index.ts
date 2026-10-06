import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "vibe-wise",
  
  async setup(ctx) {
    // Register skills via transform
    await ctx.skill.transform((editor) => {
      editor.add({
        id: "learn",
        name: "learn", 
        description: "Activate or resume learning-first development. You lead the design; Claude gives feedback, explains concepts, asks follow-ups, and writes the agreed code.",
        path: "",
        content: `# VibeWise Learn mode

Activate learning mode in the main conversation. Read behavior.md (in the same directory as this skill) and follow it throughout normal development, not just during this command.

The learner owns the design. Ask for their approach and wait. Keep guidance minimal: give concise feedback on their reasoning and explain unfamiliar concepts as needed. Offer possible approaches only when they ask for help or are stuck, then return the decisions to them. Learning and learner control take priority over build speed.

## Locate state

Starting at the current working directory, look upward for \`.vibe-wise/\` or legacy \`.sensible-vibes/\`, preferring \`.vibe-wise/\` when both exist at the same level, stopping at the nearest \`.git\` directory or file.

If \`profile.md\` exists, read it and \`project-map.md\`. Search the entire \`progress.md\` for pending decisions. Resume without repeating completed onboarding.

If no profile exists, run onboarding:
1. Ask "What are we doing?" — New project / Existing repo / Known project
2. Ask programming experience — Beginner / Intermediate / Advanced
3. Ask preferences — Use defaults / Customize

Create \`.vibe-wise/\` with profile.md, progress.md, project-map.md using these templates:

**profile.md:**
\`\`\`markdown
# Learner Profile

Learning mode: active
Onboarding: complete

## Project
Situation: [New / Existing / Known]
Building: [project purpose]

## Experience
Overall programming: [Beginner / Intermediate / Advanced]

## Preferences
Checkpoint frequency: Normal
Question style: Open-ended
Implementation style: AI writes code
\`\`\`

**progress.md:**
\`\`\`markdown
# Learning Progress

No learning events recorded yet.
\`\`\`

**project-map.md:**
\`\`\`markdown
# Project Map

## Purpose
[What this software does.]

## Components
[Components and responsibilities.]

## Unknowns
[Unresolved technical choices.]
\`\`\`

## Checkpoints

- **Build checkpoint:** Ask how the learner would approach the problem
- **Design checkpoint:** Summarize proposed design, offer Confirm and continue / Discuss
- **Implementation checkpoint:** Describe code changes, offer Implement this step / Discuss

After implementing, give a concise Implementation report.`,
      })

      editor.add({
        id: "reset",
        name: "reset",
        description: "Back up this project's learning notes and restart onboarding after confirmation. Does not reset application code.",
        path: "",
        content: `# Reset VibeWise learning

1. Find state directory (\`.vibe-wise/\` or \`.sensible-vibes/\`) searching upward from cwd, stopping at \`.git\`
2. If none exists, say there's nothing to reset and suggest @learn
3. Show the state directory path and ask for confirmation using the Question tool
4. Only after confirmation:
   - Create \`backups/\` subdirectory
   - Copy profile.md, progress.md, project-map.md to timestamped backup folder
   - Replace with fresh templates (Learning mode: active, Onboarding: incomplete)
5. Show backup path and invoke @learn for fresh onboarding`,
      })
    })

    // Hook into prompts to inject context when learning is active
    await ctx.session.hook("context", (event) => {
      // Add learning context to system prompt when .vibe-wise exists
      event.system.push({
        type: "text",
        text: `[VibeWise] If a .vibe-wise/ or .sensible-vibes/ directory exists in this project, check profile.md for "Learning mode: active". If active, follow the learn skill's behavior: ask for the learner's approach before offering solutions, use checkpoints, and preserve learner control over design decisions.`
      })
    })

    console.log("VibeWise plugin loaded")
  },
})
