import { useState } from "react";
import {
  useLoaderData,
  useRevalidator,
  Link,
  useNavigate,
} from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import EditImageCategoryModal from "../../components/admin/gallery/EditImageCategoryModal";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";

export default function ImageDetails() {
  const image = useLoaderData();
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  const handleDelete = async () => {
    const response = await apiFetch(`gallery/${image.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.status >= 400) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    navigate("/gallery");
  };

  const handleSave = async (category) => {
    const formData = new FormData();
    formData.append("category", category);
    const response = await apiFetch(`gallery/${image.id}`, {
      method: "PATCH",
      body: formData,
    });
    const data = await response.json();
    if (response.status >= 400) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    revalidator.revalidate();
    closeModal();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div className="card shadow p-3" style={{ width: "22rem" }}>
        <img
          src={image.url}
          alt={image.category}
          className="card-img-top img-fluid rounded"
          style={{ objectFit: "cover", marginBottom: "1rem" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title mb-3 text-capitalize">{image.category}</h5>

          <div className="d-flex justify-content-center gap-2">
            <Link to="/gallery" className="btn btn-outline-info btn-sm">
              <i className="fa-solid fa-arrow-left"></i> Back
            </Link>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setActiveModal("edit-image")}
            >
              <i className="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setActiveModal("delete-image")}
            >
              <i className="fa-solid fa-trash me"></i> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {activeModal === "edit-image" && (
        <EditImageCategoryModal
          isOpen
          onClose={closeModal}
          onSubmit={handleSave}
          initialCategory={image.category}
        />
      )}

      {/* Delete Confirmation Modal */}
      {activeModal === "delete-image" && (
        <DeleteConfirmationModal
          item="image"
          isOpen
          onClose={closeModal}
          onSubmit={handleDelete}
        />
      )}
    </div>
  );
}
