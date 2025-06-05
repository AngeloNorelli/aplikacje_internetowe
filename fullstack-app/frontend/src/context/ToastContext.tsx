import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

interface ToastContextType {
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage(null);
    } else if (successMessage) {
      toast.success(successMessage);
      setSuccessMessage(null);
    }
  }, [errorMessage, successMessage]);

  const contextValue = React.useMemo(
    () => ({ setErrorMessage, setSuccessMessage }),
    [setErrorMessage, setSuccessMessage],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
