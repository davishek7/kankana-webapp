import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import {
  GALLERY_COLUMNS,
  GALLERY_ACTIONS,
} from "../../constants/gallery.constants";
import { apiFetch } from "../../utils/api";

function Gallery() {
  const { initialRows, total, limit } = useLoaderData();
  const [images, setImages] = useState(initialRows);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / limit);

  const fetchPage = async (newPage) => {
    const offset = (newPage - 1) * limit;
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await apiFetch(`gallery/?limit=${limit}&offset=${offset}`, {
      headers,
    });
    const responseData = await res.json();
    const data = await responseData.data;

    setImages(data.images);
    setPage(newPage);
  };
  return (
    <div>
      <div className="mt-3">
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">
            Manage Uploaded Images
          </h2>
          <Link
            to="/admin/gallery/upload"
            className="btn btn-outline-info float-end"
          >
            <i className="fa-solid fa-cloud-arrow-up"></i> Upload New Image
          </Link>
        </div>
        <DataTable
          columns={GALLERY_COLUMNS}
          data={images}
          actions={GALLERY_ACTIONS}
          showPagination={true}
          page={page}
          totalPages={totalPages}
          fetchPage={fetchPage}
        />
      </div>
    </div>
  );
}

export default Gallery;
