import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/reset.css";
import "./styles/index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import ChatPage from "./pages/ChatPage";
import Layout from "./components/Layout";
import LoadingPage from "./pages/LoadingPage";
import StoryPage from "./pages/StoryPage";
import DrawingPage from "./pages/DrawingPage";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/loading",
        element: <LoadingPage />,
      },
      {
        path: "/create-story",
        element: <StoryPage />,
      },
      {
        path: "/drawing",
        element: <DrawingPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
