import { useState, useEffect } from "react";
import {
  Form,
  useNavigation,
  useNavigate,
  useActionData,
} from "react-router-dom";
import { toast } from "react-toastify";

export default function NewBooking() {
  const nav = useNavigation();
  const navigate = useNavigate();
  const actionData = useActionData();
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState({
    item_type: "HD",
    item_category: "Bridal",
    rate: "",
    date: "",
  });

  const [money, setMoney] = useState({ advance: "0", discount: "0" });

  const addItem = (e) => {
    e.preventDefault();
    if (!draft.rate || !draft.date) return;
    setItems((prev) => [...prev, { ...draft, id: crypto.randomUUID() }]);
    setDraft({
      item_type: draft.item_type,
      item_category: draft.item_category,
      rate: "",
      date: "",
    });
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const isSubmitting = nav.state === "submitting";

  useEffect(() => {
    if (!actionData) return;

    if (actionData.status >= 400) {
      toast.error(actionData.message);
      return;
    }

    toast.success(actionData.message);

    navigate("/bookings");
  }, [actionData]);

  return (
    <div className="container my-4">
      <h2 className="mb-3">Add Booking</h2>

      <Form method="post" className="row g-3">
        {/* Customer */}
        <div className="col-12">
          <h5 className="mb-2">Customer</h5>
        </div>
        <div className="col-md-4">
          <label className="form-label">Name</label>
          <input
            name="customer_name"
            className="form-control"
            required
            minLength={2}
          />
        </div>
        <div className="col-md-5">
          <label className="form-label">Address</label>
          <input name="customer_address" className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Phone</label>
          <input
            name="customer_phone"
            className="form-control"
            required
            inputMode="numeric"
            pattern="^[0-9]{10}$"
            placeholder="10-digit"
          />
        </div>

        {/* Items */}
        <div className="col-12 mt-4">
          <h5 className="mb-2">Service Items</h5>
        </div>
        <div className="col-md-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={draft.item_type}
            onChange={(e) =>
              setDraft((d) => ({ ...d, item_type: e.target.value }))
            }
          >
            <option value="HD">HD</option>
            <option value="NON-HD">Non-HD</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={draft.item_category}
            onChange={(e) =>
              setDraft((d) => ({ ...d, item_category: e.target.value }))
            }
          >
            <option value="Bridal">Bridal</option>
            <option value="Reception">Reception</option>
            <option value="Haldi">Haldi</option>
            <option value="Party">Party</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Rate (₹)</label>
          <input
            type="number"
            className="form-control"
            min="0"
            value={draft.rate}
            onChange={(e) => setDraft((d) => ({ ...d, rate: e.target.value }))}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={draft.date}
            onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
          />
        </div>
        <div className="col-md-1 d-flex align-items-end">
          <button
            className="btn btn-primary w-100"
            onClick={addItem}
            type="button"
          >
            Add
          </button>
        </div>

        {/* Items table */}
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Rate</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      No items added
                    </td>
                  </tr>
                ) : (
                  items.map((it, idx) => (
                    <tr key={it.id}>
                      <td>{idx + 1}</td>
                      <td>{it.item_type}</td>
                      <td>{it.item_category}</td>
                      <td>₹{it.rate}</td>
                      <td>{it.date}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeItem(it.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Money */}
        <div className="col-12 mt-3">
          <h5 className="mb-2">Payment</h5>
        </div>
        <div className="col-md-2">
          <label className="form-label">Advance</label>
          <input
            name="advance"
            type="number"
            min="0"
            step="1"
            className="form-control"
            value={money.advance}
            onChange={(e) =>
              setMoney((m) => ({ ...m, advance: e.target.value }))
            }
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Advance Date</label>
          <input name="advance_date" type="date" className="form-control" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Discount</label>
          <input
            name="discount"
            type="number"
            min="0"
            step="1"
            className="form-control"
            value={money.discount}
            onChange={(e) =>
              setMoney((m) => ({ ...m, discount: e.target.value }))
            }
          />
        </div>

        {/* Hidden payloads */}
        <input
          type="hidden"
          name="items"
          value={JSON.stringify(items)}
          readOnly
        />

        {/* Submit */}
        <div className="col-12 d-flex gap-2">
          <button
            type="submit"
            className="btn btn-success"
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting ? "Saving..." : "Save Booking"}
          </button>
          <button
            type="reset"
            className="btn btn-secondary"
            onClick={() => {
              setItems([]);
              setDraft({
                item_type: "HD",
                item_category: "Bridal",
                rate: "",
                date: "",
              });
              setMoney({ advance: "0", discount: "0" });
            }}
          >
            Reset
          </button>
        </div>
      </Form>
    </div>
  );
}
