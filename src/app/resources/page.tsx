'use client';

import { baseResourceCategories as resourceCategories } from '@/data/resources/baseResources';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';
import { GraduationCap, Briefcase, Home, Heart, DollarSign, Users, ChevronDown, ChevronRight, ExternalLink, Phone, AlertTriangle, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Resources() {
  const [openCategories, setOpenCategories] = useState({
    career: false,
    education: false,
    housing: false,
    healthcare: false,
    finance: false,
    community: false
  });

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--sandstone-beige)]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-[var(--sandstone-beige)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--dark-brown)' }}>
            Veteran Resources Directory
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: 'var(--deep-army-green)' }}>
            Comprehensive collection of trusted resources from government agencies, 
            veteran organizations, and military partners to support your transition and ongoing success.
          </p>
        </div>
      </section>

      {/* Emergency Resources Banner */}
      <section className="bg-red-600 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 mr-4 flex-shrink-0" />
            <div className="text-center">
              <h3 className="font-bold text-xl mb-3">Emergency & Crisis Resources Available 24/7</h3>
              <div className="flex flex-wrap justify-center items-center gap-8 text-base">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span><strong>Veterans Crisis Line:</strong> 1-800-273-8255</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span><strong>Text:</strong> 838255</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span><strong>Suicide Prevention:</strong> 988</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {Object.entries(resourceCategories).map(([key, category]) => (
              <div key={key} className="border-2 border-[var(--desert-khaki)] rounded-xl overflow-hidden shadow-lg">
                <button
                  onClick={() => toggleCategory(key)}
                  className={`w-full p-6 ${category.bgColor} hover:opacity-90 transition-all duration-200 flex items-center justify-between`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                      <category.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-2xl font-bold ${category.textColor}`}>
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-lg">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  {openCategories[key] ? (
                    <ChevronDown className={`h-6 w-6 ${category.textColor}`} />
                  ) : (
                    <ChevronRight className={`h-6 w-6 ${category.textColor}`} />
                  )}
                </button>

                {openCategories[key] && (
                  <div className="p-6 bg-white border-t-2 border-[var(--desert-khaki)]">
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.resources.map((resource, index) => (
                        <div key={index} className="border-2 border-[var(--pale-olive)] rounded-lg p-5 hover:shadow-md hover:border-[var(--coyote-tan)] transition-all duration-200 bg-[var(--pale-olive)]">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-bold text-lg" style={{ color: 'var(--dark-brown)' }}>
                              {resource.name}
                            </h4>
                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              resource.type === 'Government' 
                                ? 'bg-[var(--military-green)] text-white'
                                : resource.type === 'Organization'
                                ? 'bg-[var(--dark-brown)] text-white'
                                : 'bg-[var(--coyote-tan)] text-white'
                            }`}>
                              {resource.type}
                            </span>
                          </div>
                          <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--deep-army-green)' }}>
                            {resource.description}
                          </p>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center font-semibold hover:underline transition-colors duration-200"
                            style={{ color: 'var(--military-green)' }}
                          >
                            Visit Resource
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
      <ElevenLabsWidget />
    </div>
  );
}