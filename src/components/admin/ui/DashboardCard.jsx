import React from "react";

function DashboardCard({ title, count, amount, bgClass, subtitle }) {
  return (
    <div className="col-md-4 col-lg-2">
      <div className={`card ${bgClass} text-center shadow-sm border-0 h-100`}>
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <h3 className="fw-bold">{count ?? amount}</h3>

          {subtitle && (
            <div className="small opacity-75 mt-1">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
