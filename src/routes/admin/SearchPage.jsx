import React from "react";
import { useLoaderData } from "react-router-dom";

function SearchPage() {
  const { images, bookings, contacts, expenses, search_term } = useLoaderData();

  return(
    <>
    <h1>Search results for {`"${search_term}"`}</h1>
    <p>{images.length > 0 && images.length}</p>
    <p>{bookings.length > 0 && bookings.length}</p>
    <p>{contacts.length > 0 && contacts.length}</p>
    <p>{expenses.length > 0 && expenses.length}</p>
    </>
  )
}

export default SearchPage;
