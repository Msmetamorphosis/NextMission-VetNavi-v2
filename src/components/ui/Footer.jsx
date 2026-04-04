import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    'Resources': [
      { name: 'Education Benefits', href: '/resources' },
      { name: 'Career Services', href: '/resources' },
      { name: 'Housing Assistance', href: '/resources' },
      { name: 'Healthcare', href: '/resources' },
    ],
    'Community': [
      { name: 'Success Stories', href: '/veterans' },
      { name: 'Mentorship', href: '/veterans' },
      { name: 'Events', href: '/veterans' },
      { name: 'Support Groups', href: '/veterans' },
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Crisis Support', href: '/crisis' },
      { name: 'Contact Support', href: '/contact' },
      { name: 'System Status', href: '/status' },
    ]
  };

  return (
    <footer className="gradient-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/Screenshot%202025-05-05%20181332.png"
                alt="NextMission Navigator Logo"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering U.S. military veterans with AI-powered life planning, 
              trusted resources, and community support for successful civilian transitions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links - 2x2 grid on mobile, single row on desktop */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:col-span-4 lg:gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-bold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2025 NextMission Navigator. All rights reserved. 
            <span className="ml-2">Built with honor for those who served.</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}