// src/core/engine/localActionPlan.engine.ts

import { ActionPlan } from "../schema/actionPlan.schema";
import { ActionPlanEngine, ActionPlanInput } from "./actionPlan.engine";

export class LocalActionPlanEngine implements ActionPlanEngine {
  async generate(input: ActionPlanInput): Promise<ActionPlan> {
    return {
      id: crypto.randomUUID(),
      userId: input.userId,
      goal: input.goal,
      createdAt: new Date().toISOString(),
      steps: this.generateSteps(input),
      status: "draft"
    };
  }

  private generateSteps(input: ActionPlanInput) {
    const steps = [];

    steps.push({
      id: crypto.randomUUID(),
      title: "Clarify Objective",
      description: `Refine and validate goal: ${input.goal}`,
      priority: 1,
      category: "planning"
    });

    steps.push({
      id: crypto.randomUUID(),
      title: "Resource Mapping",
      description: "Identify benefits, education pathways, and support systems.",
      priority: 2,
      category: "resources"
    });

    steps.push({
      id: crypto.randomUUID(),
      title: "Execution Roadmap",
      description: "Break goal into measurable milestones.",
      priority: 3,
      category: "execution"
    });

    return steps;
  }
}
