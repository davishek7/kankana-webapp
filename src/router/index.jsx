import { createBrowserRouter } from "react-router-dom";
import AdminRoutes from "./admin.routes";
import AuthRoutes from "./auth.routes";


export const router = createBrowserRouter([
    ...AdminRoutes,
    ...AuthRoutes
])