import sortBy from 'lodash/sortBy';
import mapValues from 'lodash/mapValues';
import { graphql } from 'react-apollo';
import StylesQuery from 'core/graphql/Styles.graphql';

export const cleanTypeNames = (data = {}) => mapValues(data, (value, key) => {
  if (Array.isArray(value)) {
    return value.map(cleanTypeNames);
  }

  if (typeof value === 'object' && value !== null) {
    return cleanTypeNames(value);
  }

  return key === '__typename' ? undefined : value;
});

// TODO find a better place for this HoC
export const withStyles = graphql(StylesQuery, {
  props: ({ data }) => ({
    styles: sortBy(data.styles || [], 'name'),
  }),
});
