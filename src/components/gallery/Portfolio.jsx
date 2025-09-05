import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import { API_URL } from "../../constants/api.constants";

function Portfolio() {
  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    const getGalleryImages = async () => {
      const res = await fetch(
        `${API_URL}/gallery?category=gallery`
      );
      const resData = await res.json();
      const data = await resData.data;
      setGalleryImages(data);
    };
    getGalleryImages();
  }, []);
  return (
    <section className="container py-5" id="portfolio">
      <h2 className="text-center mb-4 fw-bold">My Recent Works</h2>

      {/* Masonry Layout */}
      <MasonryLayout galleryImages={galleryImages} />
      
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
