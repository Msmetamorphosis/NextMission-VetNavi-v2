"use client";

import { useState } from "react";
import type { ActionPlan } from "@/core/schema/actionPlan.schema";

export default function Home() {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<ActionPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);

    const res = await fetch("/api/action-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal }),
    });

    const data = (await res.json()) as ActionPlan | { error?: string };
    setResult("steps" in data && Array.isArray(data.steps) ? data : null);
    setLoading(false);
  };

  return (
<main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-6">
  <div className="max-w-4xl mx-auto">

  <h1 className="text-4xl font-bold text-center mb-4">
  AI Action Plan Generator
</h1>

<p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
  Tell us your goal and our AI will generate a personalized,
  step by step action plan tailored specifically to you.
</p>


<div className="max-w-3xl mx-auto mb-12 space-y-4">
  <input
    type="text"
    value={goal}
    onChange={(e) => setGoal(e.target.value)}
    placeholder="Describe your goal in detail..."
    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <div className="text-center">
    <button
      onClick={generatePlan}
      className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
    >
      {loading ? "Generating..." : "Generate My Action Plan"}
    </button>
  </div>
</div>


      {result && (
  <div className="mt-10 space-y-6">
    <h2 className="text-xl font-semibold">
      Your Personalized Action Plan
    </h2>

    {result.steps?.map((step, index) => (
      <div
        key={step.id}
        className="border rounded-lg p-6 bg-white shadow-sm"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 font-bold">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold">
              {step.title}
            </h3>
          </div>

          <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-600">
            {step.category.toUpperCase()}
          </span>
        </div>

        <p className="text-gray-700 mb-2">
          {step.description}
        </p>

        <div className="text-sm text-gray-500">
          Priority: {step.priority}
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  </main>
  );
}
