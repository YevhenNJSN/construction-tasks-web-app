import { Button } from "@/shared/ui";

interface DefaultErrorFallbackProps {
  error: Error;
  reset: () => void;
  level: "app" | "page" | "feature";
}

export const DefaultErrorFallback = ({
  error,
  reset,
  level,
}: DefaultErrorFallbackProps) => {
  const getLevelConfig = () => {
    switch (level) {
      case "app":
        return {
          title: "Application Error",
          description:
            "Something went wrong with the application. Please try reloading the page.",
          showReload: true,
        };
      case "page":
        return {
          title: "Page Error",
          description:
            "This page encountered an error. You can try again or go back.",
          showReload: false,
        };
      case "feature":
        return {
          title: "Something went wrong",
          description: "This feature encountered an error. Please try again.",
          showReload: false,
        };
    }
  };

  const config = getLevelConfig();

  return (
    <div
      className="flex items-center justify-center p-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 border border-red-200">
        <h2 className="text-h2 text-red-600 mb-2">{config.title}</h2>
        <p className="text-body text-grey-600 mb-4">{config.description}</p>

        {import.meta.env.MODE === "development" && (
          <details className="mb-4">
            <summary className="text-caption text-grey-500 cursor-pointer hover:text-grey-700">
              Error details (dev mode)
            </summary>
            <pre className="mt-2 p-2 bg-grey-100 rounded text-caption overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex gap-2">
          <Button onClick={reset} variant="contained" color="primary">
            Try Again
          </Button>
          {config.showReload && (
            <Button
              onClick={() => window.location.reload()}
              variant="outlined"
              color="primary"
            >
              Reload Page
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
