import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";
import { Button } from "@/shared/ui";

const Page404 = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-orange-100 mb-6">
            <svg
              className="h-10 w-10 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 mb-8 max-w-sm mx-auto">
            Looks like this page is under construction or has been moved to a
            different location.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              component={Link}
              to={ROUTES.PLAN}
              color="warning"
              variant="contained"
              className="inline-flex items-center text-sm shadow-sm"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={() => window.history.back()}
          variant="outlined"
          color="warning"
          className="font-medium"
        >
          Go back to the previous page
        </Button>
      </div>
    </div>
  );
};

export default Page404;
