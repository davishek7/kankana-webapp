import useCachedFetch from "../../hooks/useCachedFetch";
import { API_URL } from "../../constants/api.constants";

function Hero() {
  const heroImage = useCachedFetch(`${API_URL}/gallery?category=hero&limit=1`, "gallery_home_hero")

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <h1 className="fw-bold display-5">
              Timeless <span className="text-danger">Bridal</span> Looks for
              Your Big Day
            </h1>
            <p className="mt-3 text-muted">
              Durgapur · Andal · Mejia · Barjora · Asansol · All over WB — premium bridal,
              reception, and party makeup.
            </p>
            <div className="d-flex gap-2 mt-4">
              <a href="#work" className="btn btn-dark">
                View Portfolio
              </a>
              <a href="#contact" className="btn btn-outline-secondary">
                Contact
              </a>
            </div>
          </div>
          <div className="col-md-6">
            {heroImage ? (
              <img
                src={heroImage.url}
                alt="That's Me"
                className="img-fluid rounded shadow"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
