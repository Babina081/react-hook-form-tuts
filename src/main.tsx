import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import YoutubeForm from "./components/YoutubeForm.tsx";
import Navbar from "./components/Navbar.tsx";
import YupIntegration from "./components/YupIntegration.tsx";
import ZodIntegration from "./components/ZodIntegration.tsx";
import MaterialUiIntegration from "./components/MaterialUiIntegration.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <YoutubeForm />,
  },
  {
    path: "/yup",
    element: <YupIntegration />,
  },
  {
    path: "/zod",
    element: <ZodIntegration />,
  },
  {
    path: "/mui",
    element: <MaterialUiIntegration />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar></Navbar>
    <RouterProvider router={router} />
  </StrictMode>
);
