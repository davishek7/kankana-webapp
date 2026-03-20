function ExpenseTable({ expenses, onEdit }) {
  return (
            <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Expense Type</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses?.length > 0 ? (
                expenses.map((expense, i) => (
                  <tr key={expense.id}>
                    <td>{i + 1}</td>
                    <td>{expense.display_date}</td>
                    <td>₹{expense.amount}</td>
                    <td>{expense.expense_type}</td>
                    <td>{expense.remarks}</td>
                    <td>
                      <button
                        onClick={() => onEdit(expense)}
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No expenses yet. Click "+ Add Expense" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  )
}

export default ExpenseTable