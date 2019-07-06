import React from 'react';
import { Spacer } from 'core/components';
import SearchBox from './SearchBoxContainer';

const SearchForm = () => (
  <div>
    <h1 className="main-title text-center">FIND THE BEST ARTIST NEARBY</h1>
    <Spacer type="tall" />
    <SearchBox isOverlay />
  </div>
);

export default SearchForm;
