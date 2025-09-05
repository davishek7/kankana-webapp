import React from "react";

function MasonryLayout({ galleryImages }) {
  return (
    <div
      className="masonry"
      style={{
        columnCount: 5,
        columnGap: "1rem",
      }}
    >
      {galleryImages.map((image) => (
        <div
          key={image.id}
          style={{ breakInside: "avoid", marginBottom: "1rem" }}
        >
          <img
            src={image.url}
            alt={`Work ${image.id}`}
            className="img-fluid rounded shadow-sm"
          />
        </div>
      ))}
    </div>
  );
}

export default MasonryLayout;
