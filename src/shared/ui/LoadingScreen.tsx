import { Spinner } from "./Spinner";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({
  message = "Loading...",
}: LoadingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Spinner />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};
