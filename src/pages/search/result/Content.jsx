import React from 'react';
import { Spacer } from 'core/components';
import NewsCard from 'core/components/NewsCard';

import PostingCard from './PostingCard';
import ProfileCard from './ProfileCard';
import ViewAll from './ViewAll';


const Content = () => (
  <div className="container single-page-box">
    <div className="row">
      <div className="col-md-2 name text-center">
        POST.
      </div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-6">
            <PostingCard />
          </div>
          <div className="col-md-6">
            <PostingCard />
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <ViewAll href="#" />
      </div>
    </div>

    <Spacer type="tall" />

    <div className="row">
      <div className="col-md-2 name text-center">
        USER.
      </div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-6">
            <ProfileCard />
          </div>
          <div className="col-md-6">
            <ProfileCard />
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <ViewAll href="#" />
      </div>
    </div>

    <Spacer type="tall" />

    <div className="row">
      <div className="col-md-2 name text-center">
        BLOG.
      </div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-6">
            <NewsCard />
          </div>
          <div className="col-md-6">
            <NewsCard />
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <ViewAll href="#" />
      </div>
    </div>

  </div>
);

export default Content;
