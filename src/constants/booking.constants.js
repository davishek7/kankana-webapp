export const BOOKING_COLUMNS = [
  // { header: "ID", accessorKey: "id" },
  { header: "Booking ID", accessorKey: "booking_id" },
  { header: "Customer Name", accessorKey: "customer_name" },
  { header: "Booked On", accessorKey: "created_at" },
  {header: "Payment Status", accessorKey: "payment_status"},
  {header: "Invoice", accessorKey: "invoice_url"},
];

export const BOOKING_ACTIONS = [
  {
    label: "View",
    className: "btn-outline-success",
  },
];