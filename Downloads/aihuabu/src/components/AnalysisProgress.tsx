import { useState, useEffect } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Settings, GitBranch, TrendingUp, X } from "lucide-react";

interface ProgressStep {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
}

interface ProgressState {
  currentStep: number;
  stepProgress: number;
  totalProcessed: number;
  totalItems: number;
  statusText: string;
  isComplete: boolean;
}

interface AnalysisProgressProps {
  appContext: any;
}

export function AnalysisProgress({ appContext }: AnalysisProgressProps) {
  const [progressState, setProgressState] = useState<ProgressState>({
    currentStep: 0,
    stepProgress: 0,
    totalProcessed: 0,
    totalItems: 800,
    statusText: "Initializing analysis...",
    isComplete: false
  });

  const steps: ProgressStep[] = [
    {
      id: "cleaning",
      title: "Data Cleaning",
      icon: Settings,
      description: "Removing duplicates and standardizing format"
    },
    {
      id: "clustering",
      title: "Clustering",
      icon: GitBranch,
      description: "Grouping similar feedback patterns"
    },
    {
      id: "roi-prediction",
      title: "ROI Prediction",
      icon: TrendingUp,
      description: "Calculating impact and priority scores"
    }
  ];

  // Simulate progress updates
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgressState(prev => {
        if (prev.isComplete) return prev;

        let newState = { ...prev };
        
        // Update progress within current step
        if (newState.stepProgress < 100) {
          newState.stepProgress += Math.random() * 8;
          newState.totalProcessed = Math.min(
            newState.totalItems,
            Math.floor((newState.currentStep * newState.totalItems + 
                       (newState.stepProgress / 100) * newState.totalItems) / steps.length)
          );
        }

        // Move to next step when current step is complete
        if (newState.stepProgress >= 100 && newState.currentStep < steps.length - 1) {
          newState.currentStep += 1;
          newState.stepProgress = 0;
        }

        // Complete the analysis
        if (newState.currentStep === steps.length - 1 && newState.stepProgress >= 100) {
          newState.isComplete = true;
          newState.statusText = "Analysis complete! Generating action cards...";
          newState.totalProcessed = newState.totalItems;
          
          // Auto-navigate to results after a short delay
          setTimeout(() => {
            const mockResults = {
              analysisId: `analysis-${Date.now()}`,
              actionCards: [
                { id: 1, title: "Improve Mobile UX", roi: "15-25%", priority: "High" },
                { id: 2, title: "Add Integration Features", roi: "10-18%", priority: "Medium" },
                { id: 3, title: "Enhance Customer Support", roi: "8-12%", priority: "High" }
              ]
            };
            appContext.handleAnalysisComplete(mockResults, mockResults.analysisId);
          }, 2000);
        } else {
          // Update status text based on current step
          const currentStepData = steps[newState.currentStep];
          newState.statusText = `${currentStepData.description} - Processing ${newState.totalProcessed} of ${newState.totalItems} feedback entries`;
        }

        return newState;
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, [appContext]);

  const handleCancel = () => {
    console.log("Analysis cancelled");
    appContext.navigateTo("dashboard");
  };

  const overallProgress = progressState.isComplete 
    ? 100 
    : ((progressState.currentStep * 100 + progressState.stepProgress) / steps.length);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="analysis-progress"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-medium text-foreground mb-2">
              Analysis in Progress
            </h1>
            <p className="text-muted-foreground">
              Your feedback data is being processed to generate actionable insights
            </p>
          </div>

          {/* Progress Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              {/* Overall Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
                <Progress value={overallProgress} className="w-full h-2" />
              </div>

              {/* Step Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between relative">
                  {/* Progress Line */}
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted">
                    <div 
                      className="h-full bg-orange-500 transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, (progressState.currentStep / (steps.length - 1)) * 100)}%` 
                      }}
                    />
                  </div>

                  {/* Steps */}
                  {steps.map((step, index) => {
                    const isActive = index === progressState.currentStep;
                    const isCompleted = index < progressState.currentStep;
                    const IconComponent = step.icon;

                    return (
                      <div key={step.id} className="flex flex-col items-center relative z-10">
                        {/* Step Circle */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isActive
                            ? "bg-orange-500 text-white shadow-lg"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <IconComponent className="h-5 w-5" />
                        </div>

                        {/* Step Info */}
                        <div className="text-center max-w-[120px]">
                          <h3 className={`text-sm font-medium mb-1 ${
                            isActive ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {step.title}
                          </h3>
                          
                          {/* Step Progress Bar */}
                          {isActive && (
                            <div className="w-20 mx-auto">
                              <Progress 
                                value={progressState.stepProgress} 
                                className="h-1"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Text */}
              <div className="text-center">
                <p className="text-foreground font-medium mb-2">
                  {progressState.statusText}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated time remaining: {progressState.isComplete ? "0" : "2-3"} minutes
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Details */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-medium text-foreground mb-4">Current Analysis Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Data Points:</span>
                  <p className="text-foreground font-medium">
                    {progressState.totalProcessed.toLocaleString()} / {progressState.totalItems.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Current Step:</span>
                  <p className="text-foreground font-medium">
                    {steps[progressState.currentStep]?.title || "Complete"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Analysis Type:</span>
                  <p className="text-foreground font-medium">Product Iteration Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Updates */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live updates - Do not close this tab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Button - Fixed at bottom right */}
      <div className="fixed bottom-6 right-6">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="shadow-lg"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
}