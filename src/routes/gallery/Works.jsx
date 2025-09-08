import { useLoaderData } from "react-router-dom"
import MasonryLayout from "../../components/gallery/MasonryLayout"

function Works() {
  const {initialRows, total, nextOffset} = useLoaderData()

  return (
    <section className="container py-5" id="work">
      <h2 className="text-center mb-4 fw-bold">My All Works</h2>

      {/* Masonry Layout */}
      <MasonryLayout initialRows={initialRows} total={total} nextOffset={nextOffset} paginated={true}/>
    </section>
  )
}

export default Works