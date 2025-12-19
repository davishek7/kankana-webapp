import Gallery from "../pages/admin/Gallery.jsx";
import Invoice from "../pages/admin/Invoice.jsx";
import Profile from "../pages/admin/Profile.jsx";
import Bookings from "../pages/admin/Bookings.jsx";
import Contacts from "../pages/admin/Contacts.jsx";
import Expenses from "../pages/admin/Expenses.jsx";
import Invoices from "../pages/admin/Invoices.jsx";
import NewImage from "../pages/admin/NewImage.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import NewBooking from "../pages/admin/NewBooking.jsx";
import NewExpense from "../pages/admin/NewExpense.jsx";
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
import ExpenseDetails from "../pages/admin/ExpenseDetails.jsx";
import { bookingIdLoader } from "../loaders/bookingId.loader.js";
import { newBookingAction } from "../actions/newBooking.action.js";
import { newExpenseAction } from "../actions/newExpense.action.js";
import { imageUploadAction } from "../actions/imageUpload.action.js";
import { imageDetailsLoader } from "../loaders/imageDetails.loader.js";
import { updateExpenseAction } from "../actions/updateExpense.action.js";
import { contactDetailsLoader } from "../loaders/contactDetails.loader.js";
import { expenseDetailsLoader } from "../loaders/expenseDetails.loader.js";

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
      {
        path: "expenses",
        element: <Expenses />,
        loader: expensesLoader,
      },
      {
        path: "expenses/new",
        element: <NewExpense />,
        loader: bookingIdLoader,
        action: newExpenseAction,
      },
      {
        path: "expenses/:id",
        element: <ExpenseDetails />,
        loader: expenseDetailsLoader,
        action: updateExpenseAction,
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
        path: "invoices/:booking_id",
        element: <Invoice />,
        loader: invoiceLoader,
      },
    ],
  },
];
