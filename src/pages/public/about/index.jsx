// @flow

import React from 'react';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';
import Content from './Content';

type Props = {
  aboutpage: SitePage,
  team: TeamMember[],
};

const Index = ({
  aboutpage,
  team,
}: Props) => (
  <Page>
    <HeroTitle className="about-us">{aboutpage.title}</HeroTitle>
    <Spacer type="tall" />
    <Content content={aboutpage.content} team={team} />
    <Spacer type="tall" />
  </Page>
);

export default Index;
