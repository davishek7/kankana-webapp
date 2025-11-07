import React from "react";
import { useLoaderData } from "react-router-dom";
import DashboardCard from "../../components/admin/DashboardCard";

export default function Dashboard() {
  const data = useLoaderData();

  return (
    <div className="container my-4">
      <h1 className="text-center mb-3">Kankana&apos;s Makeover</h1>
      <div className="row g-3">
        {/* Total Images */}
        <DashboardCard title="Total Images" count={data?.total_images} bgClass="text-bg-warning" />

        {/* Contacts Received */}
        <DashboardCard title="Contacts Received" count={data?.total_contacts} bgClass="text-bg-light"/>

        {/* Total Bookings */}
        <DashboardCard title="Total Bookings" count={data?.total_bookings} bgClass="text-bg-dark"/>

        {/* Total Revenue */}
        <DashboardCard
          title="Total Revenue (Received + Due)"
          amount={`₹${data?.total_revenue}`}
          bgClass="text-bg-success"
        />

        {/* Total Received */}
        <DashboardCard
          title="Total Received"
          amount={`₹${data?.total_received}`}
          bgClass="text-bg-info"
        />

        {/* Total Due */}
        <DashboardCard
          title="Total Due"
          amount={`₹${data?.total_due}`}
          bgClass="text-bg-danger"
        />
      </div>
    </div>
  );
}
