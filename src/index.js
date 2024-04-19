import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import { Provider } from "react-redux";
import ResetPassword from "./Pages/ResetPassword";
import store, { persistor } from "./Redux/Store";
import Profile from "./Pages/Profile";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import PostDetails from "./Pages/PostDetails";
import Chats from "./Pages/Chats";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:email",
    element: <ResetPassword />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/post/:postId",
    element: <PostDetails />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
