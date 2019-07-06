import React from 'react';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import NewsList from '../shared/components/NewsList';
import LineGallery from '../shared/components/LineGallery';
import { SearchBox } from 'core/modules/search';
import Hero from './Hero';

const Index = ({ posts, blog }) => (
  <Page>
    <Hero />
    <SearchBox />
    <Spacer type="tall" />
    <NewsList items={blog} />
    <Spacer type="tall" />
    <LineGallery items={posts} />
  </Page>
);

export default Index;
