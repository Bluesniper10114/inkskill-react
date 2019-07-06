import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import Avatar from 'core/components/Avatar';
import UserPopover from './UserPopover';


const ActivityAvatar = ({
  user,
  tag: Tag = 'div',
  visible,
  target,
  show,
  hide,
  setPopover,
}) => (
  <Tag className="activity-avatar">
    <Avatar
      user={user}
      useLink={false}
      onMouseOver={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    />
    {visible && (
      <UserPopover
        target={target}
        userId={user._id}
        onEnter={setPopover}
      />
    )}
  </Tag>
);

export default compose(
  withState('visible', 'setVisible', false),
  withState('popover', 'setPopover', null),
  withState('target', 'setTarget', null),
  withProps(({ setVisible, setTarget, popover }) => ({
    show: (event) => {
      setTarget(event.target);
      setVisible(true);
    },
    hide: () => {
      const interval = setInterval(() => {
        const popoverParent = popover && popover.parentElement;
        const hoverPopover = popoverParent && popoverParent.querySelector(':hover');
        const isPopoverHovered = popover === hoverPopover;

        if (!isPopoverHovered) {
          setVisible(false);
          clearInterval(interval);
        }
      }, 200);
    },
  })),
)(ActivityAvatar);
