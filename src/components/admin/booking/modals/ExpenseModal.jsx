import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import Modal from "../../ui/Modal";
import { toast } from "react-toastify";

export default function ExpenseModal({ isOpen, onClose, expense }) {
  const fetcher = useFetcher();
  const isEdit = !!expense
  useEffect(() => {
    if (!fetcher.data) return;

    const { status, message, intent } = fetcher.data;

    if (status >= 400) {
      toast.error(message);
      return;
    }

    toast.success(message);

    if (intent === "add-expense" || intent === "edit-expense") {
      onClose();
    }
  }, [fetcher.data, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      title={isEdit ? "Edit Expense" : "Add Expense"}
      onClose={onClose}
      closeOnBackdrop={false}
    >
      <fetcher.Form method="post">
        <input type="hidden" name="intent" value={isEdit ? "edit-expense" : "add-expense"} />
        {expense && <input type="hidden" name="expense_id" value={expense.id} />}
        <div className="mb-3">
          <label className="form-label">Expense Date</label>
          <input name="date" type="date" className="form-control" defaultValue={expense?.date || ""}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            name="amount"
            type="number"
            min="0"
            step="1"
            className="form-control"
            defaultValue={expense?.amount || ""}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Expense Type</label>
          <select name="expense_type" className="form-select" defaultValue={expense?.expense_type || ""}>
            <option value="Helper Expense">Helper Expense</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Remarks</label>
          <textarea
            name="remarks"
            className="form-control"
            required
            minLength={2}
            defaultValue={expense?.remarks || ""}
          ></textarea>
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
