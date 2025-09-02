import { useState } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Calendar, TrendingUp, Target, CheckCircle2, Save, FileText, Share, BarChart3 } from "lucide-react";

interface QuarterlyData {
  period: string;
  analysisTasks: number;
  avgROIDeviation: number;
  completionRate: number;
}

interface QuarterlyReviewProps {
  appContext: any;
}

export function QuarterlyReview({ appContext }: QuarterlyReviewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-Q2");
  const [strategyOutcomes, setStrategyOutcomes] = useState(`## Key Achievements This Quarter

• **Mobile App Performance Initiative** - Successfully reduced loading times by 35% and improved user satisfaction scores from 3.2 to 4.2
• **API Integration Enhancement** - Delivered Slack, Teams, and Salesforce integrations ahead of schedule, resulting in 40% increase in user engagement
• **Customer Support Automation** - Implemented chatbot solution reducing response times by 60% and support ticket volume by 25%

## Strategic Impact Analysis

The quarter delivered strong results across all key performance indicators. Our product iteration strategy successfully identified and addressed the most critical user pain points, resulting in measurable improvements in both user satisfaction and business metrics.

**ROI Realized:** $2.4M in cost savings and revenue generation
**User Impact:** 78% improvement in overall user experience metrics
**Team Efficiency:** 45% reduction in development cycle time`);

  const [deviationSummary, setDeviationSummary] = useState(`## Overall Performance vs Predictions

**Average ROI Deviation: -3.2%** (within acceptable variance)

## Key Deviations Analysis

• **Mobile App Performance** (-5.7% deviation)
  - Reason: Older device compatibility issues emerged during rollout
  - Impact: Moderate - affected 15% of user base
  - Mitigation: Device-specific optimization roadmap established

• **API Integrations** (+4.6% deviation) 
  - Reason: Caching optimizations exceeded expectations
  - Impact: Positive - additional performance benefits realized
  - Learning: Apply similar patterns to future integrations

• **UI Redesign Project** (-12.3% deviation)
  - Reason: Accessibility requirements expanded scope
  - Impact: Moderate - timeline extended by 3 weeks
  - Resolution: Additional accessibility testing protocols implemented

## Root Cause Analysis

Primary deviation drivers were scope changes and emerging requirements during implementation. Prediction accuracy improved 23% compared to previous quarter through enhanced data collection methods.`);

  const [nextQuarterPlan, setNextQuarterPlan] = useState(`## Strategic Priorities Q3 2024

### Primary Objectives
1. **Advanced Analytics Dashboard** - Implement real-time performance monitoring and predictive insights
2. **Cross-Platform Optimization** - Ensure consistent experience across all device types and browsers  
3. **Enterprise Security Enhancement** - Upgrade authentication and data protection capabilities

### Resource Allocation
• **Engineering:** 60% new features, 30% optimization, 10% technical debt
• **Design:** Focus on accessibility compliance and mobile-first experiences
• **Product:** Enhanced user research and feedback collection systems

### Success Metrics
• User satisfaction score target: 4.5+ (current: 4.2)
• ROI prediction accuracy target: 95% (current: 92%)
• Feature adoption rate target: 65% within 30 days of release

### Risk Mitigation
• Implement staged rollout protocols for all major features
• Establish automated testing for edge cases and device compatibility
• Create backup resource allocation for scope changes

### Innovation Focus
Explore AI-powered personalization features and automated optimization recommendations based on user behavior patterns.`);

  // Mock data for different quarters
  const quarterlyData: Record<string, QuarterlyData> = {
    "2024-Q2": {
      period: "Q2 2024",
      analysisTasks: 12,
      avgROIDeviation: -3.2,
      completionRate: 87
    },
    "2024-Q1": {
      period: "Q1 2024", 
      analysisTasks: 8,
      avgROIDeviation: -7.8,
      completionRate: 73
    },
    "2023-Q4": {
      period: "Q4 2023",
      analysisTasks: 15,
      avgROIDeviation: 2.1,
      completionRate: 91
    },
    "2023-Q3": {
      period: "Q3 2023",
      analysisTasks: 10,
      avgROIDeviation: -5.4,
      completionRate: 82
    }
  };

  const currentData = quarterlyData[selectedPeriod];

  const handleSaveDraft = () => {
    console.log("Saving draft for period:", selectedPeriod);
    // In a real app, this would save to backend/localStorage
  };

  const handleExportWord = () => {
    console.log("Exporting to Word for period:", selectedPeriod);
    // In a real app, this would generate a Word document
  };

  const handleShareToNotion = () => {
    console.log("Sharing to Notion for period:", selectedPeriod);
    // In a real app, this would integrate with Notion API
  };

  const getDeviationColor = (deviation: number) => {
    if (Math.abs(deviation) <= 5) return "text-green-600";
    if (Math.abs(deviation) <= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="quarterly-review"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-medium text-foreground mb-2">
                Quarterly Review
              </h1>
              <p className="text-muted-foreground">
                Comprehensive analysis of product strategy performance and planning for upcoming quarter
              </p>
            </div>

            {/* Time Period Selector */}
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-Q2">Q2 2024 (Apr - Jun)</SelectItem>
                  <SelectItem value="2024-Q1">Q1 2024 (Jan - Mar)</SelectItem>
                  <SelectItem value="2023-Q4">Q4 2023 (Oct - Dec)</SelectItem>
                  <SelectItem value="2023-Q3">Q3 2023 (Jul - Sep)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Analysis Tasks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-medium text-foreground">
                    {currentData.analysisTasks}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tasks completed this quarter
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span>Average ROI Deviation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className={`text-3xl font-medium ${getDeviationColor(currentData.avgROIDeviation)}`}>
                    {currentData.avgROIDeviation > 0 ? '+' : ''}{currentData.avgROIDeviation.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Predicted vs actual performance
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Target className="h-5 w-5 text-green-600" />
                  <span>Action Card Completion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className={`text-3xl font-medium ${getCompletionRateColor(currentData.completionRate)}`}>
                    {currentData.completionRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cards completed on time
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Text Template - Main Content */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Strategy Outcomes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Strategy Outcomes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={strategyOutcomes}
                    onChange={(e) => setStrategyOutcomes(e.target.value)}
                    className="min-h-80 font-mono text-sm leading-relaxed resize-none"
                    placeholder="Document key achievements and strategic impact..."
                  />
                </CardContent>
              </Card>

              {/* Deviation Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <span>Deviation Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={deviationSummary}
                    onChange={(e) => setDeviationSummary(e.target.value)}
                    className="min-h-80 font-mono text-sm leading-relaxed resize-none"
                    placeholder="Analyze performance deviations and root causes..."
                  />
                </CardContent>
              </Card>

              {/* Next Quarter Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>Next Quarter Plan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={nextQuarterPlan}
                    onChange={(e) => setNextQuarterPlan(e.target.value)}
                    className="min-h-80 font-mono text-sm leading-relaxed resize-none"
                    placeholder="Outline strategic priorities and objectives for next quarter..."
                  />
                </CardContent>
              </Card>
            </div>

            {/* Action Panel - Right Side */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-base">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button
                      onClick={handleSaveDraft}
                      variant="outline"
                      className="w-full text-gray-600 border-gray-300 hover:bg-gray-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>

                    <Button
                      onClick={handleExportWord}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Export Word
                    </Button>

                    <Button
                      onClick={handleShareToNotion}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share to Notion
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <h4 className="font-medium text-foreground">Review Period</h4>
                    <p>{currentData.period}</p>
                    
                    <h4 className="font-medium text-foreground mt-4">Last Updated</h4>
                    <p>Just now</p>

                    <h4 className="font-medium text-foreground mt-4">Word Count</h4>
                    <p>{(strategyOutcomes + deviationSummary + nextQuarterPlan).split(' ').length} words</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}