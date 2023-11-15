import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Home,
  Dashboard,
  CardDetails,
  AddCard,
  EditCard,
  NotFound,
} from "./pages";

import { Middleware } from "./components";

import { useContext } from "react";
import StateContext from "./utils/context/StateContext";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";

const App = () => {
  const { theme } = useContext(StateContext)!;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <Middleware ignore={true}>
                <NotFound />
              </Middleware>
            }
          />
          <Route
            path="/"
            element={
              <Middleware>
                <Home />
              </Middleware>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Middleware>
                <Dashboard />
              </Middleware>
            }
          />
          <Route
            path="/create-card"
            element={
              <Middleware>
                <AddCard />
              </Middleware>
            }
          />
          <Route
            path="/card/:cardId/:index"
            element={
              <Middleware>
                <CardDetails />
              </Middleware>
            }
          />
          <Route
            path="/edit-card/:cardId"
            element={
              <Middleware>
                <EditCard />
              </Middleware>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
