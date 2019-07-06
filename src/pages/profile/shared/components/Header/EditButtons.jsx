import classNames from 'classnames';
import React from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import { selectors as forms } from 'core/modules/form';
import { graphql } from 'react-apollo';
import { toggleEditForm } from '../../utils';
import UpdateProfileMutation from '../../graphql/UpdateProfile.graphql';

const EditButtons = ({
  form,
  className,
  onEdit,
  onSave,
  onCancel,
}) => (
  <div className={classNames('group-inline small-btn-group', className)}>
    <button className="btn btn-gray edit-trigger-btn" onClick={onEdit}>EDIT</button>
    <div className="group edit-btn-group">
      <button className="btn btn-gray" onClick={onCancel}>CANCEL</button>{' '}
      <button
        className="btn btn-danger"
        onClick={onSave}
        disabled={!form.canSubmit}
      >
        SAVE
      </button>
    </div>
  </div>
);

export default compose(
  connect(forms.getForm('edit_profile')),
  graphql(UpdateProfileMutation, {
    props: ({ mutate }) => ({
      handleSubmit: data => mutate({
        variables: {
          data: omit(pick(data, 'name', 'bio', 'location', 'urls.web'), 'location.__typename'),
        },
      }),
    }),
  }),
  withHandlers({
    onEdit: () => () => toggleEditForm(true),
    onCancel: () => () => toggleEditForm(),
    onSave: ({ form, handleSubmit }) => () => {
      toggleEditForm();
      handleSubmit(form.data);
    },
  }),
)(EditButtons);
