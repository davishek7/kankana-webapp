import Modal from '../ui/Modal'


function LogoutConfirmationModal({ isOpen, onClose, onSubmit }) {
  return (
    <Modal isOpen={isOpen} title="Confirm Logout" onClose={onClose} closeOnBackdrop={true} showMiddle={true}>
      <p>Are you sure you want to logout?</p>
      <div className="d-flex justify-content-end">
        <button className="btn btn-outline-secondary btn-sm me-2" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-danger btn-sm" onClick={onSubmit}>
          Logout
        </button>
      </div>
    </Modal>
  )
}

export default LogoutConfirmationModal