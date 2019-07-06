import React from 'react';
import { graphql, compose } from 'react-apollo';
import { form, TextField } from 'core/modules/form';
import UpdateProfileMutation from '../../graphql/UpdateProfile.graphql';

const Modal = ({
  data,
  errors,
  onChange,
  onClose,
  onSubmit,
}) => (
  <div className="modal-content">
    <form onSubmit={onSubmit}>
      <div className="modal-header">
        <button type="button" className="close" onClick={onClose}>
          <span>&times;</span>
        </button>
        <h4 className="modal-title">Enter your personal website URL</h4>
      </div>

      <div className="modal-body">
        <TextField
          type="text"
          name="web"
          value={data.web}
          error={errors.web}
          placeholder="URL"
          onChange={onChange}
        />
      </div>

      <div className="modal-footer">
        <div className="text-right">
          <button className="btn btn-default" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default compose(
  graphql(UpdateProfileMutation, {
    props: ({ mutate, ownProps }) => ({
      handleSubmit: data => mutate({
        variables: { data: { urls: data } },
      }).then(() => ownProps.onClose()),
    }),
  }),
  form({
    form: 'edit_web_url',
    autoClear: true,
    rules: {
      web: ['required', 'externalUrl'],
    },
  })
)(Modal);
