
import OpenAI from "openai";
import { ActionPlan, ActionPlanSchema } from "../schema/actionPlan.schema";
import { ActionPlanEngine, ActionPlanInput } from "./actionPlan.engine";

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
            "You are a veteran transition advisor. Generate a structured action plan as JSON for a veteran based on their goal.",
            "The JSON must have exactly these fields:",
            '- "goal": string (echo back the user\'s goal)',
            '- "createdAt": string (current ISO 8601 timestamp)',
            '- "steps": array of objects, each with:',
            '    - "id": string (unique UUID)',
            '    - "title": string (concise step title)',
            '    - "description": string (actionable description)',
            '    - "priority": number (1 = highest)',
            '    - "category": one of "planning", "resources", or "execution"',
            '- "status": "draft"',
            "Return ONLY valid JSON. No markdown, no commentary.",
          ].join("\n"),
        },
        {
          role: "user",
          content: `Create an action plan for the following goal: ${input.goal}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("OpenAI returned an empty response");
    }

    const parsed = JSON.parse(content);

    const validation = ActionPlanSchema.safeParse(parsed);
    
    if (!validation.success) {
      throw new Error("LLM output did not match ActionPlan schema");
    }
    
    return validation.data;
      }
}
