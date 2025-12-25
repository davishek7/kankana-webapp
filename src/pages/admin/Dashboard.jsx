import React from "react";
import { useLoaderData } from "react-router-dom";
import DashboardCard from "../../components/admin/DashboardCard";
import { YEAR_BG_CLASSES } from "../../constants/dashboard.constants";

export default function Dashboard() {
  const { statsData, incomeData } = useLoaderData();

  return (
    <div className="container my-4">
      {/* PAGE TITLE */}
      <h2 className="text-center fw-bold mb-4">
        Kankana&apos;s Makeover · Dashboard
      </h2>

      {/* PRIMARY KPIs */}
      <h6 className="text-uppercase text-muted mb-2 text-center">
        Financial Overview
      </h6>
      <div className="row g-3 justify-content-center mb-4">
        <DashboardCard
          title="Total Received"
          amount={`₹ ${statsData?.total_received}`}
          bgClass="text-bg-success"
        />
        <DashboardCard
          title="Total Due"
          amount={`₹ ${statsData?.total_due}`}
          bgClass="text-bg-danger"
        />
        <DashboardCard
          title="Total Revenue"
          amount={`₹ ${statsData?.total_revenue}`}
          bgClass="text-bg-primary"
        />
      </div>

      {/* OPERATIONAL STATS */}
      <h6 className="text-uppercase text-muted mb-2 text-center">Operations</h6>
      <div className="row g-3 justify-content-center mb-4">
        <DashboardCard
          title="Total Bookings"
          count={statsData?.total_bookings}
          bgClass="text-bg-light"
        />
        <DashboardCard
          title="Total Images"
          count={statsData?.total_images}
          bgClass="text-bg-warning"
        />
        <DashboardCard
          title="Total Expenses"
          amount={`₹ ${statsData?.total_expenses}`}
          bgClass="text-bg-dark"
        />
      </div>

      {/* YEAR-WISE ANALYTICS */}
      <h6 className="text-uppercase text-muted mb-2 text-center">
        Year-wise Income
      </h6>
      <div className="row g-3 justify-content-center">
        {incomeData?.map((item, index) => (
          <DashboardCard
            key={item.year}
            title={`Income ${item.year}`}
            amount={`₹ ${item.total_income}`}
            bgClass={YEAR_BG_CLASSES[index % YEAR_BG_CLASSES.length]}
          />
        ))}
      </div>
    </div>
  );
}
