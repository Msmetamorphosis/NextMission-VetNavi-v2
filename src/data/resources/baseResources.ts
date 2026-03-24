export const baseResourceCategories = {
    career: {
      title: 'Career Transition',
      resources: [
        {
          name: 'VA Work-Study Program',
          description: 'Earn money while attending school and gain valuable work experience.',
          url: 'https://va.gov/education/about-gi-bill-benefits/how-to-use-benefits/work-study/',
          type: 'government',
          tags: ['career', 'income', 'education']
        },
        {
          name: 'Military Skills Translator',
          description: 'Translate your military experience into civilian job qualifications.',
          url: 'https://va.gov/careers-employment/',
          type: 'government',
          tags: ['career', 'transition']
        },
        {
          name: 'VET TEC Program',
          description: 'Full-time training in high-demand technology fields.',
          url: 'https://va.gov/education/about-gi-bill-benefits/how-to-use-benefits/vettec-high-tech-program/',
          type: 'government',
          tags: ['career', 'technology', 'training']
        },
        {
          name: 'Corporate Gray',
          description: 'Military-to-civilian career transition and job placement services.',
          url: 'https://corporategray.com/',
          type: 'partner',
          tags: ['career', 'jobs']
        }
      ]
    },
  
    education: {
      title: 'Education Benefits',
      resources: [
        {
          name: 'GI Bill Comparison Tool',
          description: 'Compare education benefits and find the right school for you.',
          url: 'https://va.gov/gi-bill-comparison-tool/',
          type: 'government',
          tags: ['education', 'gi bill']
        },
        {
          name: 'Yellow Ribbon Program',
          description: 'Additional funding for private school tuition and fees.',
          url: 'https://va.gov/education/about-gi-bill-benefits/post-9-11/yellow-ribbon-program/',
          type: 'government',
          tags: ['education', 'funding']
        },
        {
          name: 'Student Veterans of America',
          description: 'Support network and resources for student veterans.',
          url: 'https://studentveterans.org/',
          type: 'organization',
          tags: ['education', 'community']
        }
      ]
    },
  
    housing: {
      title: 'Housing Assistance',
      resources: [
        {
          name: 'VA Home Loans',
          description: 'Zero down payment home loans for eligible veterans.',
          url: 'https://va.gov/housing-assistance/home-loans/',
          type: 'government',
          tags: ['housing', 'loan']
        },
        {
          name: 'HUD-VASH Program',
          description: 'Housing vouchers and case management for homeless veterans.',
          url: 'https://va.gov/homeless/hud-vash.asp',
          type: 'government',
          tags: ['housing', 'support']
        }
      ]
    },
  
    healthcare: {
      title: 'Healthcare & Wellness',
      resources: [
        {
          name: 'VA Healthcare Enrollment',
          description: 'Apply for VA healthcare benefits and services.',
          url: 'https://va.gov/health-care/apply/application/',
          type: 'government',
          tags: ['healthcare']
        },
        {
          name: 'Veterans Crisis Line',
          description: '24/7 crisis support for veterans and their families.',
          url: 'https://veteranscrisisline.net/',
          type: 'government',
          tags: ['mental health', 'emergency']
        }
      ]
    },
  
    finance: {
      title: 'Financial Support',
      resources: [
        {
          name: 'VA Disability Compensation',
          description: 'Monthly payments for service-connected disabilities.',
          url: 'https://va.gov/disability/',
          type: 'government',
          tags: ['finance', 'benefits']
        },
        {
          name: 'VA Pension Benefits',
          description: 'Financial support for wartime veterans with limited income.',
          url: 'https://va.gov/pension/',
          type: 'government',
          tags: ['finance']
        }
      ]
    },
  
    community: {
      title: 'Community & Support',
      resources: [
        {
          name: 'American Legion',
          description: 'Veteran service organization providing support and advocacy.',
          url: 'https://legion.org/',
          type: 'organization',
          tags: ['community']
        },
        {
          name: 'VFW',
          description: 'Support for veterans who served in overseas conflicts.',
          url: 'https://vfw.org/',
          type: 'organization',
          tags: ['community']
        }
      ]
    }
  };