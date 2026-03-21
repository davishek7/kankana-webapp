import { Link } from "react-router-dom";

function ActionButtons({
  invoice,
  handleGenerateAndUpload,
  handleDownload,
  handleWhatsAppShare,
  loading,
}) {
  return (
    <div
      className="d-flex justify-content-between align-items-center my-3"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      {/* Left side → Navigation */}
      <Link className="btn btn-outline-secondary btn-sm" to="/invoices">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>

      {/* Right side → Actions */}
      <div className="d-flex gap-2">
        <button
          onClick={handleGenerateAndUpload}
          className="btn btn-outline-primary btn-sm"
        >
          <i className="fa-solid fa-cloud-arrow-up"></i>{" "}
          {loading ? "Uploading..." : "Upload Latest Invoice"}
        </button>

        <button
          onClick={handleDownload}
          className="btn btn-primary btn-sm"
          disabled={!invoice.invoice_file}
        >
          <i className="fa-solid fa-download"></i> Download
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="btn btn-success btn-sm"
          disabled={!invoice.invoice_file}
        >
          <i className="fa-brands fa-whatsapp"></i>{" "}
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ActionButtons;
