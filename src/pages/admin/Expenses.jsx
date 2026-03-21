import { useLoaderData } from "react-router-dom";
import DataTable from "../../components/admin/ui/DataTable";
import {
  EXPENSE_COLUMNS,
  EXPENSE_ACTIONS,
} from "../../constants/expense.constants";
import ListPagesHeader from "../../components/admin/ui/ListPagesHeader";

function Expenses() {
  const expenses = useLoaderData();
  return (
    <>
      <ListPagesHeader title="Manage Expenses" />
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
