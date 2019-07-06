import React from 'react';
import * as Arrow from 'core/components/Arrows';
import { Loader } from 'core/utils/loading';
import Left from './LeftContainer';
import Right from './RightContainer';


const ImageOverlay = ({
  loading,
  post = {},
  arrows,
  onPrev,
  onNext,
}) => (
  <div className="container">
    {post._id && <div className="row no-pads">
      <div className="col-md-7">
        <Left post={post} />
      </div>
      <div className="col-md-5">
        <Right post={post} />
      </div>
    </div>}
    <div className="arrow-cage">
      {arrows.prevId && <Arrow.Left onClick={onPrev} />}
      {arrows.nextId && <Arrow.Right onClick={onNext} />}
    </div>
    {loading && <Loader />}
  </div>
);

export default ImageOverlay;
