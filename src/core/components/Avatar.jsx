// @flow

import React from 'react';
import classNames from 'classnames';
import imgAvatar from 'assets/img/avatar.jpg';
import imgAvatarGirl from 'assets/img/avatar_girl.jpg';
import Link from './Link';
import { getImageUrl } from '../utils/images';
import { getProfileUrl } from '../utils/profile';

type Props = {
  image: string,
  className?: string,
  tag?: 'div' | 'li',
  square?: boolean,
  link?: string,
  user?: UserBase,
  useLink?: boolean,
  size?: string,
};

type ImageProps = {
  image: string,
};

export const AvatarImage = ({ image }: ImageProps) => {
  const url = getImageUrl(image || 'mock', 'avatar');
  return (
    <img src={url} alt="Profile" />
  );
};

export const getAvatar = (user: UserBase, size: string) => {
  if (user.avatarUrls) return user.avatarUrls[size];

  return user.gender === 'female' ? imgAvatarGirl : imgAvatar;
};

const Avatar = ({
  className,
  tag = 'div',
  image,
  link,
  user,
  size = 'sm',
  useLink = true,
  square = false,
  ...props
}: Props) => {
  const Tag = tag;
  const profileUrl = user ? getProfileUrl(user) : link;
  const imageUrl = user ? getAvatar(user, size) : image;
  const imageContent = <AvatarImage image={imageUrl} />;
  const classNameList = classNames('img-box', className, {
    'profile-pic': !square,
  });

  return (
    <Tag className={classNameList} {...props}>
      {useLink && profileUrl ? <Link to={profileUrl}>{imageContent}</Link> : imageContent}
    </Tag>
  );
};

export default Avatar;
