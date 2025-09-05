import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import { BOOKING_COLUMNS, BOOKING_ACTIONS } from "../../constants/booking.constants";

function Bookings() {
  const bookings = useLoaderData()
  return (
    <div>
      <div className="mt-3">
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">Manage Bookings</h2>
          <Link to="/admin/bookings/new" className="btn btn-outline-info float-end">
            <i className="fa-solid fa-plus"></i> Add New Booking
          </Link>
        </div>
        <DataTable
          columns={BOOKING_COLUMNS}
          data={bookings}
          actions={BOOKING_ACTIONS}
          showPagination={false}
          // page={page}
          // totalPages={totalPages}
          // fetchPage={fetchPage}
        />
      </div>
    </div>
  );
}

export default Bookings;
