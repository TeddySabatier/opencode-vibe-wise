import { Plugin } from "@opencode/plugin"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

export default Plugin.define({
  id: "vibe-wise",

  async setup(ctx) {
    const pluginRoot = dirname(fileURLToPath(import.meta.url))

    await ctx.skill.transform((editor) => {
      const learnSkillPath = resolve(pluginRoot, "../skills/learn/SKILL.md")
      const resetSkillPath = resolve(pluginRoot, "../skills/reset/SKILL.md")

      if (existsSync(learnSkillPath)) {
        const content = readFileSync(learnSkillPath, "utf-8")
        editor.add({
          id: "learn",
          name: "learn",
          description:
            "Activate or resume learning-first development. You lead the design; Claude gives feedback, explains concepts, asks follow-ups, and writes the agreed code.",
          path: learnSkillPath,
          content: content.replace(/^---[\s\S]*?---\n*/, ""),
        })
      }

      if (existsSync(resetSkillPath)) {
        const content = readFileSync(resetSkillPath, "utf-8")
        editor.add({
          id: "reset",
          name: "reset",
          description:
            "Back up this project's learning notes and restart onboarding after confirmation. Does not reset application code.",
          path: resetSkillPath,
          content: content.replace(/^---[\s\S]*?---\n*/, ""),
        })
      }
    })

    await ctx.session.hook("context", (event) => {
      event.system.push({
        type: "text",
        text: `[VibeWise] If a .vibe-wise/ or .sensible-vibes/ directory exists in this project, check profile.md for "Learning mode: active". If active, follow the learn skill's behavior: ask for the learner's approach before offering solutions, use checkpoints, and preserve learner control over design decisions.`,
      })
    })

    console.log("VibeWise plugin loaded")
  },
})
