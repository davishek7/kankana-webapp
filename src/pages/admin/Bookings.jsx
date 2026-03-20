import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/ui/DataTable";
import {
  BOOKING_COLUMNS,
  BOOKING_ACTIONS,
} from "../../constants/booking.constants";
import { apiFetch } from "../../utils/api";

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
        <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
          <h2 className="text-xl font-bold">
            Manage Bookings
          </h2>
          <Link to="/bookings/new" className="btn btn-outline-info btn-sm">
            <i className="fa-solid fa-plus"></i> Add New Booking
          </Link>
        </div>
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
