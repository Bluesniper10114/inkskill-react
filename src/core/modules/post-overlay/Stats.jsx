import React from 'react';
import sortBy from 'lodash/sortBy';
import SpeachIcon from 'assets/svg/speach-icon.svg';
import LikeIcon from './LikeIcon';

const Stats = ({ postId, data, onLikesClick, onCommentsClick }) => (
  <ul className="list-inline">
    <li className="post-likes" onClick={onLikesClick}>
      {data.likeTypes.length === 0
        ? <LikeIcon postId={postId} />
        : sortBy(data.likeTypes).map(type => (
          <LikeIcon key={type} postId={postId} type={type} />
        ))
      }
      {' '}
      <span className="number">{data.likes}</span>
    </li>
    <li onClick={onCommentsClick}>
      <SpeachIcon /> {' '}
      <span className="number">{data.comments}</span>
    </li>
  </ul>
);

export default Stats;
