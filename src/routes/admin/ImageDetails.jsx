import React, { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";

export default function ImageDetails() {
  const image = useLoaderData();
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [category, setCategory] = useState(image.category);

  const handleDelete = async () => {
    const res = await apiFetch(`gallery/${image.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
    const resData = await res.json()
    if (resData.status !== 200){
        toast.error(resData.message)
        setShowDeleteModal(false);
    }
    toast.success(resData.message)
    navigate("/gallery")
  };

  const handleSave = async () => {
    const formData = new FormData()
    formData.append("category", category)
    const res = await apiFetch(`gallery/${image.id}`, {
        method: "PATCH",
        body: formData
    })
    const resData = await res.json()
    if (resData.status !== 200){
        toast.error(resData.message)
        setShowEditModal(false);
        return
    }
    toast.success(resData.message)
    navigate(`/admin/gallery/${image.id}`)
    setShowEditModal(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div className="card shadow p-3" style={{ width: "22rem" }}>
          <img
            src={image.url}
            alt={category}
            className="card-img-top img-fluid rounded"
            style={{ objectFit: "cover", marginBottom: "1rem" }}
          />
        <div className="card-body text-center">
          <h5 className="card-title mb-3 text-capitalize">{category}</h5>
          <div className="d-flex justify-content-center gap-2">
            <Link className="btn btn-outline-info" to="/gallery">
                <i className="fa-solid fa-arrow-left"></i> Back
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => setShowEditModal(true)}
            >
              <i className="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <i className="fa-solid fa-trash me-2"></i> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div>
          <div
            className="modal fade show"
            style={{
              display: "block",
              zIndex: 1055, // higher than backdrop
            }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Category</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="hero">Hero</option>
                    <option value="gallery">Gallery</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1050 }}
            onClick={() => setShowEditModal(false)}
          ></div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div>
          <div
            className="modal fade show"
            style={{
              display: "block",
              zIndex: 1055, // higher than backdrop
            }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to delete this image from{" "}
                    <strong>{category}</strong>?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1050 }}
            onClick={() => setShowDeleteModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
