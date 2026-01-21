import React from 'react';
import AdvancedNavbar from '@/components/navbar/AdvancedNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  BarChart3, 
  Users, 
  Settings,
  Bell,
  Calendar,
  DollarSign,
  Search
} from 'lucide-react';

const NavbarDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdvancedNavbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Advanced Navigation Demo
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-12">
            Experience our feature-rich navigation system with dropdown menus, 
            search functionality, and responsive design.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">View Documentation</Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Navigation Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Responsive Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Adapts seamlessly to all screen sizes with mobile-friendly hamburger menu
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-green-500" />
                  Dropdown Menus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interactive dropdown menus with hover effects and smooth animations
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-purple-500" />
                  Smart Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Contextual search functionality that appears on demand
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive user profile and settings integration
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-500" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real-time notification system with badge indicators
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  Theme Switching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Instant dark/light mode toggle with smooth transitions
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Try It Yourself</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Interactive Elements</h3>
              <p className="text-foreground/80 mb-6">
                Hover over the navigation items to see dropdown menus appear. 
                Click on the search icon to reveal the search bar. 
                Toggle between dark and light modes using the theme switcher.
              </p>
              <p className="text-foreground/80">
                On mobile devices, the hamburger menu transforms into a full-screen 
                navigation experience with all the same functionality.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Navigation Components</CardTitle>
                <CardDescription>Key features demonstrated above</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Gradient logo with brand identity</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Active state highlighting</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Smooth hover transitions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Notification badges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>User profile dropdown</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-foreground/60">
            Advanced Navbar Component • Built with React and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NavbarDemoPage;