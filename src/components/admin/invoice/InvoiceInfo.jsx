function InvoiceInfo({ invoice }) {
  return (
    <div className="d-flex justify-content-between border-top pt-3 mb-4">
      <p className="mb-0">
        <strong>Booking ID:</strong> {invoice.booking_id}
      </p>
      <p className="mb-0">
        <strong>Invoice Date:</strong> {invoice.created_at}
      </p>
    </div>
  );
}

export default InvoiceInfo;
