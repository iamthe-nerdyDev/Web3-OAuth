import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, NotFound, User, Welcome } from "./components";

import "./style.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout children={<Welcome />} />,
      errorElement: <NotFound />,
    },
    {
      path: "/user/:address",
      element: <Layout children={<User />} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
