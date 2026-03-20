import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import DataTable from "../../components/admin/ui/DataTable";
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
    const res = await apiFetch(`contact/?limit=${limit}&offset=${offset}`);
    const responseData = await res.json();
    const data = responseData.data;

    setContacts(data.contacts);
    setPage(newPage);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h2 className="text-xl font-bold">Manage Contacts</h2>
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
    </>
  );
}

export default Contacts;
