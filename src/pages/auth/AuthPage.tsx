import { LoginForm } from "@/features/auth/LoginForm";
import { AuthGuard } from "@/features/auth/AuthGuard";

export const AuthPage = () => {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-grey-100">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-h2 text-main mb-2">Construction Tasks</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};
