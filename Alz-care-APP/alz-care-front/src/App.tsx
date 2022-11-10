import React from "react";

import { Dashboard } from "./components/dashboard/Dashboard";

import "./App.scss";
import { SnackbarContextProvider } from "./contexts/SnackbarContext";

function App() {
  return (
    <SnackbarContextProvider>
      <div className="App">
        <Dashboard />
      </div>
    </SnackbarContextProvider>
  );
}

export default App;
