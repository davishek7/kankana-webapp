import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import { GALLERY_COLUMNS, GALLERY_ACTIONS } from "../../constants/gallery.constants";

function Gallery() {
  const images = useLoaderData()
  return (
    <div>
      <div className="mt-3">
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">Manage Uploaded Images</h2>
          <Link to="/admin/gallery/upload" className="btn btn-outline-info float-end">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upload New Image
          </Link>
        </div>
        <DataTable
          columns={GALLERY_COLUMNS}
          data={images}
          actions={GALLERY_ACTIONS}
          showPagination={false}
          // page={page}
          // totalPages={totalPages}
          // fetchPage={fetchPage}
        />
      </div>
    </div>
  );
}

export default Gallery;
