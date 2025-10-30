import { AppRouter } from "@/app/router/Router";
import { BrowserRouter } from "react-router";
import { DatabaseProvider } from "./app/providers/db/DatabaseProvider";
import { AuthProvider } from "./app/providers/auth/AuthProvider";
import { ErrorBoundary } from "@/shared/ui";

const App = () => {
  return (
    <ErrorBoundary level="app">
      <DatabaseProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </DatabaseProvider>
    </ErrorBoundary>
  );
};

export default App;
