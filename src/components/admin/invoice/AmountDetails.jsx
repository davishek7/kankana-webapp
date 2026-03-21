function AmountDetails({ invoice}) {
  return (
    <div className="text-end">
      <p className="mb-1">
        <strong>Subtotal:</strong> ₹{invoice.total_rate}
      </p>
      <p className="mb-1">
        <strong>Discount:</strong> ₹{invoice.discount}
      </p>
      <p className="mb-1">
        <strong>Total Amount:</strong> ₹{invoice.final_amount}
      </p>
      <p className="mb-1">
        <strong>Advance Paid:</strong> ₹{invoice.advance}
      </p>
      <p className="mb-1">
        <strong>Total Paid:</strong> ₹{invoice.paid_amount}
      </p>
      {invoice.payment_status !== "Fully Paid" && (
        <p className="fs-5 fw-bold text-danger mb-0">
          <strong>Balance Due:</strong> ₹{invoice.due_amount}
        </p>
      )}
    </div>
  );
}

export default AmountDetails;
