import { useState, useEffect } from "react";
import {
  Form,
  Link,
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
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="mb-0">Add Booking</h2>
        <Link to="/bookings" className="btn btn-outline-secondary btn-sm">
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>
      </div>

      <Form method="post" className="row g-3">
        {/* Customer */}
        <div className="col-12">
          <h5 className="mb-2">Customer Details</h5>
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
        <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Service Items</h5>
          <small className="text-muted fst-italic">
            Add all services before saving booking
          </small>
        </div>

        {/* Input row */}
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

        <div className="col-md-2">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={draft.date}
            onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
          />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button
            className="btn btn-primary w-100 fw-semibold"
            onClick={addItem}
            type="button"
          >
            + Add Item
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
                    <td
                      colSpan={6}
                      className="text-center text-muted fst-italic py-3"
                    >
                      No items added yet
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

          {/* Subtotal */}
          <div className="text-end">
            <small className="text-muted">
              Subtotal: ₹
              {items.reduce((sum, i) => sum + Number(i.rate || 0), 0)}
            </small>
          </div>
        </div>

        {/* Payment */}
        <div className="col-12 mt-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Payment</h5>
          <small className="text-muted fst-italic">
            Discount applies on total package
          </small>
        </div>

        <div className="col-md-2">
          <label className="form-label">Advance</label>
          <input
            name="advance"
            type="number"
            min="0"
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
            className="form-control"
            value={money.discount}
            onChange={(e) =>
              setMoney((m) => ({ ...m, discount: e.target.value }))
            }
          />
        </div>

        {/* Live total */}
        <div className="col-12 text-end">
          <div className="text-muted">
            Subtotal: ₹{items.reduce((s, i) => s + Number(i.rate || 0), 0)}
          </div>
          <div className="text-muted">Discount: -₹{money.discount || 0}</div>
          <div className="fw-semibold">
            Total: ₹
            {items.reduce((s, i) => s + Number(i.rate || 0), 0) -
              Number(money.discount || 0)}
          </div>
        </div>

        {/* Hidden */}
        <input
          type="hidden"
          name="items"
          value={JSON.stringify(items)}
          readOnly
        />

        {/* Submit */}
        <div className="col-12 d-flex justify-content-end gap-2 mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting ? "Saving..." : "Save Booking"}
          </button>

          <button
            type="reset"
            className="btn btn-outline-secondary"
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
    </>
  );
}
