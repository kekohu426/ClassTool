import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { OnboardingSteps } from "./OnboardingSteps";

interface LoginPageProps {
  onLogin: (provider: "slack" | "google") => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const handleSlackLogin = () => {
    console.log("Login with Slack clicked");
    onLogin("slack");
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google clicked");
    onLogin("google");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1570566920413-fd6410fec24c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGxvZ28lMjBzeW1ib2x8ZW58MXx8fHwxNzU2Nzk5Mjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Strategy Tool Logo"
              className="h-16 w-16 rounded-xl object-cover"
            />
          </div>
          <h1 className="text-2xl font-medium text-foreground mb-2">
            Strategy Insights
          </h1>
          <p className="text-muted-foreground">
            From feedback to ROI insights in minutes.
          </p>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleSlackLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0 h-12 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 10.12h2.52v2.522a2.528 2.528 0 0 1-2.52 2.523Zm0 0a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165v-6.734a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.52 2.523v6.734ZM8.835 18.942a2.528 2.528 0 0 1-2.52-2.523v-2.52h2.52a2.528 2.528 0 0 1 2.523 2.52 2.528 2.528 0 0 1-2.523 2.523Zm6.734 0a2.528 2.528 0 0 1-2.52-2.523V8.835a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.523 2.52v7.584a2.528 2.528 0 0 1-2.523 2.523ZM18.958 8.835a2.528 2.528 0 0 1 2.523-2.52A2.528 2.528 0 0 1 24 8.835a2.528 2.528 0 0 1-2.519 2.523h-2.523V8.835Zm0 6.734a2.528 2.528 0 0 1 2.523 2.52A2.528 2.528 0 0 1 18.958 24a2.528 2.528 0 0 1-2.52-2.523v-2.52h2.52ZM15.165 5.042a2.528 2.528 0 0 1 2.523-2.52A2.528 2.528 0 0 1 20.211 5.042a2.528 2.528 0 0 1-2.523 2.52h-2.523V5.042Zm-6.734 0a2.528 2.528 0 0 1 2.52-2.52A2.528 2.528 0 0 1 13.474 5.042V7.565a2.528 2.528 0 0 1-2.523 2.52 2.528 2.528 0 0 1-2.52-2.52V5.042Z"/>
            </svg>
            Login with Slack
          </Button>
          
          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 h-12 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login with Google
          </Button>
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="mt-16 w-full max-w-4xl">
        <OnboardingSteps />
      </div>
    </div>
  );
}