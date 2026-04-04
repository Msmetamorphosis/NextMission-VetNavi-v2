import OpenAI from "openai";
import { ActionPlan, ActionPlanSchema } from "../schema/actionPlan.schema";
import { ActionPlanEngine, ActionPlanInput } from "./actionPlan.engine";
import {
  baseResourceCategories,
  type BaseResource,
  type ResourceCategory,
} from "@/data/resources/baseResources";

type ScoredResource = BaseResource & { score: number };

function findRelevantResources(goal: string) {
  const words = goal.toLowerCase().split(/\s+/);

  const scored: ScoredResource[] = [];

  Object.values(baseResourceCategories).forEach((category: ResourceCategory) => {
    category.resources.forEach((resource: BaseResource) => {
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

    const raw = JSON.parse(content) as unknown;

    type LlmStep = {
      title?: string;
      description?: string;
      priority?: string;
    };

    const llmPayload = raw as { actionPlan?: LlmStep[] };
    const llmSteps = Array.isArray(llmPayload.actionPlan)
      ? llmPayload.actionPlan
      : [];

    const normalized = {
      goal: input.goal,
      createdAt: new Date().toISOString(),
      status: "draft" as const,
      steps: llmSteps.map((item, index) => ({
        id: String(index + 1),
        title: item.title ?? "",
        description: item.description ?? "",
        priority:
          item.priority === "High" ? 1 : item.priority === "Medium" ? 2 : 3,
        category: "planning" as const,
      })),
    };

    const validation = ActionPlanSchema.safeParse(normalized);

    if (!validation.success) {
      console.log("❌ VALIDATION ERROR:", validation.error.format());
      console.log("❌ RAW LLM OUTPUT:", raw);
      throw new Error("LLM output did not match ActionPlan schema");
    }

    const enriched = {
      ...validation.data,
      steps: validation.data.steps.map((step, index) => ({
        ...step,
        resources:
          index === 0
            ? findRelevantResources(input.goal).map(({ name, url }) => ({
                name,
                url,
              }))
            : [],
      })),
    };

    return enriched;
  }
}