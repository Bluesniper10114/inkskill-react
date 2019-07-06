import React from 'react';
import { ROLE_OPTIONS } from 'core/constants';
import { getLocationString } from 'core/utils/profile';
import { TextField, RadioGroup } from 'core/modules/form';
import UploadAvatar from '../../profile/shared/components/Header/UploadAvatar';
import LocationField from 'core/components/LocationField';
import StepContent from './StepContent';
import FormButtons from './FormButtons';

// TODO ask user for only fields he doesn't fill when sign-up
const General = ({
  auth,
  data,
  errors,
  canSubmit,
  onChange,
  onBlur,
  onSubmit,
}) => (
  <div className="container">
    <StepContent>
      <div className="avatar-wrapper">
        <UploadAvatar className="profile-pic" user={auth} />
      </div>

      {<RadioGroup
        name="role"
        value={data.role}
        error={errors.role}
        title="What type of user are you?"
        options={ROLE_OPTIONS}
        onChange={onChange}
        onBlur={onBlur}
      />}

      <TextField
        name="username"
        value={data.username}
        error={errors.username}
        placeholder="Username"
        onBlur={onBlur}
        onChange={onChange}
      />
      <TextField
        name="name"
        value={data.name}
        error={errors.name}
        placeholder="Name"
        onBlur={onBlur}
        onChange={onChange}
      />
      <LocationField
        value={getLocationString(data.location)}
        error={errors.location}
        onBlur={onBlur}
        onChange={onChange}
      />
    </StepContent>
    <FormButtons
      className="with-offset"
      canNext={canSubmit}
      onNext={onSubmit}
    />
  </div>
);

export default General;
