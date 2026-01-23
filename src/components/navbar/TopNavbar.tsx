import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  ChevronDown,
  Home, 
  PieChart, 
  CreditCard, 
  TrendingUp, 
  Settings,
  Moon,
  Sun,
  BarChart3,
  Sparkles,
  Wallet,
  Target
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

interface NavbarItem {
  name: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TopNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const location = useLocation();

  const navItems: NavbarItem[] = [
    { name: t('common.home'), to: '/', icon: Home },
    { name: t('common.dashboard'), to: '/dashboard', icon: PieChart },
    { name: t('common.budgets'), to: '/budgets', icon: Wallet },
    { name: t('common.transactions'), to: '/transactions', icon: CreditCard },
    { name: t('common.goals'), to: '/goals', icon: Target },
    { name: t('common.reports'), to: '/reports', icon: BarChart3 },
    { name: t('common.advanced'), to: '/advanced-dashboard', icon: Sparkles },
  ];

  return (
    <nav className="bg-background border-b border-border/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                <span className="text-white font-bold text-sm">$</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                BudgetTrack
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-foreground/80'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-xs text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className="h-4 w-4 hidden sm:block" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t('common.profile')}
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-2 border-border" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {t('common.signOut')}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border mt-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-md text-sm font-medium',
                      'hover:bg-accent hover:text-accent-foreground',
                      isActive 
                        ? 'bg-accent text-accent-foreground' 
                        : 'text-foreground/80'
                    )}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;