import { useState } from "react";
import { ErrorContext } from "./ErrorContext";

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  return (
    <ErrorContext.Provider
      value={{
        error,
        // @ts-ignore
        setError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
