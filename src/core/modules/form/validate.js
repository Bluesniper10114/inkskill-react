// @flow

import partition from 'lodash/partition';
import * as rulesMap from './rules';

// eslint-disable-next-line no-unused-vars
const noop = (value: any, data: Object) => {};

type Form = {
  data: Object,
  rules: Object,
  errors: Object,
  touched: Object,
};

export const parseRule = (ruleString: string) => {
  const [name, paramsString] = ruleString.split(':');
  const rule = rulesMap[name];

  if (!rule) {
    console.error(`Rule '${name}' is not found`);
    return noop;
  }

  if (paramsString) {
    const params = paramsString.split(',');
    return rule(...params);
  }

  return rule;
};

export const countErrors = (errors: Object): number => Object.keys(errors || {})
  .map(key => errors[key])
  .reduce((count, error) => {
    const isTree = typeof error === 'object';
    const number = isTree ? countErrors(error) : +!!error;

    return count + number;
  }, 0);

export const validateField = (form: Form, field: string) => {
  const { data, rules } = form;
  const nextErrors = {};
  const fieldRules = (rules[field] || []);

  if (!Array.isArray(fieldRules)) {
    // eslint-disable-next-line no-use-before-define
    return validateTreeField(form, field);
  }

  const value = data[field];
  const rulesHandler = (error, rule: Function) => error || rule(value, data);
  const [commands, parsedRules] = partition(
    fieldRules.map(parseRule),
    rule => typeof rule === 'string'
  );

  nextErrors[field] = parsedRules.reduce(rulesHandler, undefined);

  return commands.reduce((errors, command) =>
    // eslint-disable-next-line no-use-before-define
    Object.assign(errors, executeRule(form, command)), nextErrors);
};

export const validate = (form: Form) => {
  const { errors, rules } = form;
  const fields = Object.keys(rules);
  let nextErrors = Object.assign({}, errors, { _summarized_: undefined });

  fields.forEach((field) => {
    nextErrors = Object.assign(nextErrors, validateField(form, field));
  });

  return nextErrors;
};

function validateTreeField(form: Form, field: string) {
  const { rules, data, errors, touched } = form;
  const treeForm: Form = {
    rules: rules[field],
    data: data[field],
    errors: errors[field] || {},
    touched: touched[field] || {},
  };

  return Object.assign({}, errors, {
    [field]: validate(treeForm),
  });
}

function executeRule(form: Form, rule) {
  const { touched } = form;
  const [command, field] = rule.split(':');
  let nextErrors = {};

  if (command === 'validate' && touched[field]) {
    nextErrors = Object.assign(nextErrors, validateField(form, field));
  }

  return nextErrors;
}
