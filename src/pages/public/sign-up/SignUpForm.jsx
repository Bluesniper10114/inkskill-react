import React from 'react';
import { ROLE_OPTIONS, GENDER_OPTIONS } from 'core/constants';
import { Spacer } from 'core/components';
import { TextField, RadioGroup } from 'core/modules/form';
import FacebookButton from '../shared/components/FacebookButton';
import Form from '../shared/components/Form';


const SignUpForm = ({
  data,
  errors,
  viaEmail,
  toggleVisibility,
  onChange,
  onBlur,
  onSubmit,
  onFacebook,
}) => (
  <Form className="signup-box" onSubmit={onSubmit}>
    <FacebookButton onClick={onFacebook}>
      Sign up with Facebook
    </FacebookButton>

    <Spacer />
    <div className="text-center">
      Or via <span className="link-red" onClick={toggleVisibility}>email</span>
    </div>
    <Spacer />

    {viaEmail && <div>
      <RadioGroup
        name="role"
        value={data.role}
        error={errors.role}
        title="What type of user are you?"
        options={ROLE_OPTIONS}
        onChange={onChange}
      />

      <RadioGroup
        name="gender"
        value={data.gender}
        error={errors.gender}
        title="Gender"
        options={GENDER_OPTIONS}
        inline
        onChange={onChange}
      />

      <TextField
        name="username"
        value={data.username}
        error={errors.username}
        placeholder="Username"
        onBlur={onBlur}
        onChange={onChange}
      />

      <TextField
        name="email"
        type="email"
        value={data.email}
        error={errors.email}
        placeholder="Email Address"
        onBlur={onBlur}
        onChange={onChange}
      />

      <TextField
        name="password"
        type="password"
        value={data.password}
        error={errors.password}
        placeholder="Password"
        onBlur={onBlur}
        onChange={onChange}
      />

      <TextField
        name="passwordConfirm"
        type="password"
        value={data.passwordConfirm}
        error={errors.passwordConfirm}
        placeholder="Confirm Password"
        onBlur={onBlur}
        onChange={onChange}
      />

      <div className="text-right">
        <button
          className="btn btn-danger btn-lg"
          type="submit"
        >
          Register
        </button>
      </div>
    </div>}
  </Form>
);

export default SignUpForm;
