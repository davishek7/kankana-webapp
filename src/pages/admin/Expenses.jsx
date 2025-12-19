import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import { EXPENSE_COLUMNS, EXPENSE_ACTIONS } from "../../constants/expense.constants";

function Expenses() {
  const expenses = useLoaderData()
  return (
    <div>
      <div className="mt-3">
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">
            Manage Expenses
          </h2>
          <Link to="/expenses/new" className="btn btn-outline-info float-end">
            <i className="fa-solid fa-plus"></i> Add New Expense
          </Link>
        </div>
        <DataTable
          columns={EXPENSE_COLUMNS}
          data={expenses}
          actions={EXPENSE_ACTIONS}
          // page={page}
          // totalPages={totalPages}
          // fetchPage={fetchPage}
          // showPagination={true}
        />
      </div>
    </div>
  );
}

export default Expenses;
