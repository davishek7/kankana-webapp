import { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../components/admin/modals/DeleteConfirmationModal";


function ContactDetails() {
  const contact = useLoaderData();
  const navigate = useNavigate()

  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  const handleDelete = async() =>{
    const response = await apiFetch(`contact/${contact.id}`, {
      method: "DELETE",
    });
    const data = await response.json()
    if (response.status >= 400){
        toast.error(data.message)
        return
    }
    toast.success(data.message)
    navigate("/contacts")
  }

return (
    <div className="container my-4">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-body p-4">
          {/* Title + Status Toggle */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="fw-bold mb-1">{contact.name}</h2>
              <h5 className="text-muted">{contact.phone_number}</h5>
              <span className="text-muted mb-4">{contact.created_at}</span>
            </div>
          </div>
          {/* Contact Message */}
          <div className="mb-4 overflow-auto" style={{ maxHeight: "500px" }}>
            <MDEditor.Markdown
              source={contact.message}
              className="bg-white text-dark p-3 rounded shadow-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <Link to="/contacts" className="btn btn-outline-primary btn-sm">
              <i className="fa-solid fa-arrow-left"></i> Back
            </Link>
            <button className="btn btn-danger btn-sm" onClick={() => setActiveModal("delete")}>
              <i className="fa-solid fa-trash me-2"></i> Delete
            </button>
          </div>
        </div>
      </div>
      {activeModal === "delete" && (
        <DeleteConfirmationModal
          item="contact"
          isOpen
          onClose={closeModal}
          onSubmit={handleDelete}
        />
      )}
    </div>
  );
}

export default ContactDetails;