import React, { createContext, useCallback, useEffect, useState } from "react";
import { Snackbar, SnackbarInfo } from "../components/base/Snackbar";

interface snackbarContext {
  showSnackbar: (snackbar: SnackbarInfo) => void;
}

const defaultContext: snackbarContext = {
  showSnackbar: () => void 0,
};

export const SnackbarContext = createContext<snackbarContext>(defaultContext);

export const SnackbarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarInfo | null>(null);
  const durationAlert = 6;
  const durationSnackbar = durationAlert * 1000 + 500;

  const hideSnackbar = useCallback((): void => {
    setSnackbar(null);
  }, [setSnackbar]);

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        hideSnackbar();
      }, durationSnackbar);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [durationSnackbar, hideSnackbar, snackbar]);

  const showSnackbar = useCallback(
    (snackbar: SnackbarInfo): void => {
      setSnackbar(snackbar);
    },
    [setSnackbar]
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <div className="d-flex justify-content-center fixed-bottom ">
          <Snackbar
            titleMessage={snackbar.titleMessage}
            message={snackbar.message}
            duration={durationAlert}
          />
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
