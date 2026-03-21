import { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiFetch } from "../../utils/api";
import AddItemModal from "../../components/admin/booking/modals/AddItemModal";
import AddPaymentModal from "../../components/admin/booking/modals/AddPaymentModal";
import CustomerEditModal from "../../components/admin/booking/modals/CustomerEditModal";
import ExpenseModal from "../../components/admin/booking/modals/ExpenseModal";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";
import PaymentTable from "../../components/admin/booking/tables/PaymentTable";
import ItemTable from "../../components/admin/booking/tables/ItemTable";
import BookingSummary from "../../components/admin/booking/BookingSummary";
import PaymentStatus from "../../components/admin/booking/PaymentStatus";
import BookingAndCustomerInfo from "../../components/admin/booking/BookingAndCustomerInfo";
import ExpenseTable from "../../components/admin/booking/tables/ExpenseTable";

export default function BookingDetails() {
  const booking = useLoaderData();
  const navigate = useNavigate();

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  const handleDelete = async () => {
    const response = await apiFetch(`booking/${booking.booking_id}/`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.status >= 400) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    navigate("/bookings");
    closeModal();
  };

  return (
    <div className="container my-4">
      {/* Booking Details */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Left: Title */}
        <h2 className="mb-0">Booking Details</h2>

        {/* Right: Buttons */}
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-primary btn-sm" to="/bookings">
            <i className="fa-solid fa-arrow-left me"></i> Back
          </Link>
          {["Unpaid", "Partially Paid"].includes(booking.payment_status) && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setActiveModal("delete")}
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          )}
        </div>
      </div>

      {/* Customer & Booking Info */}
      <BookingAndCustomerInfo
        booking={booking}
        setActiveModal={setActiveModal}
      />

      {/* Summary */}
      <BookingSummary booking={booking} />

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
      {/* Items Table */}
      <ItemTable items={booking.items} />

      {/* Payments */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Payments</h5>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setActiveModal("add-payment")}
        >
          + Add Payment
        </button>
      </div>
      {/* Payments Table */}
      <PaymentTable payments={booking.payments} />

      {/* Expenses */}
      <>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Expenses</h5>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setActiveModal("add-expense")}
          >
            + Add Expense
          </button>
        </div>
        {/* Expenses Table */}
        <ExpenseTable
          expenses={booking.expenses}
          onEdit={(expense) => {
            setSelectedExpense(expense);
            setActiveModal("edit-expense");
          }}
        />
      </>

      {/* Payment Status */}
      <PaymentStatus booking={booking} />

      {/* Payment Modal */}
      {activeModal === "add-payment" && (
        <AddPaymentModal isOpen onClose={closeModal} />
      )}

      {/* Item Modal */}
      {activeModal === "add-item" && (
        <AddItemModal isOpen onClose={closeModal} />
      )}

      {/* Customer Modal */}
      {activeModal === "edit-customer" && (
        <CustomerEditModal
          isOpen
          onClose={closeModal}
          customer={{
            name: booking.customer_name,
            address: booking.customer_address,
            phone_number: booking.customer_phone_number,
          }}
        />
      )}

      {/* Expense Modal */}
      {activeModal === "add-expense" && (
        <ExpenseModal isOpen onClose={closeModal} />
      )}

      {activeModal === "edit-expense" && (
        <ExpenseModal isOpen onClose={closeModal} expense={selectedExpense} />
      )}

      {activeModal === "delete" && (
        <DeleteConfirmationModal
          item="booking"
          isOpen
          onClose={closeModal}
          onSubmit={handleDelete}
        />
      )}
    </div>
  );
}
