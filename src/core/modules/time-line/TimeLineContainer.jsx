import { withUsername } from 'core/utils/auth';
import withLoading from 'core/utils/loading';
import Wall from 'core/graphql/wall.graphql';
import TimeLine from './TimeLine';
import { graphql, compose } from 'react-apollo';

export default compose(
  withUsername,
  graphql(Wall, {
    options: ({ username }) => ({ variables: { username: username } }),
    props: ({ data }) => ({
      loading: data.loading,
      items: data.wall,
    }),
  }),
  withLoading(),
)(TimeLine);
