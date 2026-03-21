import { Link } from "react-router-dom";

function ListPagesHeader({ title, buttonText, buttonLink, setActiveModal }) {
  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      <h2 className="text-xl font-bold">{title}</h2>
      {buttonLink && (
        <Link to={buttonLink} className="btn btn-success btn-sm">
          <i className="fa-solid fa-plus"></i> {buttonText}
        </Link>
      )}

      {setActiveModal && (
        <button
          onClick={() => setActiveModal("add-image")}
          className="btn btn-success btn-sm"
        >
          <i className="fa-solid fa-cloud-arrow-up"></i> Upload New Image
        </button>
      )}
    </div>
  );
}

export default ListPagesHeader;
