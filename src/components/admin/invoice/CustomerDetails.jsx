function CustomerDetails({ invoice}) {
  return (
    <div className="mb-4">
      <h5 className="fw-semibold mb-2">Customer Details</h5>
      <p className="mb-1">
        <strong>Name:</strong> {invoice.customer_name}
      </p>
      <p className="mb-1">
        <strong>Address:</strong> {invoice.customer_address}
      </p>
      <p className="mb-0">
        <strong>Phone:</strong> {invoice.customer_phone_number}
      </p>
    </div>
  );
}

export default CustomerDetails;
