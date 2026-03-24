'use client';

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

  const resourceCategories = {
    career: {
      icon: Briefcase,
      title: 'Career Transition',
      description: 'Job placement, resume building, and interview preparation',
      bgColor: 'bg-[var(--military-green)]',
      textColor: 'text-white',
      resources: [
        {
          name: 'VA Work-Study Program',
          description: 'Earn money while attending school and gain valuable work experience.',
          url: 'https://va.gov/education/about-gi-bill-benefits/how-to-use-benefits/work-study/',
          type: 'Government'
        },
        {
          name: 'Military Skills Translator',
          description: 'Translate your military experience into civilian job qualifications.',
          url: 'https://va.gov/careers-employment/',
          type: 'Government'
        },
        {
          name: 'VET TEC Program',
          description: 'Full-time training in high-demand technology fields.',
          url: 'https://va.gov/education/about-gi-bill-benefits/how-to-use-benefits/vettec-high-tech-program/',
          type: 'Government'
        },
        {
          name: 'Corporate Gray',
          description: 'Military-to-civilian career transition and job placement services.',
          url: 'https://corporategray.com/',
          type: 'Partner'
        }
      ]
    },
    education: {
      icon: GraduationCap,
      title: 'Education Benefits',
      description: 'GI Bill, scholarships, and certification programs',
      bgColor: 'bg-[var(--dark-brown)]',
      textColor: 'text-white',
      resources: [
        {
          name: 'GI Bill Comparison Tool',
          description: 'Compare education benefits and find the right school for you.',
          url: 'https://va.gov/gi-bill-comparison-tool/',
          type: 'Government'
        },
        {
          name: 'Yellow Ribbon Program',
          description: 'Additional funding for private school tuition and fees.',
          url: 'https://va.gov/education/about-gi-bill-benefits/post-9-11/yellow-ribbon-program/',
          type: 'Government'
        },
        {
          name: 'Student Veterans of America',
          description: 'Support network and resources for student veterans.',
          url: 'https://studentveterans.org/',
          type: 'Organization'
        },
        {
          name: 'Military Child Education Coalition',
          description: 'Educational resources for military families and children.',
          url: 'https://militarychild.org/',
          type: 'Organization'
        }
      ]
    },
    housing: {
      icon: Home,
      title: 'Housing Assistance',
      description: 'VA home loans, rental assistance, and transitional housing',
      bgColor: 'bg-[var(--coyote-tan)]',
      textColor: 'text-white',
      resources: [
        {
          name: 'VA Home Loans',
          description: 'Zero down payment home loans for eligible veterans.',
          url: 'https://va.gov/housing-assistance/home-loans/',
          type: 'Government'
        },
        {
          name: 'HUD-VASH Program',
          description: 'Housing vouchers and case management for homeless veterans.',
          url: 'https://va.gov/homeless/hud-vash.asp',
          type: 'Government'
        },
        {
          name: 'Veterans Community Living Centers',
          description: 'Long-term care and housing for veterans who need assistance.',
          url: 'https://va.gov/geriatrics/pages/Veterans_Community_Living_Centers.asp',
          type: 'Government'
        },
        {
          name: 'Operation Homefront',
          description: 'Emergency financial assistance and transitional housing.',
          url: 'https://operationhomefront.org/',
          type: 'Organization'
        }
      ]
    },
    healthcare: {
      icon: Heart,
      title: 'Healthcare & Wellness',
      description: 'VA healthcare, mental health support, and wellness programs',
      bgColor: 'bg-[var(--sage-green)]',
      textColor: 'text-white',
      resources: [
        {
          name: 'VA Healthcare Enrollment',
          description: 'Apply for VA healthcare benefits and services.',
          url: 'https://va.gov/health-care/apply/application/',
          type: 'Government'
        },
        {
          name: 'Veterans Crisis Line',
          description: '24/7 crisis support for veterans and their families.',
          url: 'https://veteranscrisisline.net/',
          type: 'Government'
        },
        {
          name: 'Vet Centers',
          description: 'Readjustment counseling and outreach services.',
          url: 'https://va.gov/find-locations/?facilityType=vet_center',
          type: 'Government'
        },
        {
          name: 'Team Red White & Blue',
          description: 'Physical and social activities to improve veteran wellness.',
          url: 'https://teamrwb.org/',
          type: 'Organization'
        }
      ]
    },
    finance: {
      icon: DollarSign,
      title: 'Financial Support',
      description: 'Disability compensation, financial counseling, and emergency assistance',
      bgColor: 'bg-[var(--olive-drab)]',
      textColor: 'text-white',
      resources: [
        {
          name: 'VA Disability Compensation',
          description: 'Monthly payments for service-connected disabilities.',
          url: 'https://va.gov/disability/',
          type: 'Government'
        },
        {
          name: 'VA Pension Benefits',
          description: 'Financial support for wartime veterans with limited income.',
          url: 'https://va.gov/pension/',
          type: 'Government'
        },
        {
          name: 'Military Saves',
          description: 'Financial education and savings programs for military families.',
          url: 'https://militarysaves.org/',
          type: 'Organization'
        },
        {
          name: 'Armed Forces Financial Network',
          description: 'Financial planning and investment guidance for military members.',
          url: 'https://armedforces.org/',
          type: 'Organization'
        }
      ]
    },
    community: {
      icon: Users,
      title: 'Community & Support',
      description: 'Veteran organizations, mentorship, and peer support networks',
      bgColor: 'bg-[var(--warm-brown)]',
      textColor: 'text-white',
      resources: [
        {
          name: 'American Legion',
          description: 'Veteran service organization providing support and advocacy.',
          url: 'https://legion.org/',
          type: 'Organization'
        },
        {
          name: 'Veterans of Foreign Wars (VFW)',
          description: 'Support for veterans who served in overseas conflicts.',
          url: 'https://vfw.org/',
          type: 'Organization'
        },
        {
          name: 'Iraq and Afghanistan Veterans of America',
          description: 'Advocacy and support for post-9/11 veterans.',
          url: 'https://iava.org/',
          type: 'Organization'
        },
        {
          name: 'Team Rubicon',
          description: 'Disaster relief volunteer opportunities for veterans.',
          url: 'https://teamrubiconusa.org/',
          type: 'Organization'
        }
      ]
    }
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