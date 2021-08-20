import React from "react";

import "./Styles/Gallery.scss";

const Gallery = ({ images = [] }) => {
  return (
    <div className="gallery-preview">
      {images.map(({ uri, caption }) => {
        return <img className="thumbnail" src={uri} />;
      })}
    </div>
  );
};

export default Gallery;
