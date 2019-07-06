// @flow

import React from 'react';
import { compose } from 'react-apollo';
import { lifecycle, withHandlers } from "recompose";
import { Spacer } from 'core/components';
import Page from 'core/components/PublicPage';
import Title from 'core/components/Title';
import Ads from 'core/components/Ads';
import NewsTabs from './NewsTabs';
import BlogGallery from '../shared/components/BlogGallery';

import YouTubeHorizontal from 'assets/img/banner728x90-InkSkill-on-YouTube.jpg';
import facebookHorizontal from 'assets/img/banner728x90-InkSkill-on-Facebook.jpg';
import instagramHorizontal from 'assets/img/banner728x90-InkSkill-on-Instagram.jpg';
import twitterHorizontal from 'assets/img/banner728x90-InkSkill-on-Twitter.jpg';
import facebooVertical from 'assets/img/banner300x250-InkSkill-on-Facebook.jpg';

type Props = {
  list: BlogPostPreview[],
  featured: BlogPostPreview[],
  popular: BlogPostPreview[],
};

const Index = ({ list, featured, popular }: Props) => (
  <Page>
    <Spacer type="tall hidden-xs hidden-sm" />
    <Spacer type="hidden-md" />

    <Ads href="#" image={YouTubeHorizontal} />

    <Spacer type="tall hidden-xs hidden-sm" />
    <Spacer type="hidden-md" />

    <Title>BLOG</Title>

    <div className="container cage">
      <div className="row">
        <div className="col-md-8">
          <BlogGallery items={list} />
          <Spacer type="tall hidden-md" />
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12 col-sm-6 col-sm-offset-3 col-md-offset-0">
              <Ads href="#" image={facebooVertical} />
              <Spacer type="tall" />

              <NewsTabs featured={featured} popular={popular} />
              <Spacer type="tall" />

              <Ads href="#" image={facebooVertical} />
              <Spacer type="tall" />

              <Ads href="#" image={facebooVertical} />
              <Spacer type="tall" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Spacer type="tall" />
  </Page>
);

export default compose(
  withHandlers({
    addGallery: ({ list }) => () => {
      list.forEach(function (item) {
        const id = item.id;
        let images = item.media;
        if (images.length > 0) {
          images = images.slice(0, 3);
          const query = document.getElementsByClassName('IS-gallery-' + id);
          for (let item of query) {
            new Gallery({
              images,
              container: item,
              containerPlaceholder: document.getElementById('IS-placeholder-' + id),
              title: 'Gallery',
              showOverlay: true,
            });
          }
        }
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.addGallery(this.props.list);
    },
    componentDidUpdate() {
      this.props.addGallery(this.props.list);
    }
  })
)(Index);
