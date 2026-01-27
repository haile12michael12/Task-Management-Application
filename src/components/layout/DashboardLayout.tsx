import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import AppFooter from "./AppFooter";
import TopNavbar from "../navbar/TopNavbar";
import LanguageSelector from "../navbar/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showTopNavbar?: boolean;
}

export function DashboardLayout({ children, title, subtitle, showTopNavbar = false }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        {/* Top Navbar - Optional */}
        {showTopNavbar && <TopNavbar />}
        
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col">
            {/* Header */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                {title && (
                  <div>
                    <h1 className="text-lg font-semibold">{title}</h1>
                    {subtitle && (
                      <p className="text-sm text-muted-foreground">{subtitle}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                    3
                  </span>
                </Button>
                <LanguageSelector />
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
          
          {/* Footer */}
          <AppFooter />
        </SidebarInset>
      </div>
    </div>
  </SidebarProvider>
  );
}
