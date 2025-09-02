import { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { DataUpload } from "./components/DataUpload";
import { GoalSelection } from "./components/GoalSelection";
import { AnalysisProgress } from "./components/AnalysisProgress";
import { ActionCardResults } from "./components/ActionCardResults";
import { ReconciliationInput } from "./components/ReconciliationInput";
import { ReconciliationReport } from "./components/ReconciliationReport";
import { HistoryRecords } from "./components/HistoryRecords";
import { QuarterlyReview } from "./components/QuarterlyReview";
import { TeamSettings } from "./components/TeamSettings";
import { SlackConfig } from "./components/SlackConfig";
import { JiraConfig } from "./components/JiraConfig";
import { NotionConfig } from "./components/NotionConfig";

export type PageType = 
  | "login"
  | "dashboard" 
  | "data-upload"
  | "goal-selection"
  | "analysis-progress"
  | "action-results"
  | "reconciliation-input"
  | "reconciliation-report"
  | "history"
  | "quarterly-review"
  | "team-settings"
  | "slack-config"
  | "jira-config"
  | "notion-config";

export interface AnalysisData {
  uploadedFile?: File;
  goals?: string[];
  results?: any;
  analysisId?: string;
}

export interface ReconciliationData {
  actualData?: any;
  reportGenerated?: boolean;
  reportId?: string;
}

export interface AppState {
  currentPage: PageType;
  isAuthenticated: boolean;
  analysisData: AnalysisData;
  reconciliationData: ReconciliationData;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: "login",
    isAuthenticated: false,
    analysisData: {},
    reconciliationData: {},
    user: {
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "SC"
    }
  });

  // Navigation function
  const navigateTo = (page: PageType, data?: Partial<AppState>) => {
    setAppState(prev => ({
      ...prev,
      currentPage: page,
      ...data
    }));
  };

  // Handle login
  const handleLogin = (provider: "slack" | "google") => {
    // Simulate login process
    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        isAuthenticated: true,
        currentPage: "dashboard"
      }));
    }, 1000);
  };

  // Handle logout
  const handleLogout = () => {
    setAppState(prev => ({
      ...prev,
      isAuthenticated: false,
      currentPage: "login",
      analysisData: {},
      reconciliationData: {}
    }));
  };

  // Analysis workflow handlers
  const handleDataUpload = (file: File) => {
    setAppState(prev => ({
      ...prev,
      analysisData: { ...prev.analysisData, uploadedFile: file },
      currentPage: "goal-selection"
    }));
  };

  const handleGoalSelection = (goals: string[]) => {
    setAppState(prev => ({
      ...prev,
      analysisData: { ...prev.analysisData, goals },
      currentPage: "analysis-progress"
    }));
  };

  const handleAnalysisComplete = (results: any, analysisId: string) => {
    setAppState(prev => ({
      ...prev,
      analysisData: { 
        ...prev.analysisData, 
        results, 
        analysisId 
      },
      currentPage: "action-results"
    }));
  };

  // Reconciliation workflow handlers
  const handleReconciliationSubmit = (actualData: any) => {
    setAppState(prev => ({
      ...prev,
      reconciliationData: { 
        ...prev.reconciliationData, 
        actualData,
        reportGenerated: true,
        reportId: `recon-${Date.now()}`
      },
      currentPage: "reconciliation-report"
    }));
  };

  // App context for child components
  const appContext = {
    ...appState,
    navigateTo,
    handleLogin,
    handleLogout,
    handleDataUpload,
    handleGoalSelection,
    handleAnalysisComplete,
    handleReconciliationSubmit
  };

  // Render current page
  const renderCurrentPage = () => {
    if (!appState.isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (appState.currentPage) {
      case "dashboard":
        return <Dashboard appContext={appContext} />;
      case "data-upload":
        return <DataUpload appContext={appContext} />;
      case "goal-selection":
        return <GoalSelection appContext={appContext} />;
      case "analysis-progress":
        return <AnalysisProgress appContext={appContext} />;
      case "action-results":
        return <ActionCardResults appContext={appContext} />;
      case "reconciliation-input":
        return <ReconciliationInput appContext={appContext} />;
      case "reconciliation-report":
        return <ReconciliationReport appContext={appContext} />;
      case "history":
        return <HistoryRecords appContext={appContext} />;
      case "quarterly-review":
        return <QuarterlyReview appContext={appContext} />;
      case "team-settings":
        return <TeamSettings appContext={appContext} />;
      case "slack-config":
        return <SlackConfig appContext={appContext} />;
      case "jira-config":
        return <JiraConfig appContext={appContext} />;
      case "notion-config":
        return <NotionConfig appContext={appContext} />;
      default:
        return <Dashboard appContext={appContext} />;
    }
  };

  return renderCurrentPage();
}