import { Outlet } from "react-router-dom";
import Navbar from "../components/gallery/Navbar";
import Footer from "../components/gallery/Footer";

export default function RootLayout() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <Outlet />
      {/* Footer */}
      <Footer />
    </div>
  );
}
