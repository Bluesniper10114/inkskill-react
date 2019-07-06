import React from 'react';
import find from 'lodash/find';
import compose from 'recompose/compose';
import { graphql } from 'react-apollo';
import { form, RadioGroup } from 'core/modules/form';
import ReportPostMutation from 'core/graphql/ReportPost.graphql';

const PROBLEMS = [
  { id: 'sensitive', label: 'It displays a sensitive image' },
  { id: 'abusive', label: 'It\'s abusive or harmful' },
];

const Modal = ({ data, errors, onChange, onClose, onSubmit }) => (
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">Report</h4>
    </div>

    <div className="modal-body">
      <h5>Help us understand the problem. What is going wrong with this post?</h5>
      <RadioGroup
        name="problem"
        value={data.problem}
        error={errors.problem}
        options={PROBLEMS}
        onChange={onChange}
      />
    </div>

    <div className="modal-footer">
      <button className="btn btn-default" onClick={onClose}>Cancel</button>
      <button className="btn btn-danger" onClick={onSubmit}>Report</button>
    </div>
  </div>
);

export default compose(
  graphql(ReportPostMutation, {
    props: ({ mutate, ownProps }) => ({
      handleSubmit: ({ problem }) => {
        const problemLabel = find(PROBLEMS, { id: problem }).label;
        return mutate({
          variables: { id: ownProps.post._id, problem: problemLabel },
        }).then(() => {
          ownProps.onClose();
          alert('Thanks for letting us know.');
        });
      },
    }),
  }),
  form({
    form: 'report_post',
    rules: {
      problem: ['required'],
    },
  }),
)(Modal);
