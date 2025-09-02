import { useState } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Search, Calendar as CalendarIcon, Filter, History, FileText, TrendingUp, Clock, CheckCircle2, AlertCircle, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";

interface AnalysisTask {
  id: string;
  name: string;
  date: string;
  actionCards: number;
  status: "pending" | "complete" | "expired";
  completionDate?: string;
}

interface ReconciliationRecord {
  id: string;
  title: string;
  completionDate: string;
  deviationRate: number;
  status: "excellent" | "good" | "needs-attention";
  originalTaskId: string;
}

interface HistoryRecordsProps {
  appContext: any;
}

export function HistoryRecords({ appContext }: HistoryRecordsProps) {
  const [activeTab, setActiveTab] = useState("analysis");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  // Mock data for analysis tasks
  const analysisTasksData: AnalysisTask[] = [
    {
      id: "task-001",
      name: "Mobile App Performance Improvement",
      date: "2025-08-15",
      actionCards: 3,
      status: "complete",
      completionDate: "2025-09-02"
    },
    {
      id: "task-002", 
      name: "User Onboarding Optimization",
      date: "2025-08-20",
      actionCards: 5,
      status: "complete",
      completionDate: "2025-09-01"
    },
    {
      id: "task-003",
      name: "Dashboard UI/UX Redesign",
      date: "2025-08-25",
      actionCards: 4,
      status: "pending"
    },
    {
      id: "task-004",
      name: "API Integration Enhancement",
      date: "2025-07-10", 
      actionCards: 2,
      status: "expired"
    },
    {
      id: "task-005",
      name: "Customer Support Chatbot",
      date: "2025-08-30",
      actionCards: 6,
      status: "pending"
    }
  ];

  // Mock data for reconciliation records
  const reconciliationRecordsData: ReconciliationRecord[] = [
    {
      id: "recon-001",
      title: "Mobile App Performance Improvement",
      completionDate: "2025-09-02",
      deviationRate: -5.7,
      status: "good",
      originalTaskId: "task-001"
    },
    {
      id: "recon-002",
      title: "User Onboarding Optimization", 
      completionDate: "2025-09-01",
      deviationRate: 2.3,
      status: "excellent",
      originalTaskId: "task-002"
    },
    {
      id: "recon-003",
      title: "E-commerce Checkout Flow",
      completionDate: "2025-08-28",
      deviationRate: -18.4,
      status: "needs-attention",
      originalTaskId: "task-006"
    },
    {
      id: "recon-004",
      title: "Search Algorithm Improvement",
      completionDate: "2025-08-25",
      deviationRate: 8.1,
      status: "good",
      originalTaskId: "task-007"
    }
  ];

  // Filter functions
  const filterAnalysisTasks = (tasks: AnalysisTask[]) => {
    return tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      const matchesDate = !dateFilter || 
        new Date(task.date).toDateString() === dateFilter.toDateString() ||
        (task.completionDate && new Date(task.completionDate).toDateString() === dateFilter.toDateString());
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const filterReconciliationRecords = (records: ReconciliationRecord[]) => {
    return records.filter(record => {
      const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || record.status === statusFilter;
      const matchesDate = !dateFilter || 
        new Date(record.completionDate).toDateString() === dateFilter.toDateString();
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
      case "excellent":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {status === "complete" ? "Complete" : "Excellent"}
          </Badge>
        );
      case "pending":
      case "good":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            {status === "pending" ? "Pending" : "Good"}
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      case "needs-attention":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Needs Attention
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const handleRowClick = (id: string) => {
    setSelectedRow(selectedRow === id ? null : id);
  };

  const handleViewActionCards = (taskId: string) => {
    console.log("Viewing action cards for task:", taskId);
    appContext.navigateTo("action-results");
  };

  const handleViewReport = (recordId: string) => {
    console.log("Viewing report for record:", recordId);
    appContext.navigateTo("reconciliation-report");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter(undefined);
  };

  const filteredAnalysisTasks = filterAnalysisTasks(analysisTasksData);
  const filteredReconciliationRecords = filterReconciliationRecords(reconciliationRecordsData);

  const getStatusOptions = () => {
    if (activeTab === "analysis") {
      return [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "complete", label: "Complete" },
        { value: "expired", label: "Expired" }
      ];
    } else {
      return [
        { value: "all", label: "All Status" },
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "Good" },
        { value: "needs-attention", label: "Needs Attention" }
      ];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="history"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-foreground mb-2">
              History Records
            </h1>
            <p className="text-muted-foreground">
              Track and review your analysis tasks and reconciliation reports over time
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="analysis" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Analysis Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="reconciliation" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Reconciliation Records</span>
              </TabsTrigger>
            </TabsList>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                    {/* Search */}
                    <div className="relative w-full sm:w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    {/* Status Filter */}
                    <div className="w-full sm:w-48">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getStatusOptions().map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date Filter */}
                    <div className="w-full sm:w-48">
                      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateFilter ? format(dateFilter, "MMM d, yyyy") : "Filter by date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateFilter}
                            onSelect={(date) => {
                              setDateFilter(date);
                              setIsDatePickerOpen(false);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full sm:w-auto"
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Tasks Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <History className="h-5 w-5 text-blue-600" />
                          <span>Analysis Tasks</span>
                        </div>
                        <Badge variant="outline">
                          {filteredAnalysisTasks.length} tasks
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredAnalysisTasks.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Task Name</TableHead>
                              <TableHead>Date Created</TableHead>
                              <TableHead>Action Cards</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Completion Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredAnalysisTasks.map((task) => (
                              <TableRow 
                                key={task.id}
                                className={`cursor-pointer transition-colors ${
                                  selectedRow === task.id ? "bg-orange-50 border-orange-200" : "hover:bg-muted/50"
                                }`}
                                onClick={() => handleRowClick(task.id)}
                              >
                                <TableCell className="font-medium max-w-xs">
                                  <div className="truncate" title={task.name}>
                                    {task.name}
                                  </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {format(new Date(task.date), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                    {task.actionCards} cards
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(task.status)}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {task.completionDate 
                                    ? format(new Date(task.completionDate), "MMM d, yyyy")
                                    : "—"
                                  }
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <History className="h-8 w-8 mx-auto mb-2" />
                          <p>No analysis tasks found</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Action Panel */}
                <div className="lg:col-span-1">
                  <Card className={`sticky top-6 ${selectedRow ? '' : 'opacity-50'}`}>
                    <CardHeader>
                      <CardTitle className="text-base">Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedRow ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-4">
                            Task selected: {filteredAnalysisTasks.find(t => t.id === selectedRow)?.name}
                          </p>
                          <Button
                            onClick={() => handleViewActionCards(selectedRow)}
                            className="w-full"
                            disabled={filteredAnalysisTasks.find(t => t.id === selectedRow)?.status === "pending"}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Action Cards
                          </Button>
                          {filteredAnalysisTasks.find(t => t.id === selectedRow)?.status === "pending" && (
                            <p className="text-xs text-muted-foreground">
                              Complete analysis to view action cards
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Select a task to view available actions
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Reconciliation Records Tab */}
            <TabsContent value="reconciliation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span>Reconciliation Records</span>
                        </div>
                        <Badge variant="outline">
                          {filteredReconciliationRecords.length} records
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredReconciliationRecords.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Task Title</TableHead>
                              <TableHead>Completion Date</TableHead>
                              <TableHead>Deviation Rate</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredReconciliationRecords.map((record) => (
                              <TableRow 
                                key={record.id}
                                className={`cursor-pointer transition-colors ${
                                  selectedRow === record.id ? "bg-orange-50 border-orange-200" : "hover:bg-muted/50"
                                }`}
                                onClick={() => handleRowClick(record.id)}
                              >
                                <TableCell className="font-medium max-w-xs">
                                  <div className="truncate" title={record.title}>
                                    {record.title}
                                  </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {format(new Date(record.completionDate), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <span className={`font-medium ${
                                      Math.abs(record.deviationRate) <= 5 ? 'text-green-600' :
                                      Math.abs(record.deviationRate) <= 15 ? 'text-yellow-600' :
                                      'text-red-600'
                                    }`}>
                                      {record.deviationRate > 0 ? '+' : ''}{record.deviationRate.toFixed(1)}%
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(record.status)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                          <p>No reconciliation records found</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Action Panel */}
                <div className="lg:col-span-1">
                  <Card className={`sticky top-6 ${selectedRow ? '' : 'opacity-50'}`}>
                    <CardHeader>
                      <CardTitle className="text-base">Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedRow ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-4">
                            Record selected: {filteredReconciliationRecords.find(r => r.id === selectedRow)?.title}
                          </p>
                          <Button
                            onClick={() => handleViewReport(selectedRow)}
                            className="w-full"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </Button>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Select a record to view available actions
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}