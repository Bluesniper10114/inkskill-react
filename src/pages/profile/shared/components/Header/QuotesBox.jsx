import React from 'react';
import branch from 'recompose/branch';
import renderNothing from 'recompose/renderNothing';
import { timeAgoShort } from 'core/utils/dates';
import TimeIcon from 'assets/svg/time-icon.svg';
import LikeIcon from 'assets/svg/like-icon.svg';
import SpeachIcon from 'assets/svg/speach-icon.svg';

const QuotesBox = ({ quote }) => (
  <div className="quotes-box">
    <div className="quotes-box-inner">
      <div className="top-box">
        {quote.text}
      </div>
      <div className="bottom-box clearfix">
        <div className="bottom-tip" />
        <div className="col-xs-6">
          <div className="group-inline">
            <span>{timeAgoShort(quote.createdAt)}</span>
            <TimeIcon />
          </div>
        </div>
        <div className="col-xs-6 text-right right-side">
          <div className="group-inline">
            <LikeIcon />
            <span>{quote.likes}</span>
          </div>
          <div className="group-inline">
            <SpeachIcon className="white" />
            <span>{quote.comments}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default branch(props => !props.quote, renderNothing)(QuotesBox);
