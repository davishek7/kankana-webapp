import React from "react";
import { useLoaderData } from "react-router-dom";
import DashboardCard from "../../components/admin/DashboardCard";

export default function Dashboard() {
  const data = useLoaderData();

  return (
    <div className="container my-4">
      <div className="row g-3">
        {/* Total Images */}
        <DashboardCard title="Total Images" count={data?.total_images} />

        {/* Contacts Received */}
        <DashboardCard title="Contacts Received" count={data?.total_contacts} />

        {/* Total Bookings */}
        <DashboardCard title="Total Bookings" count={data?.total_bookings} />

        {/* Total Revenue */}
        <DashboardCard
          title="Total Revenue"
          amount={`₹${data?.total_revenue}`}
          textClass="text-success"
        />

        {/* Total Due */}
        <DashboardCard
          title="Total Due"
          amount={`₹${data?.total_due}`}
          textClass="text-danger"
        />
      </div>
    </div>
  );
}
