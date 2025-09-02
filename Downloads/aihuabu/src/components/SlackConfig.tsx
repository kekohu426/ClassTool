import { useState } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { 
  Slack, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Settings, 
  Bell, 
  Hash, 
  Users, 
  TestTube,
  AlertTriangle,
  Info
} from "lucide-react";

interface SlackChannel {
  id: string;
  name: string;
  type: "public" | "private";
  memberCount: number;
}

interface SlackWorkspace {
  id: string;
  name: string;
  domain: string;
  icon?: string;
}

interface SlackConfigProps {
  appContext: any;
}

export function SlackConfig({ appContext }: SlackConfigProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState("workspace-1");
  const [notificationChannel, setNotificationChannel] = useState("general");
  const [alertChannel, setAlertChannel] = useState("alerts");
  const [reportChannel, setReportChannel] = useState("reports");
  
  // Notification settings
  const [notifyOnAnalysisComplete, setNotifyOnAnalysisComplete] = useState(true);
  const [notifyOnHighDeviation, setNotifyOnHighDeviation] = useState(true);
  const [notifyOnReconciliation, setNotifyOnReconciliation] = useState(false);
  const [notifyOnWeeklyReport, setNotifyOnWeeklyReport] = useState(true);

  // Mock data
  const workspaces: SlackWorkspace[] = [
    {
      id: "workspace-1",
      name: "Product Team",
      domain: "productteam.slack.com",
      icon: "🚀"
    },
    {
      id: "workspace-2", 
      name: "Engineering Hub",
      domain: "enghub.slack.com",
      icon: "⚡"
    }
  ];

  const channels: SlackChannel[] = [
    { id: "general", name: "general", type: "public", memberCount: 24 },
    { id: "product-updates", name: "product-updates", type: "public", memberCount: 18 },
    { id: "alerts", name: "alerts", type: "public", memberCount: 12 },
    { id: "reports", name: "reports", type: "private", memberCount: 8 },
    { id: "dev-team", name: "dev-team", type: "private", memberCount: 15 },
    { id: "analytics", name: "analytics", type: "public", memberCount: 22 }
  ];

  const handleConnect = async () => {
    setIsLoading(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    // Simulate test message
    setTimeout(() => {
      setIsLoading(false);
      // In real app, would show success toast
      console.log("Test message sent successfully");
    }, 1500);
  };

  const handleSaveSettings = () => {
    console.log("Saving Slack configuration:", {
      workspace: selectedWorkspace,
      channels: { notificationChannel, alertChannel, reportChannel },
      notifications: {
        notifyOnAnalysisComplete,
        notifyOnHighDeviation,
        notifyOnReconciliation,
        notifyOnWeeklyReport
      }
    });
  };

  const getChannelIcon = (channel: SlackChannel) => {
    return channel.type === "private" ? (
      <Users className="h-3 w-3 text-gray-500" />
    ) : (
      <Hash className="h-3 w-3 text-gray-500" />
    );
  };

  const renderChannelOption = (channel: SlackChannel) => (
    <SelectItem key={channel.id} value={channel.id}>
      <div className="flex items-center space-x-2">
        {getChannelIcon(channel)}
        <span>#{channel.name}</span>
        <span className="text-xs text-muted-foreground">({channel.memberCount})</span>
      </div>
    </SelectItem>
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => appContext.navigateTo("team-settings")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-orange-500 text-white">
                  <Slack className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-medium">Slack Integration</h1>
                  <p className="text-muted-foreground">
                    Send notifications and reports to your Slack workspace
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isConnected ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                  <XCircle className="h-3 w-3 mr-1" />
                  Not Connected
                </Badge>
              )}
            </div>
          </div>

          {/* Connection Status */}
          {!isConnected ? (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-orange-900">Connect your Slack workspace</h3>
                    <p className="text-sm text-orange-700 mt-1">
                      Authorize Figma Make to send messages to your Slack workspace. You'll be redirected to Slack to complete the authentication.
                    </p>
                    <Button 
                      onClick={handleConnect}
                      disabled={isLoading}
                      className="mt-3 bg-orange-600 hover:bg-orange-700"
                    >
                      {isLoading ? "Connecting..." : "Connect to Slack"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Workspace Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <span>Workspace Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workspace">Connected Workspace</Label>
                    <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {workspaces.map(workspace => (
                          <SelectItem key={workspace.id} value={workspace.id}>
                            <div className="flex items-center space-x-2">
                              <span>{workspace.icon}</span>
                              <span>{workspace.name}</span>
                              <span className="text-xs text-muted-foreground">({workspace.domain})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Connection Status</p>
                      <p className="text-sm text-muted-foreground">
                        Last sync: September 2, 2025 at 10:30 AM
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleTestConnection}
                        disabled={isLoading}
                      >
                        <TestTube className="h-4 w-4 mr-2" />
                        {isLoading ? "Testing..." : "Test Connection"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            Disconnect
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Disconnect Slack Integration?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will stop all notifications and reports from being sent to your Slack workspace. You can reconnect at any time.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDisconnect} className="bg-red-600 hover:bg-red-700">
                              Disconnect
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Channel Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hash className="h-5 w-5 text-green-600" />
                    <span>Channel Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="notification-channel">General Notifications</Label>
                      <Select value={notificationChannel} onValueChange={setNotificationChannel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {channels.map(renderChannelOption)}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Analysis completion and status updates
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alert-channel">Critical Alerts</Label>
                      <Select value={alertChannel} onValueChange={setAlertChannel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {channels.map(renderChannelOption)}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        High deviation alerts and errors
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-channel">Reports</Label>
                      <Select value={reportChannel} onValueChange={setReportChannel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {channels.map(renderChannelOption)}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Weekly and quarterly reports
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-yellow-600" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="analysis-complete">Analysis Complete</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when analysis tasks are completed with action cards
                        </p>
                      </div>
                      <Switch
                        id="analysis-complete"
                        checked={notifyOnAnalysisComplete}
                        onCheckedChange={setNotifyOnAnalysisComplete}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="high-deviation">High Deviation Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Alert when ROI deviation exceeds 15% threshold
                        </p>
                      </div>
                      <Switch
                        id="high-deviation"
                        checked={notifyOnHighDeviation}
                        onCheckedChange={setNotifyOnHighDeviation}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="reconciliation">Reconciliation Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when reconciliation reports are generated
                        </p>
                      </div>
                      <Switch
                        id="reconciliation"
                        checked={notifyOnReconciliation}
                        onCheckedChange={setNotifyOnReconciliation}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="weekly-report">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Send weekly summary reports every Monday
                        </p>
                      </div>
                      <Switch
                        id="weekly-report"
                        checked={notifyOnWeeklyReport}
                        onCheckedChange={setNotifyOnWeeklyReport}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Information Card */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-2">
                      <h3 className="font-medium text-blue-900">Message Format</h3>
                      <p className="text-sm text-blue-700">
                        Messages will include action buttons to view detailed reports, action cards, and reconciliation data directly in your browser.
                      </p>
                      <p className="text-sm text-blue-700">
                        All messages respect your workspace's Do Not Disturb settings and time zone preferences.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings} className="bg-orange-600 hover:bg-orange-700">
                  Save Configuration
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}