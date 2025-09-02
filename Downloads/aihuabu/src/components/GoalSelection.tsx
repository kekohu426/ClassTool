import { useState } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Target, Check } from "lucide-react";

interface GoalSelectionProps {
  appContext: any;
}

export function GoalSelection({ appContext }: GoalSelectionProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleStartAnalysis = () => {
    if (selectedGoal) {
      console.log("Starting analysis for:", selectedGoal);
      appContext.handleGoalSelection([selectedGoal]);
    }
  };

  const goals = [
    {
      id: "product-iteration",
      title: "Product Iteration Priority Analysis",
      description: "Upload feedback data and generate ROI-backed action cards.",
      recommended: true,
      icon: Target,
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="goal-selection"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-foreground mb-2">
              Select Your Analysis Goal
            </h1>
            <p className="text-muted-foreground">
              Choose the type of analysis you'd like to perform on your data
            </p>
          </div>

          {/* Goal Selection Cards */}
          <div className="space-y-6 mb-8">
            {goals.map((goal) => {
              const isSelected = selectedGoal === goal.id;
              const IconComponent = goal.icon;
              
              return (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "border-orange-500 border-2 bg-orange-50/50"
                      : "border-border hover:border-orange-200"
                  }`}
                  onClick={() => handleGoalSelect(goal.id)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Header with icon, title, and badges */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isSelected 
                                ? "bg-orange-500 text-white" 
                                : "bg-orange-100 text-orange-600"
                            }`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-medium text-foreground mb-1">
                                {goal.title}
                              </h3>
                              {goal.recommended && (
                                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                          {goal.description}
                        </p>

                        {/* Features/Benefits */}
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></div>
                            AI-powered feedback analysis and categorization
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></div>
                            ROI-backed priority recommendations
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></div>
                            Actionable insights and implementation roadmap
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => appContext.navigateTo("data-upload")}
              className="px-8"
            >
              Back
            </Button>
            
            <Button
              onClick={handleStartAnalysis}
              disabled={!selectedGoal}
              className={`px-8 transition-colors ${
                selectedGoal
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Start Analysis
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2">
              <Target className="h-4 w-4" />
              <span>More analysis types coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}