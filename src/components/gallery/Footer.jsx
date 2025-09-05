import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-4 bg-white border-top text-center text-muted small">
      © {new Date().getFullYear()} Kankana's Makeover · Built with ❤️ by{" "}
      <Link to="https://davishek7.github.io" className="text-decoration-none text-dark">Avishek</Link>
    </footer>
  );
}

export default Footer;
