// @flow

import React from 'react';
import map from 'lodash/map';
import { simpleDate } from 'core/utils/dates';
import { Link } from '../components';
import Crop from '../components/Crop';
import { BLOG_SITE_URL } from '../config/env';

type Props = {
  data: BlogPostPreview,
};

const NewsCard = (props: Props) => {
  const data: BlogPostPreview = props.data;
  const showSingleImage: boolean = data.media.length === 0 && data.guid;

  return (
    <div className="news-card">
      <div className="img-box">
        {/*
          { data.media && <ul>
            {data.media && map(data.media, (media, index) => (
              (index <= 2) && (<li key={index}><Link to={`${BLOG_SITE_URL}/blog/${data.slug}`}><img src={media} /></Link></li>)
            ))}
          </ul> }
        */}
        { showSingleImage &&
          <Link to={`${BLOG_SITE_URL}/blog/${data.slug}`}><img src={data.guid} /></Link>
        }
        { data.media.length > 0 &&
        <div
          key={data.id}
          id={`IS-gallery-${data.id}`}
          data-pod={`IS-gallery-${data.id}`}
          className={`${data.media.length > 3 ? 'gallery-3' : 'gallery-' + data.media.length} IS-gallery-${data.id}`}
        >
          <div id={`IS-placeholder-${data.id}`} className="gallery-gallery_wrapper ">
            <aside className="gallery-gallery_stage" />
            <article className="gallery-gallery_slides">
              <div className="gallery-gallery_slide-content" />
              <div className="gallery-gallery_slide-content" />
            </article>
            <article className="gallery-gallery_slides">
              <div className="gallery-gallery_slide-content" />
            </article>
          </div>
        </div> }
        { showSingleImage &&
          <Link to={`${BLOG_SITE_URL}/blog/${data.slug}`}><img src={data.guid} /></Link>
        }
      </div>
      <div className="text-box">
        <Crop className="subtitle" maxLength="40" title>
          {data.sub_header || '—'}
        </Crop>
        <h2 className="title">
          <Link to={`${BLOG_SITE_URL}/blog/${data.slug}`}>
            <Crop maxLength="40" title>{data.post_title}</Crop>
          </Link>
        </h2>
        <div className="inline-group">
          <span className="shortline-divider short" />
          <span className="subtitle">{simpleDate(data.postmodified)}</span>
        </div>
        <Crop tag="p" maxLength="225">{data.post_content}</Crop>
      </div>
    </div>
  );
};

export default NewsCard;
