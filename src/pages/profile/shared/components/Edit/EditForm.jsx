import React from 'react';
import { TextField, TextArea } from 'core/modules/form';
import LocationField from 'core/components/LocationField';
import { getLocationString } from 'core/utils/profile';
import EditUrls from './EditUrlsContainer';

const EditForm = ({
  data,
  errors,
  onChange,
  onBlur,
}) => (
  <data className="edit-form">
    <div className="row">
      <div className="col-md-6">
        <div className="form-box">
          <TextField
            value={data.name}
            error={errors.name}
            name="name"
            placeholder="Name"
            onChange={onChange}
            onBlur={onBlur}
          />
          <LocationField
            value={getLocationString(data.location)}
            onChange={onChange}
          />
          <TextArea
            rows="7"
            name="bio"
            placeholder="Bio"
            value={data.bio}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-box right">
          <EditUrls
            urls={data.urls}
            errors={errors.urls}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  </data>
);

export default EditForm;
