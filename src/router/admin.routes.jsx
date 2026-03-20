import Gallery from "../pages/admin/Gallery.jsx";
import Invoice from "../pages/admin/Invoice.jsx";
import Profile from "../pages/admin/Profile.jsx";
import Bookings from "../pages/admin/Bookings.jsx";
import Contacts from "../pages/admin/Contacts.jsx";
import Expenses from "../pages/admin/Expenses.jsx";
import Invoices from "../pages/admin/Invoices.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import NewBooking from "../pages/admin/NewBooking.jsx";
import SearchPage from "../pages/admin/SearchPage.jsx";
import { statsLoader } from "../loaders/stats.loader.js";
import { imagesLoader } from "../loaders/images.loader.js";
import { searchLoader } from "../loaders/search.loader.js";
import ImageDetails from "../pages/admin/ImageDetails.jsx";
import { bookingLoader } from "../loaders/booking.loader.js";
import { invoiceLoader } from "../loaders/invoice.loader.js";
import { bookingsLoader } from "../loaders/bookings.loader.js";
import { contactsLoader } from "../loaders/contacts.loader.js";
import { expensesLoader } from "../loaders/expenses.loader.js";
import { invoicesLoader } from "../loaders/invoices.loader.js";
import BookingDetails from "../pages/admin/BookingDetails.jsx";
import ContactDetails from "../pages/admin/ContactDetails.jsx";
import { newBookingAction } from "../actions/newBooking.action.js";
import { imageUploadAction } from "../actions/imageUpload.action.js";
import { imageDetailsLoader } from "../loaders/imageDetails.loader.js";
import { contactDetailsLoader } from "../loaders/contactDetails.loader.js";
import { bookingDetailsAction } from "../actions/bookingDetails.action.js";

export default [
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
        action: imageUploadAction,
      },
      {
        path: "gallery/:imageId",
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
        path: "bookings/:bookingId",
        element: <BookingDetails />,
        loader: bookingLoader,
        action: bookingDetailsAction,
      },
      {
        path: "contacts",
        element: <Contacts />,
        loader: contactsLoader,
      },
      {
        path: "contacts/:contactId",
        element: <ContactDetails />,
        loader: contactDetailsLoader,
      },
      {
        path: "expenses",
        element: <Expenses />,
        loader: expensesLoader,
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: searchLoader,
      },
      {
        path: "invoices",
        element: <Invoices />,
        loader: invoicesLoader,
      },
      {
        path: "invoices/:bookingId",
        element: <Invoice />,
        loader: invoiceLoader,
      },
    ],
  },
];
