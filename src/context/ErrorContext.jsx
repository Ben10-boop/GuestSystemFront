import { createContext } from "react";

export const ErrorContext = createContext({
  error: null,
  setError: (error) => {},
});
