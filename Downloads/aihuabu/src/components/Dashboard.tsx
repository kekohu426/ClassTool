import { TopNavigation } from "./TopNavigation";
import { RecentTasks } from "./RecentTasks";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { AlertTriangle, ArrowRight, Target } from "lucide-react";

interface DashboardProps {
  appContext: any;
}

export function Dashboard({ appContext }: DashboardProps) {
  const { navigateTo, user } = appContext;
  
  const handleStartAnalysis = () => {
    navigateTo("data-upload");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavigation 
        currentPage="dashboard"
        onNavigate={navigateTo}
        onLogout={appContext.handleLogout}
        user={user}
      />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-2xl font-medium text-foreground mb-2">
                  Welcome back, {user.name.split(' ')[0]}
                </h1>
                <p className="text-muted-foreground">
                  Ready to turn feedback into actionable business insights?
                </p>
              </div>

              {/* Large Orange Analysis Card */}
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white mb-8">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <Target className="h-8 w-8 mr-3" />
                        <h2 className="text-2xl font-medium">
                          Product Iteration Priority Analysis
                        </h2>
                      </div>
                      
                      <p className="text-orange-100 mb-6 text-lg leading-relaxed max-w-2xl">
                        Analyze customer feedback, market data, and performance metrics to identify 
                        the highest-impact product iterations for your next development cycle.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={handleStartAnalysis}
                          size="lg"
                          className="bg-white text-orange-600 hover:bg-orange-50 font-medium px-8"
                        >
                          Start Analysis
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => navigateTo("action-results")}
                          className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                        >
                          View Sample Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo("data-upload")}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-foreground mb-2">Upload New Data</h3>
                    <p className="text-muted-foreground text-sm">Add customer feedback or market research</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo("history")}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-foreground mb-2">View Analytics</h3>
                    <p className="text-muted-foreground text-sm">Explore your existing insights dashboard</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo("team-settings")}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-foreground mb-2">Configure Settings</h3>
                    <p className="text-muted-foreground text-sm">Customize analysis parameters</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <RecentTasks onNavigate={navigateTo} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Reminder */}
      <div className="border-t border-border bg-muted/30 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Reminder:</strong> Complete reconciliation within 14 days for accurate insights.
              <button 
                onClick={() => navigateTo("reconciliation-input")}
                className="ml-2 text-orange-600 hover:text-orange-700 underline"
              >
                Start Reconciliation
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}