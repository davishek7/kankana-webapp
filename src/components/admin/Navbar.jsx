import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import iconImg from "../../assets/kankana.png";


function Navbar({ onToggleSidebar }) {
  const [query, setQuery] = useState("")
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <span className="fs-3">
          <img src={iconImg} alt="logo" style={{width: "48px", height: "48px"}}/>
        </span>
      </Link>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#sidenavAccordion"
        onClick={onToggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-block d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0" onSubmit={handleSearch}>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
            value={query}
            onChange = {(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="submit"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/profile">
                <i className="fa-solid fa-user"></i> Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
