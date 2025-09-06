import { Link } from "react-router-dom";

function Footer() {
  return (
<footer className="py-4 bg-white border-top text-center text-muted small">
      <p className="mb-1">
        <strong>Kankana's Makeover</strong> · Bridal Makeup Artist in Andal, Mejia & Barjora
      </p>
      <p className="mb-1">
        📞 +91-8016127841 · 📍 Mejia, Bankura
      </p>
      <p className="mb-1">
        <a 
          href="https://wa.me/918016127841" 
          className="text-decoration-none text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat on WhatsApp
        </a>
      </p>
      <p className="mb-1">
        © {new Date().getFullYear()} Kankana's Makeover · Built with ❤️ by{" "}
        <Link
          to="https://davishek7.github.io"
          className="text-decoration-none text-dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          Avishek
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
