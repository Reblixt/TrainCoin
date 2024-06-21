import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import { Login } from "./pages/Login";
import { Transact } from "./pages/Transact";
import { Blockchain } from "./pages/Blockchain";
import ErrorPage from "./pages/ErrorPage";
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Blockchain /> },
      { path: "/transact", element: <Transact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
