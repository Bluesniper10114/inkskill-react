import React from 'react';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import pure from 'recompose/pure';
import slideable from 'core/components/dynamic/slideable';
import PostCard from 'core/components/PostCard';
import * as Arrow from 'core/components/Arrows';


const LineGallery = ({ items, Wrapper }) => (
  <div className="container cage">
    <div className="row">
      <Wrapper>
        {items.map(slide => (
          <div key={slide._id} className="col-md-3">
            <PostCard data={slide} />
          </div>
        ))}
      </Wrapper>
    </div>
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
  size: 4,
  prevArrow: <ArrowLeft />,
  nextArrow: <ArrowRight />,
  responsive: [
    { breakpoint: 376, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 2880, settings: { slidesToShow: 4 } },
  ],
})(LineGallery);
