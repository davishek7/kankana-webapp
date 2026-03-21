function InvoiceItems({ items }) {
  return (
    <table className="table table-bordered table-sm mb-4">
      <thead className="table-light">
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th className="text-end">Rate (₹)</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <td>{item.date}</td>
            <td>{item.item_type}</td>
            <td>{item.item_category}</td>
            <td className="text-end">{item.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvoiceItems;
