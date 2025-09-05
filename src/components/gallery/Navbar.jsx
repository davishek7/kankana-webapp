import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import iconImg from "../../assets/kankana.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="fs-3 me-2">
              <img
                src={iconImg}
                alt="logo"
                style={{width: "48px", height: "48px"}}
              />
          </span>
          <span className="fw-bold">Kankana's Makeover</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <HashLink smooth className="nav-link" to="/#portfolio">
                  Portfolio
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink smooth className="nav-link" to="/#about">
                  About
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink smooth className="nav-link" to="/#contact">
                  Contact
                </HashLink>
              </li>
            </ul>

          <Link
            to="https://wa.me/8016127841?text=Hi%20I'd%20like%20to%20inquire%20about%20bridal%20makeup"
            target="_blank"
            rel="noreferrer"
            className="ms-auto btn btn-pink ms-lg-3"
            style={{ backgroundColor: "#d63384", color: "white" }}
          >
            Book via WhatsApp
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
