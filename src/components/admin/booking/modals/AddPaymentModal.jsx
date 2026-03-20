import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";

function AddPaymentModal({ isOpen, onClose }) {
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data) return;

    const { status, message, intent } = fetcher.data;

    if (status >= 400) {
      toast.error(message);
      return;
    }

    toast.success(message);

    if (intent === "add-payment") {
      onClose();
    }
  }, [fetcher.data, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      title="Add Payment"
      onClose={onClose}
      closeOnBackdrop={false}
    >
      <fetcher.Form method="post">
        <input type="hidden" name="intent" value="add-payment" />
        <div className="mb-2">
          <label className="form-label">Amount</label>
          <input type="number" name="amount" className="form-control" />
        </div>
        <div className="mb-2">
          <label className="form-label">Method</label>
          <select name="method" className="form-select">
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Payment Type</label>
          <select name="payment_type" className="form-select">
            <option>Advance</option>
            <option>Installment</option>
            <option>Final</option>
          </select>
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

export default AddPaymentModal;
