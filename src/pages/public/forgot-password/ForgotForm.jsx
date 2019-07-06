import React from 'react';
import { Spacer } from 'core/components';
import { TextField } from 'core/modules/form';
import Form from '../shared/components/Form';

const ForgotForm = ({
  data,
  errors,
  onChange,
  onSubmit,
}) => (
  <Form className="signup-box" onSubmit={onSubmit}>
    <Spacer />

    <TextField
      name="email"
      value={data.email}
      error={errors.email}
      placeholder="Email"
      onChange={onChange}
    />

    <div className="text-right">
      <button type="submit" className="btn btn-danger btn-lg">Submit</button>
    </div>
  </Form>
);

export default ForgotForm;
