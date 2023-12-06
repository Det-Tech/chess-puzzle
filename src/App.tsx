import { Snackbar } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Race from "./pages/Race/Race";
import RaceCreate from "./pages/RaceCreate/RaceCreate";
import Alert from "@material-ui/lab/Alert";
import { PuzzleProvider } from "./hooks/puzzle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SnackbarContextType = {
  show: (text: string) => void;
};

const SnackbarContext = React.createContext<null | SnackbarContextType>(null);

export const useSnackbar = () =>
  useContext(SnackbarContext) as SnackbarContextType;

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const showSnackBar = (text: string) => {
    setSnackbarText(text);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (reason: string) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  return (
    <PuzzleProvider>
      <SnackbarContext.Provider value={{ show: showSnackBar }}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={RaceCreate} />
            <Route path="/:raceId" exact component={Race} />
          </Switch>
        </BrowserRouter>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={500}
          onClose={(_, reason) => handleSnackbarClose(reason)}
        >
          <Alert onClose={() => handleSnackbarClose("other")} severity="success">
            {snackbarText}
          </Alert>
        </Snackbar>
      </SnackbarContext.Provider>
      <ToastContainer />
    </PuzzleProvider>
  );
}

export default App;
