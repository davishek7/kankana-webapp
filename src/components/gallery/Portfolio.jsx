import { Link } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import { API_URL } from "../../constants/api.constants";
import useCachedFetch from "../../hooks/useCachedFetch";

function Portfolio() {
  const galleryImages = useCachedFetch(`${API_URL}/gallery?category=gallery&limit=25`, "gallery_home_gallery")

  return (
    <section className="container py-5" id="portfolio">
      <h2 className="text-center mb-4 fw-bold">My Recent Works</h2>

      {/* Masonry Layout */}
      {galleryImages ? <MasonryLayout galleryImages={galleryImages} /> : <p>Loading...</p>}
      
      <div className="text-center mt-4">
        <Link
          to="/works"
          className="btn btn-pink"
          style={{ backgroundColor: "#d63384", color: "white" }}
        >
          View All Works
        </Link>
      </div>
    </section>
  );
}

export default Portfolio;
