import React from 'react';
import classNames from 'classnames';
import Dropdown from 'core/components/Dropdown';
import Button from 'core/components/Dropdown/Button';
import LikeIcon from 'core/components/LikeIcon';
import { withLike } from 'core/utils/posts';
import { LIKE_TYPES } from 'core/constants';

const getLikeMenu = current => Object.keys(LIKE_TYPES).map(id => ({
  id,
  label: <LikeIcon type={id} className={classNames({ red: id === current })} />,
}));

const LikeMenu = ({ post, onLike }) => {
  const likeType = post.likeType;
  const button = ({ onClick }) => (
    <Button className="btn-transp" onClick={onClick}>
      <LikeIcon type={likeType} className={classNames({ red: likeType })} />
    </Button>
  );

  return (
    <Dropdown
      className="dropabove"
      menuClass="emoticon-list"
      button={button}
      items={getLikeMenu(likeType)}
      onSelect={onLike}
    />
  );
};

export default withLike(LikeMenu);
