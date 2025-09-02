import { useState } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Separator } from "./ui/separator";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp, TrendingUp, AlertCircle, ExternalLink, Download, Users, Target } from "lucide-react";

interface ActionCard {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  description: string;
  evidence: {
    totalFeedback: number;
    csvSnippet: string[];
    sources: string[];
  };
  roiPrediction: {
    confidenceScore: number;
    impactScore: number;
    effortEstimate: string;
    chartData: Array<{ month: string; value: number }>;
  };
  acceptanceCriteria: string[];
}

interface ActionCardResultsProps {
  appContext: any;
}

export function ActionCardResults({ appContext }: ActionCardResultsProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const toggleCardSelection = (cardId: string) => {
    setSelectedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const actionCards: ActionCard[] = [
    {
      id: "mobile-optimization",
      title: "Improve Mobile App Performance",
      priority: "High",
      description: "Optimize mobile app loading times and fix critical performance bottlenecks to improve user satisfaction and reduce churn.",
      evidence: {
        totalFeedback: 247,
        csvSnippet: [
          "feedback,category,rating,date",
          "\"App takes forever to load on my phone\",Performance,2,2025-08-30",
          "\"Mobile version is so slow compared to desktop\",Performance,1,2025-08-29",
          "\"Please fix the mobile loading issues\",Performance,2,2025-08-28"
        ],
        sources: ["App Store Reviews", "Customer Support Tickets", "User Survey Q3"]
      },
      roiPrediction: {
        confidenceScore: 87,
        impactScore: 94,
        effortEstimate: "6-8 weeks",
        chartData: [
          { month: "Current", value: 2.3 },
          { month: "Month 1", value: 3.1 },
          { month: "Month 2", value: 4.2 },
          { month: "Month 3", value: 4.7 },
          { month: "Month 6", value: 4.9 }
        ]
      },
      acceptanceCriteria: [
        "Mobile app loading time reduced to under 3 seconds",
        "Crash rate decreased by 75%",
        "Mobile user satisfaction score increased to 4.5+",
        "Performance monitoring dashboard implemented"
      ]
    },
    {
      id: "integration-apis",
      title: "Add Third-party Integrations",
      priority: "High",
      description: "Implement popular integrations (Slack, Teams, Salesforce) to streamline workflow and increase user engagement.",
      evidence: {
        totalFeedback: 189,
        csvSnippet: [
          "feedback,category,rating,date",
          "\"Need Slack integration for our team workflow\",Feature Request,4,2025-08-31",
          "\"Would pay more for Salesforce integration\",Integration,5,2025-08-30",
          "\"Microsoft Teams integration is essential\",Feature Request,4,2025-08-29"
        ],
        sources: ["Feature Request Forum", "Sales Team Feedback", "Customer Interviews"]
      },
      roiPrediction: {
        confidenceScore: 82,
        impactScore: 78,
        effortEstimate: "10-12 weeks",
        chartData: [
          { month: "Current", value: 3.8 },
          { month: "Month 1", value: 4.1 },
          { month: "Month 2", value: 4.4 },
          { month: "Month 3", value: 4.6 },
          { month: "Month 6", value: 4.8 }
        ]
      },
      acceptanceCriteria: [
        "Slack, Teams, and Salesforce integrations live",
        "Integration usage by 40% of active users within 3 months",
        "Customer satisfaction increase of 0.8+ points",
        "Revenue increase from upsells by 15%"
      ]
    },
    {
      id: "ui-redesign",
      title: "Redesign User Dashboard Interface",
      priority: "Medium",
      description: "Modernize the main dashboard UI to improve usability and align with current design trends and accessibility standards.",
      evidence: {
        totalFeedback: 156,
        csvSnippet: [
          "feedback,category,rating,date",
          "\"Dashboard feels outdated compared to competitors\",UI/UX,3,2025-08-31",
          "\"Hard to find what I need in the current layout\",UI/UX,2,2025-08-30",
          "\"Love the functionality but UI needs work\",UI/UX,3,2025-08-29"
        ],
        sources: ["User Experience Survey", "Usability Testing", "Customer Support"]
      },
      roiPrediction: {
        confidenceScore: 71,
        impactScore: 65,
        effortEstimate: "8-10 weeks",
        chartData: [
          { month: "Current", value: 3.4 },
          { month: "Month 1", value: 3.6 },
          { month: "Month 2", value: 3.9 },
          { month: "Month 3", value: 4.1 },
          { month: "Month 6", value: 4.3 }
        ]
      },
      acceptanceCriteria: [
        "New dashboard design meets WCAG 2.1 AA standards",
        "User task completion time improved by 25%",
        "UI/UX satisfaction score increased to 4.0+",
        "Mobile responsiveness across all screen sizes"
      ]
    }
  ];

  const handlePushToJira = (cardId: string) => {
    console.log("Pushing to Jira:", cardId);
  };

  const handleExport = (cardId: string) => {
    console.log("Exporting:", cardId);
  };

  const handleBatchPushToJira = () => {
    console.log("Batch pushing to Jira:", Array.from(selectedCards));
  };

  const handleBatchExport = () => {
    console.log("Batch exporting:", Array.from(selectedCards));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="action-results"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-medium text-foreground mb-2">
                  Product Iteration Priority Analysis Results
                </h1>
                <p className="text-muted-foreground">
                  AI-generated action cards based on your feedback analysis with ROI predictions and implementation guidance
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>800 feedback entries analyzed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>3 priority actions identified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="space-y-6 mb-8">
            {actionCards.map((card) => {
              const isExpanded = expandedCards.has(card.id);
              const isSelected = selectedCards.has(card.id);
              
              return (
                <Card key={card.id} className={`transition-all duration-200 ${
                  isSelected ? "ring-2 ring-orange-500 ring-offset-2" : ""
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleCardSelection(card.id)}
                            className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                          />
                          <CardTitle className="text-xl">{card.title}</CardTitle>
                          <Badge className={`${getPriorityColor(card.priority)} border`}>
                            {card.priority} Priority
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Evidence Section */}
                    <Collapsible open={isExpanded} onOpenChange={() => toggleCardExpansion(card.id)}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            <span className="font-medium">Evidence ({card.evidence.totalFeedback} feedback entries)</span>
                          </div>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-4">
                        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                          <div>
                            <h4 className="font-medium mb-2">Sample Feedback:</h4>
                            <div className="bg-background rounded border text-sm font-mono overflow-x-auto">
                              {card.evidence.csvSnippet.map((line, index) => (
                                <div key={index} className={`p-2 border-b last:border-b-0 ${
                                  index === 0 ? "bg-muted/30 font-medium" : ""
                                }`}>
                                  {line}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Data Sources:</h4>
                            <div className="flex flex-wrap gap-2">
                              {card.evidence.sources.map((source, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Separator />

                    {/* ROI Prediction */}
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium">ROI Prediction</span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Metrics */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <div className="text-2xl font-medium text-green-600">
                                {card.roiPrediction.confidenceScore}%
                              </div>
                              <div className="text-sm text-muted-foreground">Confidence Score</div>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-medium text-blue-600">
                                {card.roiPrediction.impactScore}%
                              </div>
                              <div className="text-sm text-muted-foreground">Impact Score</div>
                            </div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="font-medium text-orange-600">
                              {card.roiPrediction.effortEstimate}
                            </div>
                            <div className="text-sm text-muted-foreground">Estimated Effort</div>
                          </div>
                        </div>

                        {/* Chart */}
                        <div className="bg-muted/30 rounded-lg p-4">
                          <h4 className="font-medium mb-3 text-center">Predicted User Satisfaction</h4>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={card.roiPrediction.chartData}>
                                <XAxis 
                                  dataKey="month" 
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fontSize: 12 }}
                                />
                                <YAxis 
                                  domain={[1, 5]}
                                  axisLine={false}
                                  tickLine={false}
                                  tick={{ fontSize: 12 }}
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke="#f97316" 
                                  strokeWidth={2}
                                  dot={{ fill: "#f97316", strokeWidth: 2, r: 3 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Acceptance Criteria */}
                    <div>
                      <h4 className="font-medium mb-3">Acceptance Criteria</h4>
                      <ul className="space-y-2">
                        {card.acceptanceCriteria.map((criteria, index) => (
                          <li key={index} className="flex items-start space-x-2 text-red-600">
                            <span className="text-red-600 mt-1">•</span>
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => handleExport(card.id)}
                        className="text-gray-600 border-gray-300 hover:bg-gray-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button
                        onClick={() => handlePushToJira(card.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Push to Jira
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Batch Actions */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleBatchExport}
              disabled={selectedCards.size === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Batch Export ({selectedCards.size})
            </Button>
            <Button
              onClick={handleBatchPushToJira}
              disabled={selectedCards.size === 0}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Batch Push to Jira ({selectedCards.size})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}