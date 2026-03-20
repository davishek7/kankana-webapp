function PaymentStatus({ booking }) {
  return (
      <div className="mt-3">
        <strong>Status:</strong>{" "}
        <span
          className={`fs-6 badge px-2 py-1 ${
            booking.payment_status === "Fully Paid"
              ? "bg-success"
              : booking.payment_status === "Partially Paid"
                ? "bg-warning text-dark"
                : "bg-danger"
          }`}
        >
          {booking.payment_status}
        </span>
      </div>
  )
}

export default PaymentStatus