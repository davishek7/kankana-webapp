import { useState } from "react";
import Modal from "../ui/Modal";

function EditImageCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialCategory,
}) {
  const [category, setCategory] = useState(initialCategory);

  return (
    <Modal
      isOpen={isOpen}
      title="Edit Image Category"
      onClose={onClose}
      closeOnBackdrop={false}
    >
      <>
        <label className="form-label">Category</label>
        <select
          className="form-select mb-3"
          value={category}
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="hero">Hero</option>
          <option value="gallery">Gallery</option>
        </select>
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary btn-sm me-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => onSubmit(category)}>
            Save
          </button>
        </div>
      </>
    </Modal>
  );
}

export default EditImageCategoryModal;
