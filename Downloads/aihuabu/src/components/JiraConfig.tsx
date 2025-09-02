import { useState } from "react";
import { format } from "date-fns";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Settings, 
  Target, 
  Folder, 
  Tag, 
  TestTube,
  AlertTriangle,
  Info,
  Users,
  Clock
} from "lucide-react";

interface JiraProject {
  id: string;
  key: string;
  name: string;
  type: "software" | "business" | "service";
  lead: string;
}

interface IssueType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface JiraUser {
  id: string;
  displayName: string;
  emailAddress: string;
  accountId: string;
}

interface JiraConfigProps {
  appContext: any;
}

export function JiraConfig({ appContext }: JiraConfigProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [jiraUrl, setJiraUrl] = useState("https://company.atlassian.net");
  const [selectedProject, setSelectedProject] = useState("PROD");
  const [defaultIssueType, setDefaultIssueType] = useState("task");
  const [defaultAssignee, setDefaultAssignee] = useState("auto");
  const [defaultPriority, setDefaultPriority] = useState("medium");
  
  // Automation settings
  const [autoCreateTickets, setAutoCreateTickets] = useState(true);
  const [autoAssignTickets, setAutoAssignTickets] = useState(false);
  const [includeROIData, setIncludeROIData] = useState(true);
  const [linkToAnalysis, setLinkToAnalysis] = useState(true);
  const [notifyAssignee, setNotifyAssignee] = useState(true);

  // Template settings
  const [ticketTemplate, setTicketTemplate] = useState(`## Action Required: {{action_title}}

**Priority Level:** {{priority}}
**Estimated ROI:** {{roi_estimate}}
**Confidence Score:** {{confidence}}

### Background
{{description}}

### Recommended Actions
{{recommendations}}

### Success Metrics
{{success_metrics}}

### Additional Context
- Analysis ID: {{analysis_id}}
- Date Generated: {{date}}
- Link to Full Report: {{report_link}}`);

  // Mock data
  const projects: JiraProject[] = [
    { id: "PROD", key: "PROD", name: "Product Development", type: "software", lead: "Sarah Chen" },
    { id: "MKTG", key: "MKTG", name: "Marketing Initiatives", type: "business", lead: "Marcus Rodriguez" },
    { id: "SUPP", key: "SUPP", name: "Customer Support", type: "service", lead: "Emily Johnson" },
    { id: "ENG", key: "ENG", name: "Engineering", type: "software", lead: "David Park" }
  ];

  const issueTypes: IssueType[] = [
    { id: "task", name: "Task", icon: "📋", description: "General work item" },
    { id: "story", name: "Story", icon: "📖", description: "User story or feature" },
    { id: "bug", name: "Bug", icon: "🐛", description: "Issue to be fixed" },
    { id: "epic", name: "Epic", icon: "🎯", description: "Large work initiative" },
    { id: "improvement", name: "Improvement", icon: "⬆️", description: "Enhancement to existing functionality" }
  ];

  const users: JiraUser[] = [
    { id: "auto", displayName: "Auto-assign based on project", emailAddress: "", accountId: "auto" },
    { id: "sarah", displayName: "Sarah Chen", emailAddress: "sarah.chen@company.com", accountId: "account-1" },
    { id: "marcus", displayName: "Marcus Rodriguez", emailAddress: "marcus.r@company.com", accountId: "account-2" },
    { id: "emily", displayName: "Emily Johnson", emailAddress: "emily.johnson@company.com", accountId: "account-3" },
    { id: "david", displayName: "David Park", emailAddress: "david.park@company.com", accountId: "account-4" }
  ];

  const priorities = [
    { value: "highest", label: "Highest", color: "text-red-600" },
    { value: "high", label: "High", color: "text-orange-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "low", label: "Low", color: "text-blue-600" },
    { value: "lowest", label: "Lowest", color: "text-gray-600" }
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
    // Simulate test ticket creation
    setTimeout(() => {
      setIsLoading(false);
      console.log("Test ticket created successfully");
    }, 1500);
  };

  const handleSaveSettings = () => {
    console.log("Saving Jira configuration:", {
      jiraUrl,
      project: selectedProject,
      defaults: { issueType: defaultIssueType, assignee: defaultAssignee, priority: defaultPriority },
      automation: { autoCreateTickets, autoAssignTickets, includeROIData, linkToAnalysis, notifyAssignee },
      template: ticketTemplate
    });
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case "software": return "💻";
      case "business": return "📊"; 
      case "service": return "🛠️";
      default: return "📁";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="jira-config"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
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
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-medium">Jira Integration</h1>
                  <p className="text-muted-foreground">
                    Automatically create and sync action cards as Jira tickets
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

          {/* Connection Setup */}
          {!isConnected ? (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-medium text-blue-900">Connect to Jira</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Connect your Jira instance to automatically create tickets from action cards. You'll need admin permissions to authorize the integration.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jira-url">Jira Instance URL</Label>
                      <Input
                        id="jira-url"
                        value={jiraUrl}
                        onChange={(e) => setJiraUrl(e.target.value)}
                        placeholder="https://your-company.atlassian.net"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleConnect}
                      disabled={isLoading || !jiraUrl}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? "Connecting..." : "Connect to Jira"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Instance Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <span>Instance Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instance-url">Jira Instance URL</Label>
                      <Input
                        id="instance-url"
                        value={jiraUrl}
                        onChange={(e) => setJiraUrl(e.target.value)}
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Connection Status</Label>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">Connected</span>
                        </div>
                        <span className="text-xs text-green-600">Last sync: 2 min ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm text-muted-foreground">
                      Connected as: <span className="font-medium">admin@company.com</span>
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
                            <AlertDialogTitle>Disconnect Jira Integration?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will stop automatic ticket creation. Existing tickets will remain unchanged, but new action cards won't be synced to Jira.
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

              {/* Project Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Folder className="h-5 w-5 text-green-600" />
                    <span>Project & Defaults</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project">Default Project</Label>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map(project => (
                            <SelectItem key={project.id} value={project.key}>
                              <div className="flex items-center space-x-2">
                                <span>{getProjectIcon(project.type)}</span>
                                <span>{project.name}</span>
                                <span className="text-xs text-muted-foreground">({project.key})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issue-type">Default Issue Type</Label>
                      <Select value={defaultIssueType} onValueChange={setDefaultIssueType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {issueTypes.map(type => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center space-x-2">
                                <span>{type.icon}</span>
                                <span>{type.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignee">Default Assignee</Label>
                      <Select value={defaultAssignee} onValueChange={setDefaultAssignee}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center space-x-2">
                                <Users className="h-3 w-3" />
                                <span>{user.displayName}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Default Priority</Label>
                      <Select value={defaultPriority} onValueChange={setDefaultPriority}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map(priority => (
                            <SelectItem key={priority.value} value={priority.value}>
                              <span className={priority.color}>{priority.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Automation Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <span>Automation Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="auto-create">Auto-create Tickets</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically create Jira tickets when action cards are generated
                        </p>
                      </div>
                      <Switch
                        id="auto-create"
                        checked={autoCreateTickets}
                        onCheckedChange={setAutoCreateTickets}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="auto-assign">Auto-assign Tickets</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically assign tickets based on action card priority and type
                        </p>
                      </div>
                      <Switch
                        id="auto-assign"
                        checked={autoAssignTickets}
                        onCheckedChange={setAutoAssignTickets}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="include-roi">Include ROI Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Add ROI predictions and confidence scores to ticket descriptions
                        </p>
                      </div>
                      <Switch
                        id="include-roi"
                        checked={includeROIData}
                        onCheckedChange={setIncludeROIData}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="link-analysis">Link to Analysis</Label>
                        <p className="text-sm text-muted-foreground">
                          Include direct links to view full analysis and reports
                        </p>
                      </div>
                      <Switch
                        id="link-analysis"
                        checked={linkToAnalysis}
                        onCheckedChange={setLinkToAnalysis}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="notify-assignee">Notify Assignee</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email notifications when tickets are auto-created
                        </p>
                      </div>
                      <Switch
                        id="notify-assignee"
                        checked={notifyAssignee}
                        onCheckedChange={setNotifyAssignee}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Template */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Tag className="h-5 w-5 text-orange-600" />
                    <span>Ticket Template</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Ticket Description Template</Label>
                    <Textarea
                      id="template"
                      value={ticketTemplate}
                      onChange={(e) => setTicketTemplate(e.target.value)}
                      className="min-h-64 font-mono text-sm"
                      placeholder="Enter your ticket template..."
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Available Variables:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span>{"{{action_title}}"}</span>
                      <span>{"{{priority}}"}</span>
                      <span>{"{{roi_estimate}}"}</span>
                      <span>{"{{confidence}}"}</span>
                      <span>{"{{description}}"}</span>
                      <span>{"{{recommendations}}"}</span>
                      <span>{"{{success_metrics}}"}</span>
                      <span>{"{{analysis_id}}"}</span>
                      <span>{"{{date}}"}</span>
                      <span>{"{{report_link}}"}</span>
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
                      <h3 className="font-medium text-blue-900">Sync Behavior</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Tickets are created within 2 minutes of action card generation</li>
                        <li>• Updates to action card status will sync to Jira ticket status</li>
                        <li>• Jira comments and updates will not sync back to action cards</li>
                        <li>• You can manually link existing tickets to action cards</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
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