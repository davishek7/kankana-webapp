import React, { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";

export default function BookingDetails() {
  const booking = useLoaderData();
  const navigate = useNavigate();
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

  const handlePaymentChange = (e) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
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
    navigate(`/bookings/${booking.booking_id}`);
    document.getElementById("closePaymentModal").click();
    setNewPayment({
      amount: "",
      method: "Cash",
      payment_type: "Advance",
      date: "",
    });
  };

  const handleAddItem = async () => {
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
    navigate(`/bookings/${booking.booking_id}`);
    document.getElementById("closeItemModal").click();
    setNewItem({
      item_type: "HD",
      item_category: "Bridal",
      rate: "",
      date: "",
    });
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Booking Details</h2>
        <button
          className="btn btn-outline-primary mt-3 mx-3"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Booking #{booking.booking_id}</h5>
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
          data-bs-toggle="modal"
          data-bs-target="#itemModal"
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
          data-bs-toggle="modal"
          data-bs-target="#paymentModal"
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
      <div className="modal fade" id="paymentModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Payment</h5>
              <button
                id="closePaymentModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={newPayment.amount}
                    onChange={handlePaymentChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Method</label>
                  <select
                    name="method"
                    className="form-select"
                    value={newPayment.method}
                    onChange={handlePaymentChange}
                  >
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Card</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Payment Type</label>
                  <select
                    name="payment_type"
                    className="form-select"
                    value={newPayment.payment_type}
                    onChange={handlePaymentChange}
                  >
                    <option>Advance</option>
                    <option>Installment</option>
                    <option>Final</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={newPayment.date}
                    onChange={handlePaymentChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleAddPayment}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Item Modal */}
      <div className="modal fade" id="itemModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Service Item</h5>
              <button
                id="closeItemModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label className="form-label">Item Type</label>
                  <select
                    name="item_type"
                    className="form-select"
                    value={newItem.item_type}
                    onChange={handleItemChange}
                  >
                    <option>HD</option>
                    <option>NON-HD</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Category</label>
                  <select
                    name="item_category"
                    className="form-select"
                    value={newItem.item_category}
                    onChange={handleItemChange}
                  >
                    <option>Bridal</option>
                    <option>Reception</option>
                    <option>Haldi</option>
                    <option>Party</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Rate</label>
                  <input
                    type="number"
                    name="rate"
                    className="form-control"
                    value={newItem.rate}
                    onChange={handleItemChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={newItem.date}
                    onChange={handleItemChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddItem}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
