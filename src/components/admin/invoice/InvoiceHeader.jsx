import { USER_DETAILS } from "../../../constants/user.constants";
import iconImg from "../../../assets/kankana.png";


function InvoiceHeader() {
  return (
    <div className="d-flex justify-content-between align-items-start mb-4">
      {/* Left: Business Details */}
      <div>
        <h1 className="display-4 fw-bold text-dark">Invoice</h1>
        <p className="h5 fw-semibold mt-2">{USER_DETAILS.name}</p>
        <p className="text-muted small mb-0">{USER_DETAILS.address}</p>
        <p className="text-muted small mb-0">{USER_DETAILS.phone}</p>
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
  );
}

export default InvoiceHeader;
