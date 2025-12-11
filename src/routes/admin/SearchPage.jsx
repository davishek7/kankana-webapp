import React from "react";
import { useLoaderData } from "react-router-dom";
import SearchResult from "../../components/admin/SearchResult";

function SearchPage() {
  const { images, bookings, contacts, expenses, searchTerm } = useLoaderData();

  const noResults =
    images.length === 0 &&
    bookings.length === 0 &&
    contacts.length === 0 &&
    expenses.length === 0;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        Search results for <span className="text-primary">"{searchTerm}"</span>
      </h2>

      {noResults && (
        <div className="alert alert-danger">
          No results found for <strong>"{searchTerm}"</strong>.
        </div>
      )}

      {images.length > 0 && (
        <SearchResult
          searchData={images}
          searchResultType="Gallery"
          searchText={searchTerm}
        />
      )}

      {bookings.length > 0 && (
        <SearchResult
          searchData={bookings}
          searchResultType="Bookings"
          searchText={searchTerm}
        />
      )}

      {contacts.length > 0 && (
        <SearchResult
          searchData={contacts}
          searchResultType="Contacts"
          searchText={searchTerm}
        />
      )}

      {expenses.length > 0 && (
        <SearchResult
          searchData={expenses}
          searchResultType="Expenses"
          searchText={searchTerm}
        />
      )}
    </div>
  );
}

export default SearchPage;
