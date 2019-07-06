import React from 'react';
import { Link } from '../components';
import Crop from '../components/Crop';
import { BLOG_SITE_URL } from '../config/env';
import defaultImage from '../../assets/img/logo.png';

const NewsTabCard = ({ data }) => {
  let imageSrc = data.guid;
  if (!imageSrc && data.media.length > 0) {
    imageSrc = data.media[0];
  }
  if (imageSrc == null) imageSrc = defaultImage;
  return (
    <li className="news-tab-card">
      <div className="img-box">
        <Link to={`${BLOG_SITE_URL}/blog/${data.slug}`}><img onError={(ev) => { ev.target.src = defaultImage; }} src={imageSrc} alt="News Card" /></Link>
      </div>
      <div className="text-box">
        <h4 className="title"><Link to={`${BLOG_SITE_URL}/blog/${data.slug}`}>{data.post_title}</Link></h4>
        <p className="resume">
          {/*<Crop tag="p" maxLength="125">{data.post_content}</Crop>*/}
          <Crop maxLength="125">{data.post_content}</Crop>
        </p>
      </div>
    </li>
  );
};

export default NewsTabCard;
