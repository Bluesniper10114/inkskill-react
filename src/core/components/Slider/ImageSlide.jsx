import React from 'react';
import { Link } from '../index';

const ImageSlide = ({ content }) => (
  <div>
    <div className="img-box">
      <Link><img src={content.image} alt={content.label} /></Link>
    </div>
    <div className="carousel-caption">
      <Link>{content.label}</Link>
    </div>
  </div>
);

export default ImageSlide;
