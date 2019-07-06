import React from 'react';
import { Spacer } from 'core/components';
import { TextField } from 'core/modules/form';
import Form from '../shared/components/Form';
import FacebookButton from '../shared/components/FacebookButton';

const LoginForm = ({
  data,
  errors,
  onChange,
  onSubmit,
  onFacebook,
}) => (
  <Form className="signup-box" onSubmit={onSubmit}>
    <FacebookButton onClick={onFacebook}>
      Sign in with Facebook
    </FacebookButton>

    <Spacer />
    <div className="text-center">or</div>
    <Spacer />

    {errors._summarized_ && <span className="error">{errors._summarized_}</span>}

    <TextField
      name="username"
      value={data.username}
      error={errors.username}
      placeholder="Username or Email"
      onChange={onChange}
    />

    <TextField
      name="password"
      type="password"
      value={data.password}
      error={errors.password}
      placeholder="Password"
      onChange={onChange}
    />

    <div className="text-right">
      <button type="submit" className="btn btn-danger btn-lg">Login</button>
    </div>
  </Form>
);

export default LoginForm;
