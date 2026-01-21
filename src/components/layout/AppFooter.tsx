import React from 'react';
import { Heart, Github, Twitter, Mail, Shield, Lock } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const AppFooter: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`border-t ${
      theme === 'dark' 
        ? 'border-zinc-800 bg-zinc-900/50' 
        : 'border-gray-200 bg-gray-50'
    } backdrop-blur-sm transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600' 
                  : 'bg-gradient-to-br from-indigo-500 to-purple-500'
              }`}>
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BudgetTrack Pro
              </h3>
            </div>
            <p className={`text-sm max-w-md ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            } mb-4`}>
              Advanced financial management made simple. Track your spending, 
              plan your budget, and achieve your financial goals with our 
              intelligent budget tracking platform.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className={`w-4 h-4 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                Bank-level security
              </span>
              <Lock className={`w-4 h-4 ml-3 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                End-to-end encryption
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Dashboard', href: '/' },
                { label: 'Budgets', href: '/budgets' },
                { label: 'Reports', href: '/reports' },
                { label: 'Advanced Analytics', href: '/advanced-dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className={`text-sm hover:text-indigo-500 transition-colors ${
                      theme === 'dark' ? 'text-zinc-400 hover:text-indigo-400' : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@budgettrackpro.com"
                  className={`flex items-center gap-2 text-sm hover:text-indigo-500 transition-colors ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-indigo-400' : 'text-gray-600'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm hover:text-indigo-500 transition-colors ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-indigo-400' : 'text-gray-600'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm hover:text-indigo-500 transition-colors ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-indigo-400' : 'text-gray-600'
                  }`}
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={`my-8 border-t ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`} />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
              Made with
            </span>
            <Heart className={`w-4 h-4 ${
              theme === 'dark' ? 'text-red-400' : 'text-red-500'
            }`} fill="currentColor" />
            <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
              for financial freedom
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
              © 2024 BudgetTrack Pro
            </span>
            <a 
              href="#" 
              className={`hover:text-indigo-500 transition-colors ${
                theme === 'dark' ? 'text-zinc-500 hover:text-indigo-400' : 'text-gray-500'
              }`}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className={`hover:text-indigo-500 transition-colors ${
                theme === 'dark' ? 'text-zinc-500 hover:text-indigo-400' : 'text-gray-500'
              }`}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;