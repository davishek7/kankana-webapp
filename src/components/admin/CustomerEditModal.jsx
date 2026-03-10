import React from 'react'

function CustomerEditModal({ onChange, onSubmit, customer }) {
  return (
      <div className="modal fade" id="customerModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Customer Details</h5>
              <button
                id="closeCustomerModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={customer.name}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={customer.address}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    className="form-control"
                    value={customer.phone_number}
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

export default CustomerEditModal