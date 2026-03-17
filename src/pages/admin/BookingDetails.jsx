import { useState } from "react";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import AddItemModal from "../../components/admin/booking/AddItemModal";
import AddPaymentModal from "../../components/admin/booking/AddPaymentModal";
import CustomerEditModal from "../../components/admin/booking/CustomerEditModal";


export default function BookingDetails() {
  const booking = useLoaderData();
  const revalidator = useRevalidator();

  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  const [newPayment, setNewPayment] = useState({
    amount: "",
    method: "UPI",
    payment_type: "Installment",
    date: "",
  });

  const [newItem, setNewItem] = useState({
    item_type: "HD",
    item_category: "Bridal",
    rate: "",
    date: "",
  });

  const [customer, setCustomer] = useState({
    name: booking.customer_name,
    address: booking.customer_address,
    phone_number: booking.customer_phone_number,
  });

  const handlePaymentChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleAddPayment = async () => {
    const res = await apiFetch(`booking/${booking.booking_id}/payment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPayment),
    });
    const resData = await res.json();
    if (resData.status !== 200) {
      toast.error(resData.message);
      return;
    }
    toast.success(resData.message);
    revalidator.revalidate();
    closeModal();
  };

  const handleAddItem = async (e) => {
    e.preventDefault()
    const res = await apiFetch(`booking/${booking.booking_id}/item`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    const resData = await res.json();
    if (resData.status !== 200) {
      toast.error(resData.message);
      return;
    }
    toast.success(resData.message);
    revalidator.revalidate();
    closeModal();
  };

  const handleEditCustomer = async () => {
    const res = await apiFetch(`booking/${booking.booking_id}/customer`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    const resData = await res.json();
    if (resData.status !== 200) {
      toast.error(resData.message);
      return;
    }
    toast.success(resData.message);
    revalidator.revalidate();
    closeModal();
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Booking Details</h2>
        <Link
          className="btn btn-outline-primary mt-3 mx-3"
          to="/bookings"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Booking #{booking.booking_id}</h5>

        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setActiveModal("edit-customer")}
        >
          <i className="fa-solid fa-pen-to-square"></i>
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

      {/* Summary */}
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

      {/* Items */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Service Items</h5>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setActiveModal("add-item")}
        >
          + Add Item
        </button>
      </div>
      <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.items ? (
              booking.items?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.item_type}</td>
                  <td>{item.item_category}</td>
                  <td>₹{item.rate}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>No Booking Items Added</p>
            )}
          </tbody>
        </table>
      </div>

      {/* Payments */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Payments</h5>
        <button
          className="btn btn-sm btn-success"
          onClick={() => setActiveModal("add-payment")}
        >
          + Add Payment
        </button>
      </div>
      <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.payments ? (
              booking.payments?.map((pay, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{pay.date}</td>
                  <td>₹{pay.amount}</td>
                  <td>{pay.method}</td>
                  <td>{pay.payment_type}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Expenses */}
      {booking.expenses.length > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5>Expenses</h5>
            {/* <Link className="btn btn-sm btn-primary" to="/expenses/new">
              + Add Expense
            </Link> */}
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Expense Type</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {booking.expenses?.map((expense, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{expense.display_date}</td>
                    <td>₹{expense.amount}</td>
                    <td>{expense.expense_type}</td>
                    <td>{expense.remarks}</td>
                    <td>
                      <Link
                        to={`/expenses/${expense.id}`}
                        className="btn btn-outline-success btn-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

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

      {/* Payment Modal */}
      {activeModal === "add-payment" && (
        <AddPaymentModal onChange={handlePaymentChange} onSubmit={handleAddPayment} newPayment={newPayment} />
      )}

      {/* Item Modal */}
      {activeModal === "add-item" && (
        <AddItemModal isOpen onClose={closeModal} onChange={handleItemChange} onSubmit={handleAddItem} newItem={newItem} />
      )}

      {/* Customer Modal */}
      {activeModal === "edit-customer" && (
        <CustomerEditModal onChange={handleCustomerChange} onSubmit={handleEditCustomer} customer={customer} />
      )}
    </div>
  );
}
