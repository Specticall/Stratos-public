import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Gallery from "./page/Gallery";
import Settings from "./page/Settings";
import AppLayout from "./components/AppLayout";
import UserProfileSettings from "./components/settings/UserProfileSettings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextPool from "./components/ContextPool";
import Login from "./page/Login";
import Register from "./page/Register";
import Protect from "./components/general/Protect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContextPool />,
    children: [
      {
        path: "/app",
        element: (
          <Protect>
            <AppLayout />
          </Protect>
        ),
        children: [
          {
            path: "gallery",
            element: <Gallery />,
          },
          {
            path: "settings",
            element: <Settings />,
            children: [
              {
                path: "user-profile",
                element: <UserProfileSettings />,
              },
              {
                path: "account",
                element: <div></div>,
              },
              {
                path: "payment",
                element: <div></div>,
              },
              {
                path: "display",
                element: <div></div>,
              },
              {
                path: "notification",
                element: <div></div>,
              },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}
