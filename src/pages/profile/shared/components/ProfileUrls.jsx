import React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import { withModal } from 'core/modules/modal';
import { Spinner } from 'core/utils/loading';
import { SocialIcon } from 'core/components';
import ProfileUrls, { ActiveUrl, isInactive } from 'core/components/ProfileUrls';
import { withSocialConnect } from '../utils';

const enhancer = compose(
  withSocialConnect,
  withModal('enter_web_url'),
  withProps(({ type, onModal, linkAccount, isOwner }) => ({
    onClick: isOwner && (type === 'web' ? onModal : () => linkAccount(type)),
  })),
);

const InactiveUrl = enhancer(({ loading, type, onClick }) => (
  <span>
    <SocialIcon
      className={classNames('navi not-connected', { inactive: !onClick })}
      type={type}
      onClick={onClick}
    />
    {loading && <Spinner />}
  </span>
));

const Url = branch(
  isInactive,
  renderComponent(InactiveUrl)
)(ActiveUrl);

export default ({ urls }) => (
  <ProfileUrls urls={urls} component={Url} />
);
