import React from 'react';
import classNames from 'classnames';
import { getLocationString } from 'core/utils/profile';
import badgeImage from 'assets/img/badge.png';
import EditForm from './Edit/EditFormContainer';
import ProfileUrls from './ProfileUrls';
import { withProfile, toggleEditForm } from '../utils';

const Content = ({ profile, isOwner }) => (
  <div className="profile-box text-center">
    <div className="credential-box">
      <h5 className="name">{profile.name}</h5>
      <span className="origin">{getLocationString(profile.location)}</span>
      <ProfileUrls urls={profile.urls} />
    </div>
    <div className="bio-box text-center">
      <p className={classNames({ link: isOwner })} onClick={() => isOwner && toggleEditForm(true)}>
        {profile.bio || (isOwner && 'Create a short but catching intro')}
      </p>
    </div>
    <div className="badge-box">
      <ul className="list-inline text-center">
        <li><img src={badgeImage} alt="Badge" /></li>
        <li><img src={badgeImage} alt="Badge" /></li>
        <li><img src={badgeImage} alt="Badge" /></li>
      </ul>
    </div>
    {isOwner && <EditForm profile={profile} />}
    <div className="edit-overlay-bg" />
  </div>
);

export default withProfile()(Content);
