// @flow

import React from 'react';
import Tabs, { Tab } from 'core/components/Tabs';
import NewsTabCard from 'core/components/NewsTabCard';

type Props = {
  featured: BlogPostInfo[],
  popular: BlogPostInfo[],
};

const NewsTabs = ({ popular, featured }: Props) => (
  <Tabs>
    <Tab label="Popular">
      <ul>
        {popular.map(item => (
          <NewsTabCard
            key={item.id}
            data={item}
          />
        ))}
      </ul>
    </Tab>
    <Tab label="Featured">
      <ul>
        {featured.map(item => (
          <NewsTabCard
            key={item.id}
            data={item}
          />
        ))}
      </ul>
    </Tab>
  </Tabs>
);

export default NewsTabs;
