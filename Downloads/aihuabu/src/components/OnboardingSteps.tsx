import { Upload, BarChart3, Target } from "lucide-react";

export function OnboardingSteps() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Data",
      description: "Import your feedback data from various sources",
      color: "text-blue-600"
    },
    {
      icon: BarChart3,
      title: "Analyze",
      description: "Our AI processes and analyzes your data patterns",
      color: "text-green-600"
    },
    {
      icon: Target,
      title: "Action Cards",
      description: "Get actionable insights and ROI recommendations",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-xl font-medium text-foreground mb-2">
          How it works
        </h2>
        <p className="text-muted-foreground">
          Transform your feedback into actionable business insights
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center max-w-xs">
            {/* Step Number and Icon */}
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
            </div>
            
            {/* Step Content */}
            <h3 className="font-medium text-foreground mb-2">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
            
            {/* Connector Arrow */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-border transform translate-x-4">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-border border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile connectors */}
      <div className="md:hidden flex flex-col items-center space-y-4 mt-8">
        {steps.slice(0, -1).map((_, index) => (
          <div key={index} className="w-0.5 h-8 bg-border"></div>
        ))}
      </div>
    </div>
  );
}