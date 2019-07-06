import React from 'react';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import pure from 'recompose/pure';
import slideable from 'core/components/dynamic/slideable';
import NewsCard from 'core/components/NewsCard';
import * as Arrow from 'core/components/Arrows';


const BlogGallery = ({ items, Wrapper }) => (
  <div className="row news-container">
    <Wrapper>
      {items.map(post => (
        <div key={post.id} className="col-sm-6">
          <NewsCard data={post} />
        </div>
      ))}
    </Wrapper>
  </div>
);

const dynamicArrow = compose(
  pure,
  mapProps(props => ({ ...props, onInheritClick: props.onClick })),
  withState('clicked', 'setClicked', false),
  withState('timeout', 'storeTimeout', null),
  withHandlers({
    onClick: ({ setClicked, onInheritClick, storeTimeout, timeout }) => (event) => {
      clearTimeout(timeout);

      onInheritClick(event);
      setClicked(true);

      storeTimeout(setTimeout(() => setClicked(false), 500));
    },
  })
);

const ArrowLeft = dynamicArrow(Arrow.Left);
const ArrowRight = dynamicArrow(Arrow.Right);

export default slideable({
  size: 3,
  rows: 2,
  prevArrow: <ArrowLeft />,
  nextArrow: <ArrowRight />,
  responsive: [
    { breakpoint: 768, settings: { slidesToShow: 1 } },
    { breakpoint: 2880, settings: { slidesToShow: 2 } },
  ],
})(BlogGallery);
