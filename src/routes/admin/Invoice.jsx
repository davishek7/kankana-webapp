import { useEffect } from "react";
import iconImg from "../../assets/kankana.png";
import { useLoaderData, Link } from "react-router-dom";

function Invoice() {
  const data = useLoaderData();

  const handlePrint = async () => {
    console.log("Printitng...");
    const invoiceDiv = document.getElementById("invoice").innerHTML;
    const originalPage = document.body.innerHTML;

    // Replace body with invoice div only
    document.body.innerHTML = invoiceDiv;

    // Trigger print dialog
    window.print();

    // Restore original page
    document.body.innerHTML = originalPage;
    window.location.reload(); // reload to restore event bindings
  };

  useEffect(() => {
    document.title = data.booking_id;
  }, [data]);

  return (
    <>
      <div
        className="mt-4 border mx-auto bg-white shadow p-4 rounded"
        id="invoice"
        style={{ maxWidth: "800px" }}
      >
        <div className="d-flex justify-content-between align-items-start mb-4">
          {/* Left: Business Details */}
          <div>
            <h1 className="display-4 fw-bold text-dark">Invoice</h1>
            <p className="h5 fw-semibold mt-2">Kankana's Makeover</p>
            <p className="text-muted small mb-0">Mejia, Bankura, West Bengal</p>
            <p className="text-muted small mb-0">+91 8016127841</p>
          </div>

          {/* Right: Logo */}
          <div>
            <img
              src={iconImg}
              alt="logo"
              style={{ height: "120px", width: "120px" }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between border-top pt-3 mb-4">
          <p className="mb-0">
            <strong>Booking ID:</strong> {data.booking_id}
          </p>
          <p className="mb-0">
            <strong>Invoice Date:</strong> {data.created_at}
          </p>
        </div>

        <div className="mb-4">
          <h5 className="fw-semibold mb-2">Customer Details</h5>
          <p className="mb-1">
            <strong>Name:</strong> {data.customer_name}
          </p>
          <p className="mb-1">
            <strong>Address:</strong> {data.customer_address}
          </p>
          <p className="mb-0">
            <strong>Phone:</strong> {data.customer_phone_number}
          </p>
        </div>

        <h5 className="fw-semibold mb-2">Booking Items</h5>
        <table className="table table-bordered table-sm mb-4">
          <thead className="table-light">
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
              <th className="text-end">Rate (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={i}>
                <td>{item.item_type}</td>
                <td>{item.item_category}</td>
                <td>{item.date}</td>
                <td className="text-end">{item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.payments.length > 0 && (
          <>
            <h5 className="fw-semibold mb-2">Payment History</h5>
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
                {data.payments.map((payment, i) => (
                  <tr key={i}>
                    <td>{payment.date}</td>
                    <td>{payment.payment_type}</td>
                    <td>{payment.method}</td>
                    <td className="text-end">{payment.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="border-top pt-3 d-flex justify-content-between">
          {/* Left: Payment Status */}
          <div>
            <p className="fw-semibold mb-0">
              Payment Status:{" "}
              <span
                className={`badge px-2 py-1 ${
                  data.payment_status === "Fully Paid"
                    ? "bg-success"
                    : data.payment_status === "Partially Paid"
                    ? "bg-warning text-dark"
                    : "bg-danger"
                }`}
              >
                {data.payment_status}
              </span>
            </p>
          </div>

          {/* Right: Amount Details */}
          <div className="text-end">
            <p className="mb-1">
              <strong>Total Rate:</strong> ₹{data.total_rate}
            </p>
            <p className="mb-1">
              <strong>Discount:</strong> ₹{data.discount}
            </p>
            <p className="mb-1">
              <strong>Final Rate:</strong> ₹{data.final_amount}
            </p>
            <p className="mb-1">
              <strong>Advance:</strong> ₹{data.advance}
            </p>
            <p className="mb-1">
              <strong>Paid (incl. advance):</strong> ₹{data.paid_amount}
            </p>
            <p className="fs-5 fw-bold text-danger mb-0">
              <strong>Net Payable:</strong> ₹{data.due_amount}
            </p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="d-flex justify-content-center mb-4">
        <Link className="btn btn-outline-primary mt-3 mx-3" to={`/admin/bookings/${data.booking_id}`}>Go Back</Link>
        <button onClick={handlePrint} className="btn btn-primary mt-3">
          Print Invoice
        </button>
      </div>
      {/* Print-specific CSS */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              -webkit-print-color-adjust: exact;
              margin: 20px;
            }
            table, th, td {
              border: 1px solid black;
            }
          }
        `}
      </style>
    </>
  );
}

export default Invoice;
