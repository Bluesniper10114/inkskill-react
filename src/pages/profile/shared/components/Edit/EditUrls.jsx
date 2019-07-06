import React from 'react';
import classNames from 'classnames';
import SocialIcon from 'core/components/SocialIcon';
import { Spinner } from 'core/utils/loading';
import Input from './Input';

const UrlField = ({
  type,
  error,
  value,
  onChange,
  onIconClick,
  onBlur,
}) => (
  <li>
    <div className="row">
      <div className="col-xs-2">
        <div className={classNames('img-box text-center', { link: type !== 'web' })} onClick={onIconClick}>
          <SocialIcon type={type} className="navi" />
        </div>
      </div>
      <div className="col-xs-10">
        <Input
          placeholder="URL"
          value={value}
          name={type}
          readOnly={type !== 'web'}
          onClick={onIconClick}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  </li>
);

const SOCIALS = ['fb', 'tw', 'gp', 'ig'];

const ProfileUrls = ({
  urls,
  errors = {},
  loading,
  linkAccount,
  onChange,
  onBlur,
}) => (
  <ul>
    <UrlField
      value={urls.web}
      type="web"
      error={errors && errors.web}
      onChange={onChange}
      onBlur={onBlur}
    />
    {SOCIALS.map(type => (
      <UrlField
        key={type}
        value={urls[type]}
        type={type}
        onIconClick={() => linkAccount(type)}
      />
    ))}
    {loading && <Spinner />}
  </ul>
);

export default ProfileUrls;
