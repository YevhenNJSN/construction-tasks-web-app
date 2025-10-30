import { useContext } from "react";
import { DatabaseContext } from "./DatabaseContext";

export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabaseContext must be used within DatabaseProvider");
  }
  return context;
};
