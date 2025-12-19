import { useEffect } from "react";
import { useLoaderData, Form, useNavigate, useActionData } from "react-router-dom";
import { toast } from "react-toastify";

function ExpenseDetails() {
  const { expense, bookings } = useLoaderData();
  const actionData = useActionData()
  const navigate = useNavigate()

  useEffect(() => {
    if (actionData?.status !== 200){
      toast.error(actionData?.message)
      return
    }
    toast.success(actionData?.message)
    navigate(-1)
  }, [actionData, navigate])
  return (
    <div className="d-flex justify-content-center my-5">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "750px", width: "100%", borderRadius: "1rem" }}
      >
        <div className="d-flex justify-content-between">
          <h2 className="text-xl font-bold mb-3">
            Update Expense
          </h2>
          <button className="mb-3 btn btn-outline-info" onClick={() => navigate(-1)}>Back</button>
        </div>
        <Form method="post" className="rounded">
          <div className="mb-3">
            <label className="form-label">Expense Date</label>
            <input
              name="date"
              type="date"
              className="form-control"
              defaultValue={expense?.date}
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="booking_id" className="form-label">
              Booking
            </label> */}
            <input type="text" defaultValue={expense?.booking_id} className="form-control" name="booking_id" hidden/>
          {/* </div> */}
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              name="amount"
              type="number"
              min="0"
              step="1"
              className="form-control"
              defaultValue={expense?.amount}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Expense Type</label>
            <select
              name="expense_type"
              className="form-select"
              defaultValue={expense?.expense_type}
            >
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
              defaultValue={expense?.remarks}
            ></textarea>
          </div>
          <input type="hidden" name="id" value={expense.id} />

          <button type="submit" className="btn btn-outline-primary w-100">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}

export default ExpenseDetails;
