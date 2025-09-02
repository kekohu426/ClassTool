import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Download, Share, TrendingUp, AlertCircle, CheckCircle2, Target, Brain, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface ComparisonData {
  category: string;
  predicted: number;
  actual: number;
  deviation: number;
  deviationPercent: number;
}

interface DetailedAnalysisRow {
  metric: string;
  predicted: number;
  actual: number;
  deviation: number;
  deviationPercent: number;
  reason: string;
  status: "success" | "warning" | "error";
}

interface ReconciliationReportProps {
  appContext: any;
}

export function ReconciliationReport({ appContext }: ReconciliationReportProps) {
  // Mock data for the comparison chart
  const comparisonData: ComparisonData[] = [
    {
      category: "User Satisfaction",
      predicted: 4.7,
      actual: 4.2,
      deviation: -0.5,
      deviationPercent: -10.6
    },
    {
      category: "Performance Score",
      predicted: 87,
      actual: 91,
      deviation: 4,
      deviationPercent: 4.6
    },
    {
      category: "Engagement Rate",
      predicted: 78,
      actual: 74,
      deviation: -4,
      deviationPercent: -5.1
    }
  ];

  // Mock data for detailed analysis
  const detailedAnalysis: DetailedAnalysisRow[] = [
    {
      metric: "Mobile App Load Time",
      predicted: 3.2,
      actual: 2.8,
      deviation: -0.4,
      deviationPercent: -12.5,
      reason: "Optimization exceeded expectations due to caching improvements",
      status: "success"
    },
    {
      metric: "User Satisfaction Score",
      predicted: 4.7,
      actual: 4.2,
      deviation: -0.5,
      deviationPercent: -10.6,
      reason: "Some users still experiencing issues on older devices",
      status: "warning"
    },
    {
      metric: "Crash Rate Reduction",
      predicted: 75,
      actual: 68,
      deviation: -7,
      deviationPercent: -9.3,
      reason: "New edge cases discovered during testing phase",
      status: "warning"
    },
    {
      metric: "Performance Monitoring",
      predicted: 100,
      actual: 100,
      deviation: 0,
      deviationPercent: 0,
      reason: "Dashboard successfully implemented and operational",
      status: "success"
    },
    {
      metric: "Overall ROI Impact",
      predicted: 87,
      actual: 82,
      deviation: -5,
      deviationPercent: -5.7,
      reason: "Slightly lower adoption rate than anticipated",
      status: "warning"
    }
  ];

  const getDeviationColor = (deviationPercent: number) => {
    if (Math.abs(deviationPercent) <= 5) return "#22c55e"; // Green - within 5%
    if (Math.abs(deviationPercent) <= 15) return "#eab308"; // Yellow - within 15%
    return "#ef4444"; // Red - over 15%
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "error": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF report");
  };

  const handleShareToSlack = () => {
    console.log("Sharing to Slack");
  };

  // Chart data for bar chart
  const chartData = comparisonData.map(item => ({
    name: item.category,
    predicted: item.predicted,
    actual: item.actual,
    color: getDeviationColor(item.deviationPercent)
  }));

  const overallROI = detailedAnalysis.find(item => item.metric === "Overall ROI Impact");

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="reconciliation-report"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-medium text-foreground mb-2">
                Reconciliation Report
              </h1>
              <p className="text-muted-foreground">
                Mobile App Performance Improvement - Predicted vs Actual Results Analysis
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                onClick={handleShareToSlack}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Share className="h-4 w-4 mr-2" />
                Share to Slack
              </Button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Overall ROI</p>
                    <p className="font-medium">{overallROI?.actual}% (vs {overallROI?.predicted}% predicted)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  {overallROI && overallROI.deviation >= 0 ? (
                    <ArrowUpCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Deviation</p>
                    <p className={`font-medium ${overallROI && overallROI.deviation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {overallROI?.deviationPercent.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Metrics on Target</p>
                    <p className="font-medium">{detailedAnalysis.filter(item => item.status === 'success').length} of {detailedAnalysis.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* 1. Core Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Core Comparison: Predicted vs Actual ROI</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Bar dataKey="predicted" name="Predicted" fill="#e2e8f0" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="actual" name="Actual" radius={[2, 2, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-slate-300 rounded"></div>
                    <span>Predicted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Within 5% (Good)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>5-15% Deviation (Caution)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>15%+ Deviation (Attention Required)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Detailed Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span>Detailed Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-center">Predicted</TableHead>
                      <TableHead className="text-center">Actual</TableHead>
                      <TableHead className="text-center">Deviation</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailedAnalysis.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.metric}</TableCell>
                        <TableCell className="text-center">{row.predicted}</TableCell>
                        <TableCell className="text-center font-medium">{row.actual}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <span className={`font-medium ${
                              row.deviation > 0 ? 'text-green-600' : 
                              row.deviation < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {row.deviation > 0 ? '+' : ''}{row.deviation}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                Math.abs(row.deviationPercent) <= 5 ? 'border-green-200 text-green-600' :
                                Math.abs(row.deviationPercent) <= 15 ? 'border-yellow-200 text-yellow-600' :
                                'border-red-200 text-red-600'
                              }`}
                            >
                              {row.deviationPercent > 0 ? '+' : ''}{row.deviationPercent.toFixed(1)}%
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground">{row.reason}</p>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            {getStatusIcon(row.status)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 3. Review Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>AI-Generated Review Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Next Steps & Recommendations</h4>
                    
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Address User Satisfaction Gap</p>
                          <p className="text-muted-foreground">
                            The 10.6% shortfall in user satisfaction suggests that while technical improvements were successful, 
                            user experience on older devices needs attention. Consider implementing device-specific optimizations 
                            or providing upgrade recommendations.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Leverage Performance Gains</p>
                          <p className="text-muted-foreground">
                            The 4.6% improvement in performance score exceeds predictions. Document and replicate 
                            these caching improvements across other product areas to maximize ROI impact.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Investigate Crash Rate Factors</p>
                          <p className="text-muted-foreground">
                            The 9.3% gap in crash rate reduction indicates new edge cases emerged during implementation. 
                            Prioritize comprehensive testing protocols for future releases and establish automated 
                            edge case detection.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Refine ROI Prediction Models</p>
                          <p className="text-muted-foreground">
                            The 5.7% overall ROI deviation suggests our prediction models need calibration. 
                            Incorporate actual performance data to improve future estimates and reduce prediction variance 
                            to within 3% for better project planning.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">Recommended Actions for Next Quarter</h5>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Implement device-specific performance optimization strategy</li>
                        <li>• Establish automated edge case testing framework</li>
                        <li>• Conduct user research on older device user experience</li>
                        <li>• Update ROI prediction models with actual performance data</li>
                        <li>• Document and standardize successful caching implementation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}