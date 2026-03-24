'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, MapPin, Clock, User, MessageCircle, ExternalLink } from 'lucide-react';

export default function ActionPlanGenerator() {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [actionPlan, setActionPlan] = useState(null);
  const [followUp, setFollowUp] = useState('');
  const [userContext, setUserContext] = useState({
    militaryBranch: '',
    yearsOfService: '',
    currentLocation: '',
    targetIndustry: ''
  });

  const parseMarkdownLink = (text) => {
    if (!text) return null;

    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(text);

    if (match) {
      const [, linkText, url] = match;
      return { text: linkText, url };
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urlMatch = urlRegex.exec(text);

    if (urlMatch) {
      return { text: 'Visit Resource', url: urlMatch[1] };
    }

    return null;
  };

  const handleGenerateActionPlan = async () => {
    if (!goal.trim()) return;

    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          goal,
          context: {
            careerStage: userContext.yearsOfService || 'unknown',
            healthStatus: 'unknown',
            benefitsStatus: '',
            educationLevel: ''
          }
        })
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      setActionPlan({
        categories: [
          {
            name: 'Your Action Plan',
            steps: data.steps || []
          }
        ],
        follow_up: 'Want to refine this further?'
      });

    } catch (error) {
      console.error('Error generating action plan:', error);

      setActionPlan({
        categories: [
          {
            name: 'Service Temporarily Unavailable',
            steps: [
              {
                title: 'Technical Difficulties',
                description: 'We are experiencing issues. Please try again shortly.',
                timeframe: 'Immediate',
                priority: 'high'
              }
            ]
          }
        ],
        follow_up: 'Try again or refine your goal.'
      });

    } finally {
      setIsGenerating(false);
    }
  };

  const handleFollowUp = async () => {
    if (!followUp.trim()) return;

    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          goal: `${goal} - Additional context: ${followUp}`,
          context: {
            careerStage: userContext.yearsOfService || 'unknown',
            healthStatus: 'unknown',
            benefitsStatus: '',
            educationLevel: ''
          }
        })
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      setActionPlan({
        categories: [
          {
            name: 'Refined Action Plan',
            steps: data.steps || []
          }
        ],
        follow_up: 'Need more refinement?'
      });

      setFollowUp('');

    } catch (error) {
      console.error('Error refining action plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const goalExamples = [
    "I want to buy a house using my VA loan benefits in Texas",
    "Help me file for PTSD disability compensation",
    "I need to transition from military IT to civilian cybersecurity",
    "I want to use my GI Bill for a computer science degree",
    "I need help accessing VA mental health services for anxiety"
  ];

  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4">

        <h2 className="text-4xl font-bold mb-6 text-center">
          AI Action Plan Generator
        </h2>

        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Describe your goal..."
          className="w-full h-32 p-4 rounded-lg bg-slate-900 border border-white/20"
        />

        <div className="text-center mt-6">
          <button
            onClick={handleGenerateActionPlan}
            disabled={isGenerating}
            className="bg-blue-600 px-6 py-3 rounded-lg flex items-center justify-center mx-auto"
          >
            {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" />}
            Generate
          </button>
        </div>

        {actionPlan && (
          <div className="mt-10">
            {actionPlan.categories.map((cat, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold mb-4">{cat.name}</h3>

                {cat.steps.map((step, j) => {
                  const link = parseMarkdownLink(step.link);

                  return (
                    <div key={j} className="mb-4 p-4 bg-white/10 rounded-lg">
                      <h4 className="font-bold">{step.title}</h4>
                      <p>{step.description}</p>

                      {link && (
                        <a href={link.url} target="_blank" className="text-blue-400">
                          {link.text}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="mt-6 flex gap-2">
              <input
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                className="flex-1 p-2 bg-slate-900 border border-white/20 rounded"
                placeholder="Refine..."
              />
              <button onClick={handleFollowUp} className="bg-blue-600 px-4 rounded">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}