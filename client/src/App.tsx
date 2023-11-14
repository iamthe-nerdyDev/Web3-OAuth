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

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <Middleware>
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
          path="/card/:hash"
          element={
            <Middleware>
              <CardDetails />
            </Middleware>
          }
        />
        <Route
          path="/edit-card/:hash"
          element={
            <Middleware>
              <EditCard />
            </Middleware>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
