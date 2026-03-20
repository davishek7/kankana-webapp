import { useLoaderData } from "react-router-dom";
import DataTable from "../../components/admin/ui/DataTable";
import {
  EXPENSE_COLUMNS,
  EXPENSE_ACTIONS,
} from "../../constants/expense.constants";

function Expenses() {
  const expenses = useLoaderData();
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h2 className="text-xl font-bold">Manage Expenses</h2>
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
    </>
  );
}

export default Expenses;
