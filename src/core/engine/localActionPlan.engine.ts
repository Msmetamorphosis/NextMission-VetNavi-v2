import OpenAI from "openai";
import { ActionPlan, ActionPlanSchema } from "../schema/actionPlan.schema";
import { ActionPlanEngine, ActionPlanInput } from "./actionPlan.engine";
import { baseResourceCategories } from "@/data/resources/baseResources";

function findRelevantResources(goal: string) {
  const words = goal.toLowerCase().split(/\s+/);

  const scored: any[] = [];

  Object.values(baseResourceCategories).forEach((category: any) => {
    category.resources.forEach((resource: any) => {
      let score = 0;

      resource.tags.forEach((tag: string) => {
        if (words.includes(tag)) score += 2;
        if (goal.toLowerCase().includes(tag)) score += 1;
      });

      if (score > 0) {
        scored.push({ ...resource, score });
      }
    });
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export class LocalActionPlanEngine implements ActionPlanEngine {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generate(input: ActionPlanInput): Promise<ActionPlan> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            "You are a veteran transition advisor. Generate a structured action plan as JSON.",
            "Include steps with title, description, priority, and category.",
            "Return ONLY JSON."
          ].join("\n"),
        },
        {
          role: "user",
          content: `Create an action plan for: ${input.goal}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const raw = JSON.parse(content);

// 🧠 Normalize LLM output into my schema
const normalized = {
  goal: input.goal,
  createdAt: new Date().toISOString(),
  status: "draft",
  steps: (raw.actionPlan || []).map((item: any, index: number) => ({
    id: String(index + 1),
    title: item.title,
    description: item.description,
    priority:
      item.priority === "High"
        ? 1
        : item.priority === "Medium"
        ? 2
        : 3,
    category: "planning", // temp default
  })),
};

  const validation = ActionPlanSchema.safeParse(normalized);

    if (!validation.success) {
      console.log("❌ VALIDATION ERROR:", validation.error.format());
      console.log("❌ RAW LLM OUTPUT:", parsed);
      throw new Error("LLM output did not match ActionPlan schema");
    }

    if (!validation.success) {
      throw new Error("Invalid schema from LLM");
    }

    // 🔥 Inject resources here
    const enriched = {
      ...validation.data,
      steps: validation.data.steps.map((step, index) => ({
        ...step,
        resources: index === 0 ? findRelevantResources(input.goal) : []
      }))
    };

    return enriched;
  }
}