// @flow

import values from 'lodash/values';
import pick from 'lodash/pick';

export const getLocationString = (location: Location) =>
location && values(pick(location, 'city', 'state', 'country'))
  .filter(v => v)
  .join(', ');


export const getProfileUrl = (user: UserBase) => `/ink/${user.username}`;

export const getCurrentProfileUrl = (user: UserBase) => {
  if (user.step) {
    return '/sign-up/complete';
  } else if (!user.isVerified) {
    return '/sign-up/verify';
  }

  return getProfileUrl(user);
};
