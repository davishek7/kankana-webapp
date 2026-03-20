function BookingSummary({ booking }) {
  return (
    <div className="row mb-4">
      <div className="col-md-2">
        <strong>Total:</strong> ₹{booking.total_rate}
      </div>
      <div className="col-md-2">
        <strong>Discount:</strong> ₹{booking.discount}
      </div>
      <div className="col-md-2">
        <strong>Final:</strong> ₹{booking.final_amount}
      </div>
      <div className="col-md-2">
        <strong>Total Expenses:</strong> ₹{booking.total_expense}
      </div>
      <div className="col-md-2">
        <strong>Total Revenue:</strong> ₹{booking.total_revenue}
      </div>
      <div className="col-md-2">
        <strong>Dues:</strong> ₹{booking.due_amount}
      </div>
    </div>
  );
}

export default BookingSummary;
