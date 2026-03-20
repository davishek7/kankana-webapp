function PaymentTable({ payments}) {
  return (
      <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments?.map((pay, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{pay.date}</td>
                  <td>₹{pay.amount}</td>
                  <td>{pay.method}</td>
                  <td>{pay.payment_type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No payments yet. Click "+ Add Payment" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  )
}

export default PaymentTable