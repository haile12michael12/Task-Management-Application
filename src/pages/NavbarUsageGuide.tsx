import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TopNavbar from '@/components/navbar/TopNavbar';
import AdvancedNavbar from '@/components/navbar/AdvancedNavbar';

const NavbarUsageGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Navbar Usage Guide</h1>
        
        {/* Simple Top Navbar Example */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Top Navbar</CardTitle>
            <CardDescription>
              A clean, minimal navbar perfect for dashboard layouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>To use the basic top navbar in your components:</p>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`import TopNavbar from '@/components/navbar/TopNavbar';

function MyPage() {
  return (
    <div>
      <TopNavbar />
      <main>Your content here</main>
    </div>
  );
}`}
              </pre>
              <p>Or integrate with DashboardLayout:</p>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`<DashboardLayout showTopNavbar={true}>
  <YourContent />
</DashboardLayout>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Navbar Example */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Navbar</CardTitle>
            <CardDescription>
              Feature-rich navbar with dropdowns, search, and enhanced functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>For standalone pages requiring full navigation:</p>
              <pre className="bg-muted p-4 rounded-lg text-sm">
{`import AdvancedNavbar from '@/components/navbar/AdvancedNavbar';

function StandalonePage() {
  return (
    <div className="min-h-screen bg-background">
      <AdvancedNavbar />
      <main className="pt-20">Your content here</main>
    </div>
  );
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Features Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Features Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Feature</th>
                    <th className="text-left py-2">TopNavbar</th>
                    <th className="text-left py-2">AdvancedNavbar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Responsive Design</td>
                    <td className="py-2">✅</td>
                    <td className="py-2">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Dropdown Menus</td>
                    <td className="py-2">❌</td>
                    <td className="py-2">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Search Functionality</td>
                    <td className="py-2">❌</td>
                    <td className="py-2">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Sticky Positioning</td>
                    <td className="py-2">✅</td>
                    <td className="py-2">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Theme Switching</td>
                    <td className="py-2">✅</td>
                    <td className="py-2">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">User Profile Menu</td>
                    <td className="py-2">✅</td>
                    <td className="py-2">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Notification Badges</td>
                    <td className="py-2">✅</td>
                    <td className="py-2">✅</td>
                  </tr>
                  <tr>
                    <td className="py-2">Products Dropdown</td>
                    <td className="py-2">❌</td>
                    <td className="py-2">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Integration Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. With Existing Layout</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Add top navbar to your existing DashboardLayout:
                </p>
                <pre className="bg-muted p-3 rounded text-xs">
{`// In your page component
<DashboardLayout 
  title="My Page" 
  showTopNavbar={true}
>
  <YourContent />
</DashboardLayout>`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Standalone Application</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Use AdvancedNavbar for full-page applications:
                </p>
                <pre className="bg-muted p-3 rounded text-xs">
{`// App.tsx or main layout
<div className="min-h-screen">
  <AdvancedNavbar />
  <main className="pt-20">
    <Outlet /> {/* or your main content */}
  </main>
</div>`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Conditional Rendering</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Show navbar based on route or user preference:
                </p>
                <pre className="bg-muted p-3 rounded text-xs">
{`const showNavbar = location.pathname !== '/fullscreen-view';

{showNavbar && <TopNavbar />}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-4">
          <p className="text-muted-foreground">
            Visit <a href="/navbar-demo" className="text-primary hover:underline">/navbar-demo</a> to see the navbar in action
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarUsageGuide;