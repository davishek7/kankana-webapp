function BookingSummary({ booking }) {
  return (
    <div className="row mb-4">
      <div className="col-md-2">
        <strong>Item Subtotal:</strong> ₹{booking.total_rate}
      </div>
      <div className="col-md-2">
        <strong>Package Discount:</strong> {booking.discount > 0 ? `- ₹${booking.discount}` : '₹0'}
      </div>
      <div className="col-md-2">
        <strong>Net Payable:</strong> ₹{booking.final_amount}
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
