import { useEffect, useState, useRef } from "react";
import Modal from "../ui/Modal";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

function AddImageModal({ isOpen, onClose }) {
  const [previews, setPreviews] = useState([]);
  const fetcher = useFetcher();

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // generate preview URLs
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

const lastMessageRef = useRef(null);

useEffect(() => {
  if (!fetcher.data) return;

  const { status, message, data, intent } = fetcher.data;

  if (lastMessageRef.current === message) return;
  lastMessageRef.current = message;

  if (status >= 400) {
    toast.error(message);
    return;
  }

  toast.success(message);

  if (data?.skipped_files?.length > 0) {
    toast.warn(
      <>
        <strong>Skipped files:</strong>
        <ul className="mb-0">
          {data.skipped_files.map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      </>,
      { autoClose: 8000 }
    );
  }

  if (intent === "add-image") {
    onClose();
  }

}, [fetcher.data]);

  return (
    <Modal
      isOpen={isOpen}
      title="Upload New Images"
      onClose={onClose}
      closeOnBackdrop={false}
    >
      <fetcher.Form
        method="post"
        encType="multipart/form-data"
      >
        <input type="hidden" name="intent" value="add-image" />
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            defaultValue="gallery"
            required
          >
            <option value="hero">Hero</option>
            <option value="gallery">Gallery</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Images
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="files"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="container mt-3">
          <div className="row">
            {previews.map((src, idx) => (
              <div key={idx} className="col-2 text-center mb-3">
                <img
                  src={src}
                  alt="preview"
                  className="img-fluid rounded"
                  style={{ width: "300px", objectFit: "cover" }}
                />
                {/* <p className="small text-truncate">{files[idx].name}</p> */}
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary me-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-success" type="submit">
            Upload
          </button>
        </div>
      </fetcher.Form>
    </Modal>
  );
}

export default AddImageModal;
