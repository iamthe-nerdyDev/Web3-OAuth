import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Middleware children={<Home />} />,
      errorElement: <Middleware ignore children={<NotFound />} />,
    },
    {
      path: "/dashboard",
      element: <Middleware children={<Dashboard />} />,
    },
    {
      path: "/create-card",
      element: <Middleware children={<AddCard />} />,
    },
    {
      path: "/card/:cardId/:index",
      element: <Middleware children={<CardDetails />} />,
    },
    {
      path: "/edit-card/:cardId",
      element: <Middleware children={<EditCard />} />,
    },
  ]);

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
      <RouterProvider router={router} />
    </>
  );
};

export default App;
