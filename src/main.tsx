import "./index.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import Index from "./routes/_index";
import ErrorPage from "./routes/error";

import PrismJS_AutoloaderPlus from "./routes/prismjs.autoloader-plus._index";
import PrismJS_Doxycpp from "./routes/prismjs.doxycpp._index";

import Fingerprint from "./routes/fingerprint._index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/prismjs",
        children: [
          {
            path: "autoloader-plus",
            element: <PrismJS_AutoloaderPlus />,
          },
          {
            path: "doxycpp",
            element: <PrismJS_Doxycpp />,
          },
        ],
      },
      {
        path: "/fingerprint",
        element: <Fingerprint />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
