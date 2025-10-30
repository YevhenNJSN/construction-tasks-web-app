export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return fallback;
};

export const logError = (context: string, error: unknown): void => {
  if (import.meta.env.MODE === "development") {
    console.error(`[${context}]`, error);
  }
};

export const handleError = (
  context: string,
  error: unknown,
  fallbackMessage: string
): string => {
  logError(context, error);
  return getErrorMessage(error, fallbackMessage);
};
