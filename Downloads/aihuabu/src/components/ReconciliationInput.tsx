import { useState, useCallback } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Calendar as CalendarIcon, Upload, Plus, Target, TrendingUp, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

interface ActualDataPoint {
  date: string;
  actualValue: number;
  isOutOfRange?: boolean;
}

interface TaskInfo {
  title: string;
  predictedROI: number;
  confidenceScore: number;
  deadline: Date;
  analysisStartDate: Date;
  analysisEndDate: Date;
}

interface ReconciliationInputProps {
  appContext: any;
}

export function ReconciliationInput({ appContext }: ReconciliationInputProps) {
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualDate, setManualDate] = useState<Date | undefined>(undefined);
  const [manualValue, setManualValue] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [actualData, setActualData] = useState<ActualDataPoint[]>([
    { date: "2025-08-15", actualValue: 4.2, isOutOfRange: false },
    { date: "2025-08-20", actualValue: 4.5, isOutOfRange: false },
    { date: "2025-08-25", actualValue: 4.1, isOutOfRange: false },
    { date: "2025-07-10", actualValue: 3.8, isOutOfRange: true }, // Out of range
  ]);
  const [isDragging, setIsDragging] = useState(false);

  // Mock task info - in real app this would come from props or context
  const taskInfo: TaskInfo = {
    title: "Improve Mobile App Performance",
    predictedROI: 87,
    confidenceScore: 94,
    deadline: new Date("2025-10-15"),
    analysisStartDate: new Date("2025-08-01"),
    analysisEndDate: new Date("2025-09-30")
  };

  const isDateOutOfRange = (date: string) => {
    const checkDate = new Date(date);
    return checkDate < taskInfo.analysisStartDate || checkDate > taskInfo.analysisEndDate;
  };

  const getDaysUntilDeadline = () => {
    const now = new Date();
    const diffTime = taskInfo.deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCSVUpload = useCallback((file: File) => {
    // Mock CSV processing - in real app would parse actual CSV
    console.log("Processing CSV file:", file.name);
    
    // Mock additional data points
    const newData: ActualDataPoint[] = [
      { date: "2025-09-01", actualValue: 4.6, isOutOfRange: false },
      { date: "2025-09-05", actualValue: 4.3, isOutOfRange: false },
      { date: "2025-09-10", actualValue: 4.7, isOutOfRange: false },
      { date: "2025-10-01", actualValue: 4.1, isOutOfRange: true }, // Out of range
    ];
    
    setActualData(prev => [...prev, ...newData]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === "text/csv") {
      handleCSVUpload(files[0]);
    }
  }, [handleCSVUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleCSVUpload(files[0]);
    }
  };

  const handleManualAdd = () => {
    if (manualDate && manualValue) {
      const dateString = format(manualDate, "yyyy-MM-dd");
      const newDataPoint: ActualDataPoint = {
        date: dateString,
        actualValue: parseFloat(manualValue),
        isOutOfRange: isDateOutOfRange(dateString)
      };
      
      setActualData(prev => [...prev, newDataPoint]);
      setManualDate(undefined);
      setManualValue("");
    }
  };

  const handleStartReconciliation = () => {
    console.log("Starting reconciliation with data:", actualData);
    appContext.handleReconciliationSubmit(actualData);
  };

  const daysUntilDeadline = getDaysUntilDeadline();
  const outOfRangeCount = actualData.filter(d => d.isOutOfRange).length;

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="reconciliation-input"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-foreground mb-2">
              Reconciliation Input
            </h1>
            <p className="text-muted-foreground">
              Upload actual performance data to reconcile with predicted ROI and generate accuracy insights
            </p>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Left Panel - Task Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  <span>Task Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Task Title */}
                <div>
                  <Label className="text-sm text-muted-foreground">Action Card</Label>
                  <p className="font-medium text-foreground mt-1">
                    {taskInfo.title}
                  </p>
                </div>

                <Separator />

                {/* Predicted ROI */}
                <div className="space-y-3">
                  <Label className="text-sm text-muted-foreground">Predicted ROI</Label>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-medium text-green-600">
                        {taskInfo.predictedROI}%
                      </span>
                    </div>
                    <div className="text-sm text-green-700">
                      Confidence: {taskInfo.confidenceScore}%
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Deadline Countdown */}
                <div className="space-y-3">
                  <Label className="text-sm text-muted-foreground">Deadline</Label>
                  <div className={`rounded-lg p-4 ${
                    daysUntilDeadline <= 7 
                      ? "bg-red-50 border border-red-200" 
                      : daysUntilDeadline <= 14 
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-blue-50 border border-blue-200"
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className={`h-4 w-4 ${
                        daysUntilDeadline <= 7 ? "text-red-600" : 
                        daysUntilDeadline <= 14 ? "text-yellow-600" : "text-blue-600"
                      }`} />
                      <span className="font-medium">
                        {format(taskInfo.deadline, "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className={`text-lg font-medium ${
                      daysUntilDeadline <= 7 ? "text-red-600" : 
                      daysUntilDeadline <= 14 ? "text-yellow-600" : "text-blue-600"
                    }`}>
                      {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : "Overdue"}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Analysis Period */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Analysis Period</Label>
                  <div className="text-sm text-foreground">
                    <div>{format(taskInfo.analysisStartDate, "MMM d, yyyy")}</div>
                    <div className="text-muted-foreground">to</div>
                    <div>{format(taskInfo.analysisEndDate, "MMM d, yyyy")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Center Panel - Data Input */}
            <Card>
              <CardHeader>
                <CardTitle>Data Input</CardTitle>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isManualInput}
                    onCheckedChange={setIsManualInput}
                  />
                  <Label>Manual Input</Label>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isManualInput ? (
                  /* CSV Upload */
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">
                        Upload CSV File
                      </Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          isDragging 
                            ? "border-orange-500 bg-orange-50" 
                            : "border-muted-foreground/25 hover:border-muted-foreground/50"
                        }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                        <p className="text-foreground mb-2">
                          Drop CSV file here or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Required fields: date, actual_value
                        </p>
                        
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleFileInput}
                          className="hidden"
                          id="csv-upload"
                        />
                        <label htmlFor="csv-upload">
                          <Button variant="outline" className="cursor-pointer">
                            Select File
                          </Button>
                        </label>
                      </div>
                    </div>

                    {/* CSV Format Example */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <Label className="text-sm font-medium mb-2 block">Expected CSV Format:</Label>
                      <div className="bg-background rounded border text-sm font-mono">
                        <div className="p-2 border-b bg-muted/30">date,actual_value</div>
                        <div className="p-2 border-b">2025-09-01,4.2</div>
                        <div className="p-2">2025-09-05,4.5</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Manual Input */
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">
                        Date
                      </Label>
                      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {manualDate ? format(manualDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={manualDate}
                            onSelect={(date) => {
                              setManualDate(date);
                              setIsDatePickerOpen(false);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">
                        Actual Value
                      </Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Enter actual value"
                        value={manualValue}
                        onChange={(e) => setManualValue(e.target.value)}
                      />
                    </div>

                    <Button
                      onClick={handleManualAdd}
                      disabled={!manualDate || !manualValue}
                      className="w-full"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Data Point
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right Panel - Preview Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Actual Data Preview</span>
                  <Badge variant="outline">
                    {actualData.length} entries
                  </Badge>
                </CardTitle>
                {outOfRangeCount > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-yellow-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{outOfRangeCount} entries outside analysis period</span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {actualData.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {actualData.map((dataPoint, index) => (
                            <TableRow 
                              key={index}
                              className={dataPoint.isOutOfRange ? "bg-yellow-50" : ""}
                            >
                              <TableCell className="font-mono text-sm">
                                {format(new Date(dataPoint.date), "MMM d, yyyy")}
                              </TableCell>
                              <TableCell className="font-medium">
                                {dataPoint.actualValue.toFixed(1)}
                              </TableCell>
                              <TableCell>
                                {dataPoint.isOutOfRange ? (
                                  <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                                    Out of range
                                  </Badge>
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="h-8 w-8 mx-auto mb-2" />
                      <p>No data uploaded yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Start Reconciliation Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleStartReconciliation}
              disabled={actualData.length === 0}
              className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-3"
              size="lg"
            >
              Start Reconciliation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}