import React from 'react';
import { TextArea } from 'core/modules/form';
import StepContent from './StepContent';
import FormButtons from './FormButtons';

const Bio = ({
  data,
  errors,
  canSubmit,
  onChange,
  onBlur,
  onSubmit,
  onPrev,
}) => (
  <div className="container">
    <StepContent>
      <TextArea
        name="bio"
        value={data.bio}
        error={errors.bio}
        placeholder="Bio"
        rows="6"
        onBlur={onBlur}
        onChange={onChange}
      />
    </StepContent>
    <FormButtons
      className="with-offset"
      canNext={canSubmit}
      onNext={onSubmit}
      onPrev={onPrev}
    />
  </div>
);

export default Bio;
