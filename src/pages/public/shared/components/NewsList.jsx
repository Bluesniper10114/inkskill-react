import React from 'react';
import NewsCard from 'core/components/NewsCard';

const NewsList = ({ items }) => (
  <section>
    <div className="container">
      <div className="news-list">
        {items.map(item => (
          <NewsCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  </section>
);

export default NewsList;
