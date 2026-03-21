import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/ui/DataTable";
import {
  BOOKING_COLUMNS,
  BOOKING_ACTIONS,
} from "../../constants/booking.constants";
import { apiFetch } from "../../utils/api";
import ListPagesHeader from "../../components/admin/ui/ListPagesHeader";

function Bookings() {
  const { initialRows, total, limit } = useLoaderData();
  const [bookings, setBookings] = useState(initialRows);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / limit);

  const fetchPage = async (newPage) => {
    const offset = (newPage - 1) * limit;
    const res = await apiFetch(
      `booking/?view=default&limit=${limit}&offset=${offset}`,
    );
    const responseData = await res.json();
    const data = responseData.data;

    setBookings(data.bookings);
    setPage(newPage);
  };

  useEffect(() => {
    setBookings(initialRows);
  }, [initialRows]);
  return (
    <>
      <ListPagesHeader
        title="Manage Bookings"
        buttonText="Add New Booking"
        buttonLink="/bookings/new"
      />
      <DataTable
        columns={BOOKING_COLUMNS}
        data={bookings}
        actions={BOOKING_ACTIONS}
        page={page}
        totalPages={totalPages}
        fetchPage={fetchPage}
        showPagination={true}
      />
    </>
  );
}

export default Bookings;
