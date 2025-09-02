import {
  Bell,
  HelpCircle,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { PageType } from "../App";

interface TopNavigationProps {
  currentPage?: PageType;
  onNavigate?: (page: PageType) => void;
  onLogout?: () => void;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function TopNavigation({
  currentPage = "dashboard",
  onNavigate = () => {},
  onLogout = () => {},
  user = {
    name: "John Smith",
    email: "john@company.com",
    avatar: "JS",
  },
}: TopNavigationProps) {
  const navLinks = [
    {
      label: "Dashboard",
      page: "dashboard" as PageType,
      active: currentPage === "dashboard",
    },
    {
      label: "Data Upload",
      page: "data-upload" as PageType,
      active:
        currentPage === "data-upload" ||
        currentPage === "goal-selection" ||
        currentPage === "analysis-progress" ||
        currentPage === "action-results",
    },
    {
      label: "History",
      page: "history" as PageType,
      active:
        currentPage === "history" ||
        currentPage === "quarterly-review",
    },
    {
      label: "Reconciliation",
      page: "reconciliation-input" as PageType,
      active:
        currentPage === "reconciliation-input" ||
        currentPage === "reconciliation-report",
    },
    {
      label: "Team Settings",
      page: "team-settings" as PageType,
      active:
        currentPage === "team-settings" ||
        currentPage === "slack-config" ||
        currentPage === "jira-config" ||
        currentPage === "notion-config",
    },
  ];

  return (
    <nav className="w-full border-b border-border bg-background px-4 md:px-6 py-4">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-4 md:space-x-8 min-w-0 flex-1">
          {/* Logo */}
          <button
            onClick={() => {
              console.log("Navigating to dashboard via logo");
              onNavigate("dashboard");
            }}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1570566920413-fd6410fec24c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGxvZ28lMjBzeW1ib2x8ZW58MXx8fHwxNzU2Nzk5Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Strategy Insights Logo"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="font-medium text-foreground">
              Strategy Insights
            </span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 md:space-x-6 overflow-x-auto">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  console.log(`Navigating to: ${link.page}`);
                  onNavigate(link.page);
                }}
                className={`whitespace-nowrap text-sm md:text-base transition-colors hover:text-foreground ${
                  link.active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Help and User Profile */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          {/* Help Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Help</span>
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-accent"
              >
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <span className="text-xs">{user.avatar}</span>
                </div>
                <span className="hidden sm:inline text-foreground">
                  {user.name}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={onLogout}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}