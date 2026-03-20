export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  closeOnBackdrop,
  showMiddle,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* backdrop */}
      <div className="modal-backdrop fade show" style={{zIndex: 1050}}/>

      <div
        className="modal fade show"
        style={{ display: "block", zIndex: 1055 }}
        tabIndex={-1}
        onClick={(e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className={`modal-dialog ${showMiddle && 'modal-dialog-centered'}`}>
          <div className="modal-content">
            <div className="modal-header">
              {title && <h5 className="modal-title">{title}</h5>}
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}