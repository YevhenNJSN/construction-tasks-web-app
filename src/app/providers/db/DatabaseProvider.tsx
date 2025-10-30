import React, { useEffect, useState, type ReactNode } from "react";
import { LoadingScreen, Button } from "@/shared/ui";
import type { AppDatabase } from "@/shared/db/db.types";
import { DatabaseContext } from "./DatabaseContext";
import { getDatabase } from "@/shared/db/db.config";

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
}) => {
  const [database, setDatabase] = useState<AppDatabase | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initDB = async () => {
      setError(null);
      setDatabase(null);
      try {
        const database = await getDatabase();
        if (!database) {
          setError("Cannot get database instance");
        }
        setDatabase(database);
      } catch (err) {
        if (import.meta.env.MODE === "development") {
          console.error("Database initialization failed:", err);
        }
        setError(
          err instanceof Error ? err.message : "Failed to initialize database"
        );
      }
    };

    initDB();
  }, []);

  if (!database && !error) {
    return <LoadingScreen message="Initializing database..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Database Initialization Failed
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button
            className="w-full mx-0"
            onClick={() => window.location.reload()}
            color="primary"
            variant="contained"
          >
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DatabaseContext.Provider value={{ database }}>
      {children}
    </DatabaseContext.Provider>
  );
};
