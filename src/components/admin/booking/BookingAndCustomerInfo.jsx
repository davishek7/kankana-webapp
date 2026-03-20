function BookingAndCustomerInfo({ booking, setActiveModal }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Booking #{booking.booking_id}</h5>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setActiveModal("edit-customer")}
          >
            <i className="fa-solid fa-pen-to-square"></i> Edit
          </button>
        </div>

        <p>
          <strong>Booked On:</strong> {booking.created_at}
        </p>
        <p>
          <strong>Customer:</strong> {booking.customer_name}
        </p>
        <p>
          <strong>Address:</strong> {booking.customer_address}
        </p>
        <p>
          <strong>Phone:</strong> {booking.customer_phone_number}
        </p>
      </div>
    </div>
  );
}

export default BookingAndCustomerInfo;
