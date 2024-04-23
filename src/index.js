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
import Cookies from "js-cookie";
const root = ReactDOM.createRoot(document.getElementById("root"));
const access_token = Cookies.get("access_token");
const router = createBrowserRouter([
  {
    path: "/",
    element: access_token ? <App /> : <Login />,
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
    element: access_token ? <Profile /> : <Login />,
  },
  {
    path: "/post/:postId",
    element: access_token ? <PostDetails /> : <Login />,
  },
  {
    path: "/chats",
    element: access_token ? <Chats /> : <Login />,
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
