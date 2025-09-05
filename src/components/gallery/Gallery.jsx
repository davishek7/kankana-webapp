import React from "react";

function Gallery({ images, openLightbox }) {
  return (
    <section id="work" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Recent Work</h2>
        <span className="text-sm text-neutral-500">
          Tap an image to enlarge
        </span>
      </div>

      {/* CSS-columns Masonry: change column counts as you like */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-4 [column-fill:_balance]">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="group mb-4 w-full inline-block focus:outline-none"
          >
            <img
              src={src}
              alt={`Bridal look ${i + 1}`}
              className="w-full rounded-2xl shadow-md transition transform group-hover:scale-[1.01] group-hover:shadow-lg"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
