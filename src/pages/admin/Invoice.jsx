import { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import InvoiceInfo from "../../components/admin/invoice/InvoiceInfo";
import CustomerDetails from "../../components/admin/invoice/CustomerDetails";
import PaymentStatus from "../../components/admin/booking/PaymentStatus";
import ActionButtons from "../../components/admin/invoice/ActionButtons";
import InvoiceItems from "../../components/admin/invoice/tables/InvoiceItems";
import InvoicePayments from "../../components/admin/invoice/tables/InvoicePayments";
import AmountDetails from "../../components/admin/invoice/AmountDetails";
import Disclaimer from "../../components/admin/invoice/Disclaimer";
import InvoiceHeader from "../../components/admin/invoice/InvoiceHeader";


function Invoice() {
  const booking = useLoaderData();
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
    const response = await apiFetch(
      `invoice/download-invoice/${data.booking_id}`,
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
        {/* Invoice header */}
        <InvoiceHeader />

        {/* Invoice info */}
        <InvoiceInfo invoice={data} />

        {/* Invoice customer details */}
        <CustomerDetails invoice={data} />

        <h5 className="fw-semibold mb-2">Booking Items</h5>
        <InvoiceItems items={data.items} />

        {data.payments.length > 0 && (
          <>
            <h5 className="fw-semibold mb-2">Payment History</h5>
            <InvoicePayments payments={data.payments} />
          </>
        )}

        <div className="border-top pt-3 d-flex justify-content-between">
          {/* Left: Payment Status */}
          <PaymentStatus booking={data} />

          {/* Right: Amount Details */}
          <AmountDetails invoice={data} />
        </div>
        <hr />
        <Disclaimer />
      </div>

      {/* Action Buttons */}
      <ActionButtons
        invoice={data}
        handleGenerateAndUpload={handleGenerateAndUpload}
        handleDownload={handleDownload}
        handleWhatsAppShare={handleWhatsAppShare}
        loading={loading}
      />
    </>
  );
}

export default Invoice;
