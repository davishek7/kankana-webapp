import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/auth/Login.jsx";
import { loginAction } from "../actions/login.action.js";
// import Register from "../pages/auth/Register.jsx";
// import { registerAction } from "../actions/register.action.js";

export default [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      // {
      //   path: "register",
      //   element: <Register />,
      //   action: registerAction,
      // },
    ],
  },
];
