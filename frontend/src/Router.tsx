import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Transact } from "./pages/Transact";
import { Blockchain } from "./pages/Blockchain";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/transact", element: <Transact /> },
      { path: "/blockchain", element: <Blockchain /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
