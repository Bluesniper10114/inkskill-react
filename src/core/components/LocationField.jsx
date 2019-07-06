import React from 'react';
import find from 'lodash/find';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { graphql } from 'react-apollo';
import Typeahead from 'core/components/Typeahead';
import SearchLocationQuery from 'core/graphql/SearchLocation.graphql';
import { getLocationString } from 'core/utils/profile';

const LocationField = ({
  value,
  error,
  suggestions,
  onType,
  onSelect,
  onBlur,
}) => (
  <Typeahead
    className="form-group"
    name="location"
    value={value}
    error={error}
    placeholder="Location"
    suggestions={suggestions}
    onChange={onType}
    onBlur={onBlur}
    onSelect={onSelect}
  />
);

export default compose(
  withState('query', 'setQuery', ''),
  graphql(SearchLocationQuery, {
    skip: ({ query }) => query.length < 3,
    options: ({ query }) => ({
      variables: { query },
      fetchPolicy: 'network-only',
    }),
    props: ({ data }) => ({
      locations: data.searchLocation,
      suggestions: (data.searchLocation || []).map(item => ({
        id: item.gid,
        label: getLocationString(item),
      })),
    }),
  }),
  withHandlers({
    onType: ({ setQuery }) => ({ value }) => setQuery(value),
    onSelect: ({ onChange, locations }) => ({ id }) => onChange({
      target: {
        name: 'location',
        value: find(locations, { gid: id }),
      },
    }),
  })
)(LocationField);
