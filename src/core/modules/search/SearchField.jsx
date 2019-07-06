import React from 'react';
import classNames from 'classnames';
import SuggestionList from './SuggestionList';


const SearchField = ({
  term,
  suggestions,
  showList,
  className,
  onChange,
  onSelect,
}) => (
  <div className={classNames('search-field', className)}>
    <input
      type="text"
      className="form-control"
      placeholder="Search By Name"
      value={term}
      onChange={onChange}
    />
    <SuggestionList visible={showList} items={suggestions} onSelect={onSelect} />
  </div>
);


export default SearchField;
