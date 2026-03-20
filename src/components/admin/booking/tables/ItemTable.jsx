function ItemTable({ items }) {
  return (
          <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.item_type}</td>
                  <td>{item.item_category}</td>
                  <td>₹{item.rate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No items added yet. Click "+ Add Item" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  )
}

export default ItemTable