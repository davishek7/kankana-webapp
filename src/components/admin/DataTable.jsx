import { Link } from "react-router-dom";

function DataTable({
  columns,
  data,
  actions,
  page,
  totalPages,
  fetchPage,
  showPagination = false,
}) {
  return (
    <div className="table-responsive mt-3">
      <table className="table table-striped table-hover border-dark align-middle shadow">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col.accessorKey}>{col.header}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td
                    key={col.accessorKey}
                    className={
                      "read_status" in row && !row.read_status
                        ? "table-info"
                        : ""
                    }
                  >
                    {col.accessorKey === "is_active" ? (
                      row[col.accessorKey] ? (
                        "Active"
                      ) : (
                        "Inactive"
                      )
                    ) : col.accessorKey === "thumb_url" ? (
                      <img
                        src={row[col.accessorKey]}
                        alt="preview"
                        className="img-fluid"
                      />
                    ) : col.accessorKey === "invoice_file" ? (
                      row[col.accessorKey] ? (
                        <button
                          class="btn btn-success btn-sm d-inline-flex align-items-center"
                          disabled
                        >
                          <i class="fa-solid fa-check me-2"></i>
                          Uploaded
                        </button>
                      ) : (
                        <button
                          class="btn btn-danger btn-sm d-inline-flex align-items-center"
                          disabled
                        >
                          <i class="fa-solid fa-xmark me-2"></i>
                          Missing
                        </button>
                      )
                    ) : (
                      row[col.accessorKey]
                    )}
                  </td>
                ))}
                {actions && (
                  <td>
                    <div className="btn-group">
                      {actions.map((action, idx) => (
                        <Link
                          to={`${
                            location.pathname === "/bookings" ||
                            location.pathname === "/invoices"
                              ? row.booking_id
                              : row.id
                          }`}
                          key={idx}
                          className={`btn btn-sm ${action.className}`}
                        >
                          {action.label}
                        </Link>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showPagination && data.length > 0 && (
        <div
          className="mb"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem",
            gap: "1rem",
          }}
        >
          <button
            className="btn btn-sm btn-outline-dark"
            disabled={page === 1}
            onClick={() => fetchPage(page - 1)}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-outline-dark"
            disabled={page === totalPages}
            onClick={() => fetchPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
