import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface RecentTasksProps {
  onNavigate: (page: any) => void;
}

export function RecentTasks({ onNavigate }: RecentTasksProps) {
  const tasks = [
    {
      id: 1,
      title: "Customer Feedback Analysis Q3",
      date: "Sep 1, 2025",
      status: "completed" as const,
      action: "action-results"
    },
    {
      id: 2,
      title: "Market Research Synthesis",
      date: "Aug 28, 2025",
      status: "in-progress" as const,
      action: "analysis-progress"
    },
    {
      id: 3,
      title: "Product Feature Validation",
      date: "Aug 25, 2025",
      status: "pending" as const,
      action: "reconciliation-input"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "in-progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatStatus = (status: string) => {
    return status === "in-progress" ? "In Progress" : 
           status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => onNavigate(task.action)}
          >
            <div className="space-y-2">
              <h4 className="font-medium text-foreground leading-tight">
                {task.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {task.date}
                </span>
                <Badge 
                  variant="secondary"
                  className={getStatusColor(task.status)}
                >
                  {formatStatus(task.status)}
                </Badge>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <button 
            className="w-full text-sm text-primary hover:text-primary/80 transition-colors"
            onClick={() => onNavigate("history")}
          >
            View all tasks →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}