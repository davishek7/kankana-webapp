import React from 'react'

function About() {
  return (
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-8">
              <h3 className="fw-semibold">About Kankana</h3>
              <p className="text-muted">
                West Bengal bridal specialist with a focus on skin-first,
                long-wear looks for day and night ceremonies.
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
                <a
                  href="https://wa.me/+918016127841?text=Hi%20I'd%20like%20to%20inquire%20about%20bridal%20makeup"
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
  )
}

export default About