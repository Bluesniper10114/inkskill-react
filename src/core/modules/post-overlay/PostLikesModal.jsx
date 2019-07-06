import React from 'react';
import { graphql } from 'react-apollo';
import { Spinner } from 'core/utils/loading';
import UserList from 'core/components/UserList';
import PostLikes from 'core/graphql/PostLikes.graphql';


const Modal = ({ people, onClose }) => (
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">People</h4>
    </div>

    <div className="modal-body">
      <div className="list-container">
        {people ? <UserList users={people} /> : <Spinner />}
      </div>
    </div>
  </div>
);

export default graphql(PostLikes, {
  options: props => ({
    variables: {
      postId: props.postId,
    },
  }),
  props: ({ data }) => ({
    people: !data.loading && data.post.likedBy,
  }),
})(Modal);
