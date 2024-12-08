import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { QueryClient, QueryClientProvider } from "react-query";
import TaskPage from "./pages/edit";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "/home/",
        element: <Home />,
      },
      {
        path: "/home/tasks/:id",
        element: <TaskPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
