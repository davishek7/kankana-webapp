function PaymentStatus({ booking }) {
  return (
      <p className="fw-semibold mb-0">
        Payment Status:{" "}
        <span
          className={`badge px-2 py-1 ${
            booking.payment_status === "Fully Paid"
              ? "bg-success"
              : booking.payment_status === "Partially Paid"
                ? "bg-warning text-dark"
                : "bg-danger"
          }`}
        >
          {booking.payment_status}
        </span>
      </p>
  )
}

export default PaymentStatus