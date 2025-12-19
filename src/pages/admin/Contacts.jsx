import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import {
  CONTACT_COLUMNS,
  CONTACT_ACTIONS,
} from "../../constants/contact.constants";
import { apiFetch } from "../../utils/api";

function Contacts() {
  const { initialRows, total, limit } = useLoaderData();
  const [contacts, setContacts] = useState(initialRows);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / limit);

  const fetchPage = async (newPage) => {
    const offset = (newPage - 1) * limit;
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await apiFetch(`contact/?limit=${limit}&offset=${offset}`, {
      headers,
    });
    const responseData = await res.json();
    const data = await responseData.data;

    setContacts(data.contacts);
    setPage(newPage);
  };
  return (
    <div>
      <div className="mt-3">
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">
            Manage Contacts
          </h2>
        </div>
        <DataTable
          columns={CONTACT_COLUMNS}
          data={contacts}
          actions={CONTACT_ACTIONS}
          showPagination={true}
          page={page}
          totalPages={totalPages}
          fetchPage={fetchPage}
        />
      </div>
    </div>
  );
}

export default Contacts;
