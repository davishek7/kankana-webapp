function AddItemModal({ onChange, onSubmit, newItem }) {
  return (
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={newItem.date}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" onClick={onSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AddItemModal