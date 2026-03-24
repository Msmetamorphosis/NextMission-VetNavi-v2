import { z } from "zod";

export const ActionPlanStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.number(),
  category: z.enum(["planning", "resources", "execution"]),
});

export const ActionPlanSchema = z.object({
  goal: z.string(),
  createdAt: z.string(),
  steps: z.array(ActionPlanStepSchema),
  status: z.enum(["draft", "final"]),
});

export type ActionPlan = z.infer<typeof ActionPlanSchema>;
export const ActionPlanInputSchema = z.object({
    userId: z.string().optional(),
    goal: z.string().min(5, "Goal must be at least 5 characters long"),
  });
  
  export type ActionPlanInput = z.infer<typeof ActionPlanInputSchema>;
  