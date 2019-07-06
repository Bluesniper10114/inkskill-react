import React from 'react';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';

const TagList = ({ tags }) =>
  <div className="tags-box">
    <ul className="list-inline">
      {tags.map(tag =>
        <li
          key={get(tag, '_id')}
        >
          <a>{capitalize(get(tag, 'tag'))}</a>
        </li>
      )}
    </ul>
  </div>;

export default TagList;
