import { useLoaderData } from "react-router-dom"
import MasonryLayout from "../../components/gallery/MasonryLayout"

function Works() {
  const galleryImages = useLoaderData()

  return (
    <section className="container py-5" id="work">
      <h2 className="text-center mb-4 fw-bold">My All Works</h2>

      {/* Masonry Layout */}
      <MasonryLayout galleryImages={galleryImages} />
    </section>
  )
}

export default Works