import React from 'react';
import withState from 'recompose/withState';
import { graphql, compose } from 'react-apollo';
import { Spinner } from 'core/utils/loading';
import SocialIcon from 'core/components/SocialIcon';
import UseAvatarMutation from '../../graphql/UseAvatar.graphql';


const UsePicture = ({ type, loading, onClick }) => (
  <label className="use-picture" onClick={onClick}>
    Use <SocialIcon type={type} /> picture
    {loading && <Spinner />}
  </label>
);

export default compose(
  withState('loading', 'setLoading', false),
  graphql(UseAvatarMutation, {
    props: ({ mutate, ownProps }) => ({
      onClick: () => {
        const { type, setLoading } = ownProps;

        setLoading(true);
        return mutate({
          variables: { service: type },
        }).then(() => setLoading(false));
      },
    }),
  })
)(UsePicture);
