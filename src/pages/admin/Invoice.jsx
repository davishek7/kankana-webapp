import { useRef, useState } from "react";
import { API_URL } from "../../constants/api.constants";
import iconImg from "../../assets/kankana.png";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";

function Invoice() {
  const booking = useLoaderData();
  const navigate = useNavigate();
  const invoiceRef = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(booking);

  let customerNameInCapital = data.customer_name
    .toUpperCase()
    .replace(/ /g, "-");
  const invoiceFileName = `${customerNameInCapital}-${data.booking_id}`;

  const handleGenerateAndUpload = async () => {
    try {
      const element = invoiceRef.current;
      const opt = {
        margin: 3,
        filename: `${invoiceFileName}.pdf`,
        image: { type: "png", quality: 0.8 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      };

      const pdfBlob = await html2pdf().set(opt).from(element).output("blob");

      const formData = new FormData();
      formData.append("file", pdfBlob, `${invoiceFileName}.pdf`);
      formData.append("booking_id", data.booking_id);

      const res = await apiFetch("invoice/upload-invoice", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const resData = await res.json();
      if (resData.status !== 201) {
        toast.error("Failed to upload invoice.");
        return;
      }
      toast.success("Invoice uploaded successfully.");
      setData(resData.data);
    } catch (err) {
      toast.error("Failed to upload invoice.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppShare = async () => {
    const invoice_download_url = `${window.location.origin}/api/download?key=${data.invoice_file}`;
    const message = `Thank you for your booking. Download your invoice (ID: ${data.booking_id}) here: ${invoice_download_url}`;
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+91${data.customer_phone_number}?text=${encodedMsg}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownload = async () => {
    const headers = {};
    const response = await apiFetch(
      `invoice/download-invoice/${data.booking_id}`,
      { headers }
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoiceFileName}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div
        ref={invoiceRef}
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
                <td>{item.date}</td>
                <td>{item.item_type}</td>
                <td>{item.item_category}</td>
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
            {data.payment_status !== "Fully Paid" && (
              <p className="fs-5 fw-bold text-danger mb-0">
                <strong>Net Payable:</strong> ₹{data.due_amount}
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="small text-muted mt-2">
          <strong>Disclaimer :</strong> Advance payments are non-refundable in
          case of cancellation. Rescheduling is permitted for the same booking
          or service items, subject to availability.
        </div>
      </div>

      {/* Print Button */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-outline-primary mt-3 mx-3"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <button
          onClick={handleDownload}
          className="btn btn-outline-primary mt-3 mx-3"
          disabled={!data.invoice_file}
        >
          <i className="fa-solid fa-download"></i> Download Invoice
        </button>
        <button
          onClick={handleGenerateAndUpload}
          className="btn btn-outline-info mt-3"
        >
          <i className="fa-solid fa-cloud-arrow-up"></i>{" "}
          {loading ? "Uploading..." : "Upload Latest Invoice"}
        </button>
        <button
          onClick={handleWhatsAppShare}
          className="btn btn-outline-success mt-3 mx-3"
          disabled={!data.invoice_file}
        >
          <i className="fa-brands fa-whatsapp"></i>{" "}
          {loading ? "Sending Invoice..." : "Send via WhatsApp"}
        </button>
      </div>
    </>
  );
}

export default Invoice;
