// src/core/schema/actionPlan.schema.ts

export type ActionStatus =
  | "pending"
  | "in_progress"
  | "blocked"
  | "completed";

export interface ActionStep {
  id: string;
  title: string;
  description: string;
  category: "career" | "education" | "health" | "benefits" | "personal";
  priority: 1 | 2 | 3; // 1 = High, 2 = Medium, 3 = Low
  status: ActionStatus;
  estimatedHours?: number;
  dependencies?: string[]; // ids of other steps
}

export interface ActionPlanMetadata {
  createdAt: string;
  version: string;
  generatedBy: "engine_v2";
}

export interface ActionPlan {
  userId: string;
  goal: string;
  summary: string;
  steps: ActionStep[];
  metadata: ActionPlanMetadata;
}
