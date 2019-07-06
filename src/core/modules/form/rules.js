/* eslint-disable no-confusing-arrow */

// TODO clean up this file

const REGEXP_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const REGEXP_URL = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi;

// this is not a rule!
export const combine = (...rules) => value =>
  value && rules.reduce((error, rule) => error || rule(value), undefined);

export const required = value => (value ? undefined : 'Required');

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const length = (min, max) => combine(minLength(min), maxLength(max));

export const oneOf = (...allowed) => value =>
  !allowed.includes(value) ? `Must be one of: ${allowed.join(', ')}` : undefined;

export const email = value =>
  value && !REGEXP_EMAIL.test(value) ? 'Invalid email address' : undefined;

// odd bug: if we use without `new RegExp` it doesn't work correctly
export const url = value =>
  value && !(new RegExp(REGEXP_URL).test(value)) ? 'Invalid URL' : undefined;

const notInkskill = value =>
  value.indexOf('inkskill.com') !== -1
    ? 'InkSkill links are not allowed'
    : undefined;

export const externalUrl = combine(url, notInkskill);

export const youtube = combine(url, value =>
  value.indexOf('youtube.com/watch?v=') < 0
    ? 'Please enter valid youtube url'
    : undefined
);

export const equal = field => (value, data) =>
  value && data[field] && data[field] !== value
    ? `Must be matching with ${field}`
    : undefined;

export const related = field => `validate:${field}`;
