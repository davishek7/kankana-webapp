import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";

function CustomerEditModal({ isOpen, onClose, customer }) {
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data) return;

    const { status, message, intent } = fetcher.data;

    if (status >= 400) {
      toast.error(message);
      return;
    }

    toast.success(message);

    if (intent === "edit-customer") {
      onClose();
    }
  }, [fetcher.data, onClose]);
  return (
    <Modal
      isOpen={isOpen}
      title="Edit Customer Details"
      onClose={onClose}
      closeOnBackdrop={false}
    >
      <fetcher.Form method="post">
        <input type="hidden" name="intent" value="edit-customer" />
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            defaultValue={customer.name || ""}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            defaultValue={customer.address || ""}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            className="form-control"
            defaultValue={customer.phone_number || ""}
          />
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

export default CustomerEditModal;
