// @flow

import React from 'react';
import { Avatar, Spacer, Link } from 'core/components';
import Dropdown from 'core/components/Dropdown';
import Button from 'core/components/Dropdown/Button';
import Page from 'core/components/PublicPage';
import Ads from 'core/components/Ads';
import SocialLink from 'core/components/SocialLink';
import { FB_APP_ID } from 'core/config/env';
import Carousel from './Carousel';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import SubscribeNewsletterForm from './SubscribeNewsletterForm';
import { FacebookProvider, Comments } from 'react-facebook';

import adsH from 'assets/img/ads-h-1.png';
import adsV from 'assets/img/ads-v-1.png';


const SHARE_MENU = [
  { id: 1, label: 'Action' },
  { id: 2, label: 'Another action' },
  { id: 3, label: 'Something else here' },
  '---',
  { id: 4, label: 'Separated link' },
];

const button = ({ onClick }) => (
  <Button className="btn-light-gray" onClick={onClick}>Share</Button>
);

type Props = {
  blog: BlogPost,
  authordetail: Author,
};

const Index = ({
  blog,
  authordetail: author,
}: Props) => (
  <Page paddingBottom={false}>
    <Spacer type="tall hidden-xs hidden-sm" />
    <Spacer type="hidden-md" />

    <h2 className="blog-title text-center text-capitalize">{blog.post_title}</h2>

    <div className="blog-stats inline-group">
      <span className="date">{blog.modified}</span>
      <span className="tags">IN CULTURE, LIFESTYLE</span>
      <span className="author">{author.first_name} {author.last_name}</span>
    </div>

    <Spacer />
    <Spacer type="tall hidden-sm hidden-xs" />

    {
      blog.t_media.length > 0 &&
      <div className="container is-slide">
        <div className="row">
          <div className="col-xs-12">
            <Carousel items={blog.t_media} />
          </div>
        </div>
      </div>
    }

    <Spacer type="tall hidden-xs hidden-sm" />
    <Spacer type="hidden-md" />

    { blog.t_media.length > 0 && (
      <div className="inline-group text-center">
        <span className="divider red-col" />
      </div>
    )}

    <Spacer type="tall hidden-xs hidden-sm" />
    <Spacer type="hidden-md" />

    <div className="container blog-cage">
      <div className="row">
        <div className="col-md-8">
          <div
            className="blog-read"
            dangerouslySetInnerHTML={{ __html: blog.post_content.replace(/ng-/img, '') }}
          />
          <div className="tags-box">
            <ul className="list-inline">
              <li><Link>Studio</Link></li>
              <li><Link>News</Link></li>
              <li><Link>Tutorial</Link></li>
            </ul>
          </div>
          <div className="share-box">
            <div className="btn-group is-style">
              <Dropdown
                button={button}
                items={SHARE_MENU}
                onSelect={id => console.log(id)}
              />
            </div>
            <ul className="list-inline group-inline">
              <SocialLink type="tw" href="#" />
              <SocialLink type="fb" href="#" />
              <SocialLink type="gp" href="#" />
            </ul>
          </div>
          {/*
          <div className="author-box inline-group">
            <Avatar image={author.avatar} />
            <div className="text-box">
              <h6 className="name">{author.first_name} {author.last_name}</h6>
              <p className="bio">{author.description}</p>
              <ul className="list-inline">
                <SocialLink to={`/ink/${author.user_login}`} />
                <SocialLink type="fb" href={author.facebook_url} />
                <SocialLink type="tw" href={author.twitter_url} />
                <SocialLink type="gp" href={author.google_plus_url} />
                <SocialLink type="ig" href={author.instagram_url} />
              </ul>
            </div>
          </div>
          */}

          <SubscribeNewsletterForm />
          <Ads href="#" image={adsH} />

          {/*
          <CommentList />
          */}

        </div>
        <div className="col-md-4">
          <Ads href="#" image={adsV} />
          <Ads href="#" image={adsV} />
          <Ads href="#" image={adsV} />
        </div>
      </div>
    </div>

    {/*
    <SubscribeNewsletterForm />

    <CommentForm />
    */}

    <div className="facebook-comment-form">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <FacebookProvider appId={FB_APP_ID}>
              <Comments href="http://www.facebook.com" />
            </FacebookProvider>
          </div>
        </div>
      </div>
    </div>
  </Page>
);

export default Index;
