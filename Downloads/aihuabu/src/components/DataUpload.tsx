import { useState, useCallback } from "react";
import { TopNavigation } from "./TopNavigation";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface UploadedData {
  fileName: string;
  rows: number;
  data: Array<Record<string, string>>;
  hasFeedbackColumn: boolean;
}

interface DataUploadProps {
  appContext: any;
}

export function DataUpload({ appContext }: DataUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mock data for preview
  const mockPreviewData = [
    { id: "1", feedback: "Great product, love the new features!", category: "Positive", date: "2025-09-01", rating: "5" },
    { id: "2", feedback: "The interface could be more intuitive", category: "UI/UX", date: "2025-09-01", rating: "3" },
    { id: "3", feedback: "Excellent customer service response time", category: "Support", date: "2025-08-31", rating: "5" },
    { id: "4", feedback: "Would like to see more integration options", category: "Feature Request", date: "2025-08-31", rating: "4" },
    { id: "5", feedback: "App crashes occasionally on mobile", category: "Bug Report", date: "2025-08-30", rating: "2" }
  ];

  const validateFile = (file: File): string | null => {
    // More flexible CSV file type checking
    const isCSV = file.type === "text/csv" || 
                  file.type === "application/csv" || 
                  file.type === "text/plain" ||
                  file.name.toLowerCase().endsWith('.csv');
    
    if (!isCSV) {
      return "Please upload a CSV file";
    }
    if (file.size > 50 * 1024 * 1024) { // 50MB
      return "File size must be less than 50MB";
    }
    return null;
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsUploading(false);
          
          // Simulate successful upload with mock data
          setUploadedData({
            fileName: file.name,
            rows: mockPreviewData.length,
            data: mockPreviewData,
            hasFeedbackColumn: true
          });
          
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
  };

  const handleFileSelect = useCallback((file: File) => {
    console.log('File selected:', file.name, file.type, file.size);
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    simulateUpload(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set isDragging to false if we're actually leaving the drop zone
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
    // Reset the input value so the same file can be selected again if needed
    e.target.value = '';
  };

  const handleReUpload = () => {
    console.log('Re-uploading file...');
    setUploadedData(null);
    setUploadProgress(0);
    setError(null);
    setIsUploading(false);
    setIsDragging(false);
  };

  const handleNextStep = () => {
    if (uploadedData && appContext.handleDataUpload) {
      console.log('Moving to next step with file:', uploadedData.fileName);
      // Create a mock file object for the uploaded data
      const file = new File([JSON.stringify(uploadedData.data)], uploadedData.fileName, { type: 'text/csv' });
      appContext.handleDataUpload(file);
    } else {
      console.error('No uploaded data or handleDataUpload function not available');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentPage="data-upload"
        onNavigate={appContext.navigateTo}
        onLogout={appContext.handleLogout}
        user={appContext.user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-foreground mb-2">
              Upload Data
            </h1>
            <p className="text-muted-foreground">
              Upload your CSV file containing customer feedback and data for analysis
            </p>
          </div>

          {/* Upload Area */}
          {!uploadedData && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload"
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer block ${
                    isDragging 
                      ? "border-primary bg-primary/5" 
                      : "border-muted-foreground/25 hover:border-muted-foreground/50"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                >
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg text-foreground mb-2">
                        Click or drag CSV file here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Maximum file size: 50MB • Maximum rows: 100,000
                      </p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="cursor-pointer pointer-events-none"
                      type="button"
                    >
                      Select File
                    </Button>
                  </div>
                </label>

                {error && (
                  <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center">
                    <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                    <span className="text-destructive">{error}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Uploading file...</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(uploadProgress)}% complete
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Success & Preview */}
          {uploadedData && (
            <>
              {/* Success Message */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-foreground font-medium">Upload successful!</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">File:</span>
                      <p className="text-foreground">{uploadedData.fileName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rows:</span>
                      <p className="text-foreground">{uploadedData.rows.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Feedback Column:</span>
                      <p className={uploadedData.hasFeedbackColumn ? "text-green-600" : "text-destructive"}>
                        {uploadedData.hasFeedbackColumn ? "✓ Found" : "✗ Missing"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Preview */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Data Preview</CardTitle>
                  <p className="text-muted-foreground">
                    Showing first 5 rows of your data. The "feedback" column is required for analysis.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(uploadedData.data[0] || {}).map((header) => (
                            <TableHead 
                              key={header}
                              className={header === "feedback" ? "bg-orange-50 font-medium text-orange-900" : ""}
                            >
                              {header}
                              {header === "feedback" && (
                                <span className="ml-2 text-orange-600">*</span>
                              )}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {uploadedData.data.map((row, index) => (
                          <TableRow key={index}>
                            {Object.entries(row).map(([key, value]) => (
                              <TableCell 
                                key={key}
                                className={key === "feedback" ? "bg-orange-50" : ""}
                              >
                                {value}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={handleReUpload}
                  className="px-8"
                >
                  Re-upload
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  Next Step
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}