import React from "react";
import { Link } from "react-router-dom";

function SearchResult({ searchData, searchResultType, searchText }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-light">
        <h5 className="mb-0">
          {searchData.length} result{searchData.length !== 1 ? "s" : ""} found for
          <span className="text-primary"> "{searchText}" </span> in{" "}
          <span className="fw-bold">{searchResultType}</span>
        </h5>
      </div>

      <ul className="list-group list-group-flush">
        {searchData.map((data) => (
          <li key={data.id || data.booking_id} className="list-group-item">
            {searchResultType === "Gallery" && (
              <Link to={`/gallery/${data.id}`} className="text-decoration-none">
                <i className="bi bi-image-fill me-2 text-secondary" />
                Image #{data.id}
              </Link>
            )}

            {searchResultType === "Bookings" && (
              <Link
                to={`/bookings/${data.booking_id}`}
                className="text-decoration-none"
              >
                <i className="bi bi-journal-bookmark-fill me-2 text-warning" />
                Booking ID: <strong>{data.booking_id}</strong>
              </Link>
            )}

            {searchResultType === "Contacts" && (
              <Link to={`/contacts/${data.id}`} className="text-decoration-none">
                <i className="bi bi-person-lines-fill me-2 text-info" />
                Contact from <strong>{data.name}</strong>
              </Link>
            )}

            {searchResultType === "Expenses" && (
              <Link to={`/expenses/${data.id}`} className="text-decoration-none">
                <i className="bi bi-cash-coin me-2 text-success" />
                Expense for Booking ID: <strong>{data.booking_id}</strong>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
