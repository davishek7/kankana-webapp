import { apiFetch } from "../../utils/api";
import { toast } from "react-toastify";

function Contact() {
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const postData = Object.fromEntries(formData.entries());

    const res = await apiFetch("contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    const resData = await res.json();
    if (resData.status !== 201) {
      {
        toast.error(resData.message);
        return;
      }
    }
    toast.success(resData.message);
    e.target.reset();
  };
  return (
    <section id="contact" className="py-5">
      <div className="container">
        <h2 className="fw-bold">
          Book Your Bridal Makeover in Mejia, Barjora and Illambazar
        </h2>
        <p className="my-3">
          Brides across Mejia, Barjora and Illambazar trust Kankana's Makeover
          for radiant, skin-focused bridal makeovers. Fill out the form or
          message us on WhatsApp to book your slot.
        </p>
        <form onSubmit={handleContactSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="phone_number"
              className="form-control"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              name="message"
              placeholder="Tell us about your event (date, location, style)"
              rows={4}
            ></textarea>
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-dark">
              Send Message
            </button>
            <a
              href="https://wa.me/918016127841?text=Hi%2C%20I'd%20like%20to%20book%20bridal%20makeup"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary"
            >
              Chat on WhatsApp
            </a>
          </div>
        </form>
        <p className="mt-3 text-muted">
          *Appointments are limited, especially during the wedding season. Book
          early to secure your bridal makeover slot in Andal, Mejia or Barjora.
          We can’t wait to glam you up for your big day!
        </p>
      </div>
    </section>
  );
}

export default Contact;
