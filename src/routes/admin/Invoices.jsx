import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
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
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await apiFetch(`invoice/?view=invoice&limit=${limit}&offset=${offset}`, {
      headers,
    });
    const responseData = await res.json();
    const data = await responseData.data;

    setInvoices(data.bookings);
    setPage(newPage);
  };
  return (
    <div>
      <div className="mt-3">
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">
            Manage Invoices
          </h2>
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
      </div>
    </div>
  );
}

export default Invoices;
