import Modal from "../ui/Modal";

function AddItemModal({ isOpen, onClose, onChange, onSubmit, newItem }) {
  return (
    <Modal
      isOpen={isOpen}
      title="Add Service Item"
      onClose={onClose}
      closeOnBackdrop={false}
    >
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
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddItemModal;
