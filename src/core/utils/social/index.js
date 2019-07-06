import * as facebook from './facebook';
import * as instagram from './instagram';
import * as google from './google';
import * as twitter from './twitter';

const all = {
  fb: facebook,
  ig: instagram,
  gp: google,
  tw: twitter,
};

export const connectAccount = (type) => {
  const service = all[type];

  if (!service || !service.connectAccount) {
    Promise.reject(new Error(`Can not find '${type}' service`));
  }

  return service.connectAccount();
};
