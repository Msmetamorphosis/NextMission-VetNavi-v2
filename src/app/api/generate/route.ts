// src/app/api/action-plan/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ActionPlanSchema, ActionPlanInputSchema } from "@/core/schema/actionPlan.schema";
import { LocalActionPlanEngine } from "@/core/engine/localActionPlan.engine";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // Validate input body using Zod
    const input = ActionPlanInputSchema.parse(rawBody);

    const engine = new LocalActionPlanEngine();

    const plan = await engine.generate({
      userId: input.userId || "demo-user",
      goal: input.goal,
    });



    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request or generation failed" },
      { status: 400 }
    );
  }
}
