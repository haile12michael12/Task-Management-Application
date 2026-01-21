import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
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

const AdvancedNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Dashboard', to: '/dashboard', icon: PieChart },
    { name: 'Budgets', to: '/budgets', icon: Wallet },
    { name: 'Transactions', to: '/transactions', icon: CreditCard },
    { name: 'Goals', to: '/goals', icon: Target },
    { name: 'Reports', to: '/reports', icon: BarChart3 },
    { name: 'Advanced', to: '/advanced-dashboard', icon: Sparkles },
  ];

  const productItems = [
    { name: 'Budget Tracker', to: '/', description: 'Track your expenses' },
    { name: 'Investment Analyzer', to: '/investments', description: 'Analyze your investments' },
    { name: 'Tax Calculator', to: '/tax', description: 'Calculate taxes efficiently' },
    { name: 'Financial Reports', to: '/reports', description: 'Generate financial reports' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-background/80 backdrop-blur-md border-b border-border/50',
        isScrolled ? 'py-2 shadow-sm' : 'py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BudgetTrack
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'hover:bg-accent/50 hover:text-accent-foreground',
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-foreground/80'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsMenuOpen(true)}
              onMouseLeave={() => setIsProductsMenuOpen(false)}
            >
              <button
                className={cn(
                  'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'hover:bg-accent/50 hover:text-accent-foreground text-foreground/80'
                )}
              >
                Products <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {isProductsMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                  {productItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-foreground/60">{item.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex relative"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
              {isSearchOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-lg p-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 bg-accent rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
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
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Sign Out
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
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-lg text-sm font-medium',
                      'hover:bg-accent/50 hover:text-accent-foreground',
                      isActive 
                        ? 'bg-accent text-accent-foreground' 
                        : 'text-foreground/80'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdvancedNavbar;