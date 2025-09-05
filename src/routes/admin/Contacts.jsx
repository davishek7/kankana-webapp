import React from 'react'
import { useLoaderData } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import { CONTACT_COLUMNS, CONTACT_ACTIONS } from "../../constants/contact.constants";

function Contacts() {
  const contacts = useLoaderData()
  return (
    <div>
      <div className="mt-3">
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">Manage Contacts</h2>
        </div>
        <DataTable
          columns={CONTACT_COLUMNS}
          data={contacts}
          actions={CONTACT_ACTIONS}
          showPagination={false}
          // page={page}
          // totalPages={totalPages}
          // fetchPage={fetchPage}
        />
      </div>
    </div>
  );
}

export default Contacts