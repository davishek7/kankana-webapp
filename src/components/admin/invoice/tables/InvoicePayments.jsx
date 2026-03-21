function InvoicePayments({ payments }) {
  return (
    <table className="table table-bordered table-sm mb-4">
      <thead className="table-light">
        <tr>
          <th>Date</th>
          <th>Payment Type</th>
          <th>Method</th>
          <th className="text-end">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment, i) => (
          <tr key={i}>
            <td>{payment.date}</td>
            <td>{payment.payment_type}</td>
            <td>{payment.method}</td>
            <td className="text-end">{payment.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvoicePayments;
