import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import DataTable from "../../components/admin/ui/DataTable";
import {
  GALLERY_COLUMNS,
  GALLERY_ACTIONS,
} from "../../constants/gallery.constants";
import { apiFetch } from "../../utils/api";
import AddImageModal from "../../components/admin/gallery/AddImageModal";

function Gallery() {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  const { initialRows, total, limit } = useLoaderData();
  const [images, setImages] = useState(initialRows);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / limit);

  const fetchPage = async (newPage) => {
    const offset = (newPage - 1) * limit;
    const res = await apiFetch(`gallery/?limit=${limit}&offset=${offset}`, 
  );
    const responseData = await res.json();
    const data = responseData.data;

    setImages(data.images);
    setPage(newPage);
  };

  useEffect(() => {
    setImages(initialRows);
  }, [initialRows]);

  return (
    <>
        <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
          <h2 className="text-xl font-bold">
            Manage Uploaded Images
          </h2>
          <button
            onClick={() => setActiveModal("add-image")}
            className="btn btn-outline-info btn-sm"
          >
            <i className="fa-solid fa-cloud-arrow-up"></i> Upload New Image
          </button>
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
        {activeModal === "add-image" && (
          <AddImageModal isOpen onClose={closeModal} />
        )}
    </>
  );
}

export default Gallery;
