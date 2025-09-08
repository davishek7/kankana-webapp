import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
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
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await apiFetch(`booking/?limit=${limit}&offset=${offset}`, {
      headers,
    });
    const responseData = await res.json();
    const data = await responseData.data;

    setBookings(data.bookings);
    setPage(newPage);
  };
  return (
    <div>
      <div className="mt-3">
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">
            Manage Bookings
          </h2>
          <Link
            to="/admin/bookings/new"
            className="btn btn-outline-info float-end"
          >
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
      </div>
    </div>
  );
}

export default Bookings;
