import { useEffect } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  Link
} from "react-router-dom";
import { toast } from "react-toastify";

function NewExpense() {
  const bookings = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.status !== 201) {
      toast.error(actionData?.message);
      return;
    }
    toast.success(actionData?.message);
    navigate("/expenses");
  }, [actionData, navigate]);
  return (
    <div className="d-flex justify-content-center my-5">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "750px", width: "100%", borderRadius: "1rem" }}
      >
        <div className="d-flex justify-content-between">
          <h2 className="text-xl font-bold mb-3">
            Add new Expense
          </h2>
          <button className="mb-3 btn btn-outline-info" onClick={() => navigate(-1)}>Back</button>
        </div>
        <Form method="post" className="rounded">
          <div className="mb-3">
            <label className="form-label">Expense Date</label>
            <input name="date" type="date" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="booking_id" className="form-label">
              Booking
            </label>
            <select
              className="form-select"
              id="booking_id"
              name="booking_id"
              required
            >
              {bookings?.map((booking) => (
                <option key={booking.booking_id} value={booking.booking_id}>
                  {booking.booking_id} - {booking.customer_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              name="amount"
              type="number"
              min="0"
              step="1"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Expense Type</label>
            <select name="expense_type" className="form-select">
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
            ></textarea>
          </div>

          <button type="submit" className="btn btn-outline-primary w-100">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}

export default NewExpense;
