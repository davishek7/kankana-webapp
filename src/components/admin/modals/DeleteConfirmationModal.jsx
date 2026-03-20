import Modal from "../ui/Modal"


function DeleteConfirmationModal({ item, isOpen, onClose, onSubmit }) {
  return (
    <Modal isOpen={isOpen} title="Confirm Delete" onClose={onClose} closeOnBackdrop={true} showMiddle={true}>
      <p>Are you sure you want to delete this {item}?</p>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={onSubmit}>
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default DeleteConfirmationModal