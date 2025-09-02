import { useState } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { 
  Users, 
  Plus, 
  Trash2, 
  Settings, 
  Slack, 
  Zap, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Shield,
  User,
  Eye,
  Activity
} from "lucide-react";
import { format } from "date-fns";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Read-only";
  joinDate: string;
  lastActive: string;
}

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "Connected" | "Not Connected";
  description: string;
  lastSync?: string;
  color: string;
}

interface ActivityLogEntry {
  id: string;
  type: "member" | "integration" | "permission";
  action: string;
  user: string;
  details: string;
  timestamp: string;
}

interface TeamSettingsProps {
  appContext: any;
}

export function TeamSettings({ appContext }: TeamSettingsProps) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<"Admin" | "User" | "Read-only">("User");
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "member-001",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      role: "Admin",
      joinDate: "2024-01-15",
      lastActive: "2025-09-02"
    },
    {
      id: "member-002",
      name: "Marcus Rodriguez",
      email: "marcus.r@company.com", 
      role: "User",
      joinDate: "2024-03-22",
      lastActive: "2025-09-01"
    },
    {
      id: "member-003",
      name: "Emily Johnson",
      email: "emily.johnson@company.com",
      role: "User",
      joinDate: "2024-05-08",
      lastActive: "2025-08-30"
    },
    {
      id: "member-004",
      name: "David Park",
      email: "david.park@company.com",
      role: "Read-only",
      joinDate: "2024-07-12",
      lastActive: "2025-08-28"
    }
  ]);

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "slack",
      name: "Slack",
      icon: <Slack className="h-6 w-6" />,
      status: "Connected",
      description: "Send notifications and reports to team channels",
      lastSync: "2025-09-02T10:30:00Z",
      color: "bg-orange-500"
    },
    {
      id: "jira",
      name: "Jira",
      icon: <Zap className="h-6 w-6" />,
      status: "Connected", 
      description: "Create and sync action cards as Jira tickets",
      lastSync: "2025-09-02T09:15:00Z",
      color: "bg-blue-500"
    },
    {
      id: "notion",
      name: "Notion",
      icon: <FileText className="h-6 w-6" />,
      status: "Not Connected",
      description: "Export reports and documentation to Notion pages",
      color: "bg-gray-600"
    }
  ]);

  const [activityLog] = useState<ActivityLogEntry[]>([
    {
      id: "activity-001",
      type: "member",
      action: "Added team member",
      user: "Sarah Chen",
      details: "David Park added with Read-only role",
      timestamp: "2024-07-12T14:22:00Z"
    },
    {
      id: "activity-002",
      type: "integration",
      action: "Connected integration",
      user: "Sarah Chen", 
      details: "Jira integration configured",
      timestamp: "2024-06-28T11:45:00Z"
    },
    {
      id: "activity-003",
      type: "permission",
      action: "Role updated",
      user: "Marcus Rodriguez",
      details: "Emily Johnson promoted to User role",
      timestamp: "2024-05-15T16:30:00Z"
    },
    {
      id: "activity-004",
      type: "integration",
      action: "Connected integration",
      user: "Sarah Chen",
      details: "Slack integration configured",
      timestamp: "2024-02-20T09:20:00Z"
    },
    {
      id: "activity-005",
      type: "member",
      action: "Added team member",
      user: "Sarah Chen",
      details: "Marcus Rodriguez added with User role",
      timestamp: "2024-03-22T13:15:00Z"
    }
  ]);

  const handleAddMember = () => {
    if (newMemberName && newMemberEmail) {
      const newMember: TeamMember = {
        id: `member-${Date.now()}`,
        name: newMemberName,
        email: newMemberEmail,
        role: newMemberRole,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0]
      };
      
      setMembers([...members, newMember]);
      setNewMemberName("");
      setNewMemberEmail("");
      setNewMemberRole("User");
      setIsAddMemberOpen(false);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  const handleUpdateMemberRole = (memberId: string, newRole: "Admin" | "User" | "Read-only") => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  const handleConfigureIntegration = (integrationId: string) => {
    switch (integrationId) {
      case "slack":
        appContext.navigateTo("slack-config");
        break;
      case "jira":
        appContext.navigateTo("jira-config");
        break;
      case "notion":
        appContext.navigateTo("notion-config");
        break;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        );
      case "User":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <User className="h-3 w-3 mr-1" />
            User
          </Badge>
        );
      case "Read-only":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <Eye className="h-3 w-3 mr-1" />
            Read-only
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Connected") {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
          <XCircle className="h-3 w-3 mr-1" />
          Not Connected
        </Badge>
      );
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "member":
        return <Users className="h-4 w-4 text-blue-600" />;
      case "integration":
        return <Settings className="h-4 w-4 text-green-600" />;
      case "permission":
        return <Shield className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="team-settings"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-foreground mb-2">
              Team Settings
            </h1>
            <p className="text-muted-foreground">
              Manage team members, roles, and third-party integrations
            </p>
          </div>

          {/* Member Management Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Member Management</span>
                </CardTitle>
                
                <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>
                        Invite a new member to your team. They will receive an email invitation.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={newMemberRole} onValueChange={(value: "Admin" | "User" | "Read-only") => setNewMemberRole(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Read-only">Read-only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddMember}>
                        Add Member
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell className="text-muted-foreground">{member.email}</TableCell>
                      <TableCell>
                        <Select 
                          value={member.role} 
                          onValueChange={(value: "Admin" | "User" | "Read-only") => handleUpdateMemberRole(member.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Read-only">Read-only</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(member.joinDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(member.lastActive), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Integrations Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <span>Integrations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {integrations.map((integration) => (
                  <Card key={integration.id} className="border-2 hover:border-orange-200 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${integration.color} text-white`}>
                            {integration.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{integration.name}</h3>
                            {getStatusBadge(integration.status)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                      
                      {integration.status === "Connected" && integration.lastSync && (
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Last sync: {format(new Date(integration.lastSync), "MMM d, h:mm a")}</span>
                        </div>
                      )}
                      
                      <Button
                        onClick={() => handleConfigureIntegration(integration.id)}
                        className="w-full bg-orange-500 hover:bg-orange-600"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-gray-600" />
                <span>Activity Log</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((entry, index) => (
                  <div key={entry.id}>
                    <div className="flex items-start space-x-3 py-3">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(entry.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">
                            <span className="font-medium">{entry.user}</span>
                            <span className="text-muted-foreground"> {entry.action.toLowerCase()}</span>
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(entry.timestamp), "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {entry.details}
                        </p>
                      </div>
                    </div>
                    {index < activityLog.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}