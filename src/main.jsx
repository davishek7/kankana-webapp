import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
import Invoice from "./routes/admin/Invoice.jsx";
import { bookingLoader } from "./loaders/booking.loader.js";
import Login from "./routes/auth/Login.jsx";
// import Register from "./routes/auth/Register.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import { loginAction } from "./actions/login.action.js";
// import { registerAction } from "./actions/register.action.js";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Bookings from "./routes/admin/Bookings.jsx";
import Gallery from "./routes/admin/Gallery.jsx";
import Contacts from "./routes/admin/Contacts.jsx";
import Dashboard from "./routes/admin/Dashboard.jsx";
import { statsLoader } from "./loaders/stats.loader.js";
import Profile from "./routes/admin/Profile.jsx";
import { bookingsLoader } from "./loaders/bookings.loader.js";
import { contactsLoader } from "./loaders/contacts.loader.js";
import { imagesLoader } from "./loaders/images.loader.js";
import NewImage from "./routes/admin/NewImage.jsx";
import { imageUploadAction } from "./actions/imageUpload.action.js";
import NewBooking from "./routes/admin/NewBooking.jsx";
import { newBookingAction } from "./actions/newBooking.action.js";
import BookingDetails from "./routes/admin/BookingDetails.jsx";
import ImageDetails from "./routes/admin/ImageDetails.jsx";
import { imageDetailsLoader } from "./loaders/imageDetails.loader.js";
import ContactDetails from "./routes/admin/ContactDetails.jsx";
import { contactDetailsLoader } from "./loaders/contactDetails.loader.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        loader: statsLoader,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "gallery",
        element: <Gallery />,
        loader: imagesLoader,
      },
      {
        path: "gallery/upload",
        element: <NewImage />,
        action: imageUploadAction,
      },
      {
        path: "gallery/:image_id",
        element: <ImageDetails />,
        loader: imageDetailsLoader,
      },
      {
        path: "bookings",
        element: <Bookings />,
        loader: bookingsLoader,
      },
      {
        path: "bookings/new",
        element: <NewBooking />,
        action: newBookingAction,
      },
      {
        path: "bookings/:booking_id",
        element: <BookingDetails />,
        loader: bookingLoader,
      },
      {
        path: "contacts",
        element: <Contacts />,
        loader: contactsLoader,
      },
      {
        path: "contacts/:contact_id",
        element: <ContactDetails />,
        loader: contactDetailsLoader,
      },
    ],
  },
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
  {
    path: "invoice/:booking_id",
    element: <Invoice />,
    loader: bookingLoader,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
  </StrictMode>
);
