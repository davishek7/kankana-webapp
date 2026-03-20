import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import Modal from "../../ui/Modal";
import { toast } from "react-toastify";

function AddItemModal({ isOpen, onClose }) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data) return;

    const { status, message, intent } = fetcher.data;

    if (status >= 400) {
      toast.error(message);
      return;
    }

    toast.success(message);

    if (intent === "add-item") {
      onClose();
    }
  }, [fetcher.data, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      title="Add Service Item"
      onClose={onClose}
      closeOnBackdrop={false}
    >
      <fetcher.Form method="post">
        <input type="hidden" name="intent" value="add-item" />
        <div className="mb-2">
          <label className="form-label">Item Type</label>
          <select name="item_type" className="form-select">
            <option>HD</option>
            <option>NON-HD</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Category</label>
          <select name="item_category" className="form-select">
            <option>Bridal</option>
            <option>Reception</option>
            <option>Haldi</option>
            <option>Party</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Rate</label>
          <input type="number" name="rate" className="form-control" />
        </div>
        <div className="mb-2">
          <label className="form-label">Date</label>
          <input type="date" name="date" className="form-control" />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </fetcher.Form>
    </Modal>
  );
}

export default AddItemModal;
