'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, MapPin, Clock, User, MessageCircle, ExternalLink } from 'lucide-react';
import { generateActionPlan } from '@/lib/api-client';

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

  // Function to parse markdown links and convert them to clickable links
  const parseMarkdownLink = (text) => {
    if (!text) return null;
    
    // Match markdown link format [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const match = linkRegex.exec(text);
    
    if (match) {
      const [fullMatch, linkText, url] = match;
      return {
        text: linkText,
        url: url,
        fullMatch: fullMatch
      };
    }
    
    // If no markdown link found, check for plain URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urlMatch = urlRegex.exec(text);
    
    if (urlMatch) {
      return {
        text: 'Visit Resource',
        url: urlMatch[1],
        fullMatch: urlMatch[1]
      };
    }
    
    return null;
  };

  const handleGenerateActionPlan = async () => {
    if (!goal.trim()) return;

    setIsGenerating(true);
    
    try {
      const plan = await generateActionPlan(goal, userContext);
      setActionPlan(plan);
    } catch (error) {
      console.error('Error generating action plan:', error);
      // Show error message to user
      setActionPlan({
        categories: [
          {
            name: 'Service Temporarily Unavailable',
            steps: [
              {
                title: 'Technical Difficulties',
                description: 'We\'re experiencing technical difficulties with our AI service. Please try again in a few moments, or contact our support team for immediate assistance.',
                link: '[Contact Support](/contact)',
                timeframe: 'Immediate',
                priority: 'high'
              },
              {
                title: 'Alternative Resources',
                description: 'While our AI is offline, you can browse our comprehensive resources directory for immediate help.',
                link: '[Browse Resources](/resources)',
                timeframe: 'Immediate',
                priority: 'medium'
              }
            ]
          }
        ],
        follow_up: 'Please try submitting your goal again, or contact our support team if the issue persists.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFollowUp = async () => {
    if (!followUp.trim()) return;
    
    // Refine the action plan based on follow-up
    setIsGenerating(true);
    try {
      const refinedPlan = await generateActionPlan(
        `${goal} - Additional context: ${followUp}`,
        userContext
      );
      setActionPlan(refinedPlan);
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

  const handleExampleClick = (example) => {
    setGoal(example);
  };

  return (
    <section id="action-plan-section" className="py-20 gradient-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            AI Action Plan Generator
          </h2>
          <p className="text-xl text-white/90 mb-6">
            Tell us your specific goal, and our AI will create a personalized, step-by-step action plan just for you.
          </p>
          <p className="text-lg text-white/80">
            Our AI analyzes your goal and provides only relevant resources - no generic advice.
          </p>
        </div>

        <div className="gradient-olive rounded-xl shadow-lg p-8">
          {/* Goal Examples */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-white">
              Example Goals (Click to Use):
            </h3>
            <div className="flex flex-wrap gap-2">
              {goalExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* User Context Form */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white flex items-center">
                <User className="h-4 w-4 mr-1" />
                Military Branch
              </label>
              <select
                value={userContext.militaryBranch}
                onChange={(e) => setUserContext(prev => ({ ...prev, militaryBranch: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-sm"
              >
                <option value="">Select branch</option>
                <option value="army">Army</option>
                <option value="navy">Navy</option>
                <option value="air-force">Air Force</option>
                <option value="marines">Marines</option>
                <option value="coast-guard">Coast Guard</option>
                <option value="space-force">Space Force</option>
                <option value="national-guard">National Guard</option>
                <option value="reserves">Reserves</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Years of Service
              </label>
              <input
                type="text"
                value={userContext.yearsOfService}
                onChange={(e) => setUserContext(prev => ({ ...prev, yearsOfService: e.target.value }))}
                placeholder="e.g., 8 years"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Location
              </label>
              <input
                type="text"
                value={userContext.currentLocation}
                onChange={(e) => setUserContext(prev => ({ ...prev, currentLocation: e.target.value }))}
                placeholder="City, State"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">
                Target Industry
              </label>
              <input
                type="text"
                value={userContext.targetIndustry}
                onChange={(e) => setUserContext(prev => ({ ...prev, targetIndustry: e.target.value }))}
                placeholder="e.g., Technology"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="goal" className="block text-lg font-semibold mb-3 text-white">
              What's Your Specific Goal?
            </label>
            <textarea
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Be specific about what you want to achieve. Examples:
• I want to buy a house with a VA loan in Texas
• I need help filing for PTSD disability compensation
• I want to transition from military IT to civilian cybersecurity
• I need to access VA mental health services for anxiety"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent resize-none"
            />
            <p className="text-sm text-white/80 mt-2">
              💡 Tip: The more specific you are, the better your personalized action plan will be.
            </p>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleGenerateActionPlan}
              disabled={!goal.trim() || isGenerating}
              className="bg-[var(--navy)] hover:bg-[var(--charcoal)] text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Your Goal...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Generate My Action Plan
                </>
              )}
            </button>
          </div>

          {actionPlan && (
            <div className="border-t border-white/20 pt-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">
                  Your Personalized Action Plan
                </h3>
              </div>

              {actionPlan.categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h4 className="text-xl font-bold mb-4 text-white flex items-center">
                    <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                      {categoryIndex + 1}
                    </span>
                    {category.name}
                  </h4>
                  
                  <div className="space-y-4">
                    {category.steps.map((step, stepIndex) => {
                      const linkInfo = parseMarkdownLink(step.link);
                      
                      return (
                        <div key={stepIndex} className="flex gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--olive-green)] font-bold text-sm bg-white">
                              {stepIndex + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <h5 className="font-bold text-white text-lg">
                                {step.title}
                              </h5>
                              {step.priority && (
                                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                  step.priority === 'high' ? 'bg-red-500 text-white' :
                                  step.priority === 'medium' ? 'bg-yellow-500 text-black' :
                                  'bg-green-500 text-white'
                                }`}>
                                  {step.priority.toUpperCase()}
                                </span>
                              )}
                            </div>
                            
                            <p className="text-white/90 mb-4 leading-relaxed text-base">
                              {step.description}
                            </p>
                            
                            {step.timeframe && (
                              <div className="flex items-center mb-3 text-white/80">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="font-semibold">Timeframe:</span>
                                <span className="ml-2">{step.timeframe}</span>
                              </div>
                            )}
                            
                            {linkInfo && (
                              <div className="mt-4">
                                <a
                                  href={linkInfo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 border border-white/30"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  {linkInfo.text}
                                </a>
                              </div>
                            )}
                            
                            {step.additionalInfo && (
                              <div className="mt-3 p-3 bg-white/5 rounded-lg border-l-4 border-white/30">
                                <p className="text-white/80 text-sm">
                                  <strong>Additional Info:</strong> {step.additionalInfo}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {actionPlan.follow_up && (
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                  <h4 className="font-bold mb-3 text-white flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Let's Get More Specific
                  </h4>
                  <p className="text-white/90 mb-4">{actionPlan.follow_up}</p>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={followUp}
                      onChange={(e) => setFollowUp(e.target.value)}
                      placeholder="Type your answer here..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                    />
                    <button
                      onClick={handleFollowUp}
                      disabled={isGenerating || !followUp.trim()}
                      className="bg-[var(--navy)] hover:bg-[var(--charcoal)] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}