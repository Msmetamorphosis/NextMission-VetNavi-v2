// src/core/engine/actionPlan.engine.ts

import { ActionPlan } from "../schema/actionPlan.schema";

export interface ActionPlanInput {
  userId: string;
  goal: string;
  context?: {
    careerStage?: string;
    healthStatus?: string;
    benefitsStatus?: string;
    educationLevel?: string;
  };
}

export interface ActionPlanEngine {
  generate(input: ActionPlanInput): Promise<ActionPlan>;
}
