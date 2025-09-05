import { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewImage() {
  const [previews, setPreviews] = useState([]);
  const data = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status !== 201) {
      toast.error(data?.message);
      return;
    }
    toast.success(data?.message);
    navigate("/admin/gallery");
  }, [data, navigate]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // generate preview URLs
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "1200px", width: "100%", borderRadius: "1rem" }}
      >
        <div className="clearfix">
          <h2 className="text-xl font-bold mb-3 float-start">
            Upload New Images
          </h2>
        </div>
        <Form method="post" className="rounded" encType="multipart/form-data">
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
              Upload Image
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

          <button type="submit" className="btn btn-outline-primary w-100">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
