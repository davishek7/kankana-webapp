import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/ui/DataTable";
import {
  INVOICE_COLUMNS,
  INVOICE_ACTIONS,
} from "../../constants/invoice.constants";
import { apiFetch } from "../../utils/api";

function Invoices() {
  const { initialRows, total, limit } = useLoaderData();
  const [invoices, setInvoices] = useState(initialRows);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / limit);

  const fetchPage = async (newPage) => {
    const offset = (newPage - 1) * limit;
    const res = await apiFetch(
      `invoice/?view=invoice&limit=${limit}&offset=${offset}`,
    );
    const responseData = await res.json();
    const data = responseData.data;

    setInvoices(data.bookings);
    setPage(newPage);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h2 className="text-xl font-bold">Manage Invoices</h2>
      </div>
      <DataTable
        columns={INVOICE_COLUMNS}
        data={invoices}
        actions={INVOICE_ACTIONS}
        page={page}
        totalPages={totalPages}
        fetchPage={fetchPage}
        showPagination={true}
      />
    </>
  );
}

export default Invoices;
