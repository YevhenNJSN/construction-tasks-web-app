import type { AppDatabase } from "@/shared/db/db.types";
import { createContext } from "react";

export interface DatabaseContextType {
  database: AppDatabase | null;
}

export const DatabaseContext = createContext<DatabaseContextType | null>(null);
