import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav sb-sidenav-dark">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-gauge-high"></i>
              </div>
              Dashboard
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/gallery" ? "active" : ""
              }`}
              to="/gallery"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-images"></i>
              </div>
              Gallery
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/bookings" ? "active" : ""
              }`}
              to="/bookings"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              Bookings
            </Link>
            <Link
              className={`nav-link ${
                location.pathname === "/contacts" ? "active" : ""
              }`}
              to="/contacts"
            >
              <div className="sb-nav-link-icon">
                <i className="fa-solid fa-address-card"></i>
              </div>
              Contacts
            </Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          <i className="fa-solid fa-user"></i> {user?.username}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
