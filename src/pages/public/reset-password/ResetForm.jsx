import React from 'react';
import { Spacer } from 'core/components';
import { TextField } from 'core/modules/form';
import Form from '../shared/components/Form';

const ResetForm = ({
  data,
  errors,
  onChange,
  onSubmit,
  params,
}) => (
  <Form
    className="signup-box"
    onSubmit={(e) => {
      e.preventDefault();
      console.log('Reset password form data: ', data);
      if (data && typeof data === 'object') {
        Object.assign(data, { token: params.token });
      } else {
        return false;
      }
      // Compare password and confirm fields
      if (data.password !== data.confirm) {
        console.error('Passwords do not match with each other...');
        return false;
      }
      return onSubmit(e);
    }}
  >
    <Spacer />

    <TextField
      name="password"
      type="password"
      value={data.password}
      error={errors.password}
      placeholder="Password"
      onChange={onChange}
    />

    <TextField
      name="confirm"
      type="password"
      value={data.confirm}
      error={errors.confirm}
      placeholder="Confirm password"
      onChange={onChange}
    />

    <div className="text-right">
      <button type="submit" className="btn btn-danger btn-lg">Submit</button>
    </div>
  </Form>
);

export default ResetForm;
