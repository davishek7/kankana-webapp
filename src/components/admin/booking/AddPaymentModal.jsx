import React from 'react'

function AddPaymentModal({ onChange, onSubmit, newPayment }) {
  return (
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
                    onChange={onChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Method</label>
                  <select
                    name="method"
                    className="form-select"
                    value={newPayment.method}
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-success" onClick={onSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AddPaymentModal