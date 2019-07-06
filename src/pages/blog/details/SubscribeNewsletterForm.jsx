import React from 'react';
import { form, TextField } from 'core/modules/form';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import SubscribeNewsletterMutation from "../shared/graphql/SubscribeNewsletter.graphql";

const SubscribeNewsletterForm = ({
  data,
  errors,
  onChange,
  onSubmit,
}) => (
  <div className="subscribe-form">
    <form onSubmit={onSubmit}>
      <h4 className="text-center">Subscribe our Newsletter</h4>
      <TextField
        type="text"
        name="email"
        value={data.email}
        error={errors.email}
        placeholder="Email"
        onChange={onChange}
      />
      <div className="text-right">
        <button type="submit" className="btn btn-danger">Subscribe</button>
      </div>
    </form>
  </div>
);

export default compose(
  graphql(SubscribeNewsletterMutation, {
    props: ({ mutate }) => ({
      handleSubmit: ({ email }) => mutate({
        variables: { email },
      }).then(() => alert('Thanks for subscribe.')),
    }),
  }),
  form({
    form: 'bolg_post_subscribe',
    autoClear: true,
    rules: {
      email: ['required', 'email'],
    },
  }),
)(SubscribeNewsletterForm);
