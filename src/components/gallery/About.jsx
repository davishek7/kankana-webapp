import React from "react";

function About() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-8">
            <h2 className="fw-semibold">About Kankana</h2>
            <p className="text-muted">
              Professional bridal makeover services in Andal, Mejia and Barjora
              — specializing in skin-first, long-wear beauty for weddings and
              special events.
            </p>
            <ul className="row row-cols-2 g-2 list-unstyled small">
              <li>✔ HD, Waterproof makeup</li>
              <li>✔ On-location services</li>
              <li>✔ Hairstyling & draping</li>
              <li>✔ Photoshoot makeup for model portfolios</li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <p className="fw-medium mb-2">Service Areas</p>
              <p className="small text-muted">
                Durgapur · Andal · Mejia · Barjora · Asansol · All over WB
              </p>
              <small className="text-muted my-2">
                Quick questions? Tap below to chat instantly on WhatsApp — we’ll get back to you within minutes.
              </small>
              <a
                href="https://wa.me/918016127841?text=Hi%20I'd%20like%20to%20inquire%20about%20bridal%20makeup"
                target="_blank"
                rel="noreferrer"
                className="btn btn-danger w-100 mt-2"
              >
                Check Availability on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
