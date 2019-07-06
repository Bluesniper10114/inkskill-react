/* eslint-disable default-case */

import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import update from 'immutability-helper';
import { validate, validateField, countErrors } from './validate';
import { createSelector } from 'reselect';


const INIT = 'form/INIT';
const RESET = 'form/RESET';
const CLEAR = 'form/CLEAR';
const CHANGE = 'form/CHANGE';
const VALIDATE = 'form/VALIDATE';
const CAN_SUBMIT = 'form/CAN_SUBMIT';
const allActions = [INIT, CHANGE, RESET, CAN_SUBMIT, VALIDATE, CLEAR];

function makeValidateAction(formId) {
  return (silent = true, field) => (dispatch, getState) => {
    const form = get(getState(), ['form', formId]);
    const result = field ? validateField(form, field) : validate(form);
    const meta = { form: formId };
    const canSubmit = !countErrors(result);

    dispatch({ meta, type: CAN_SUBMIT, payload: canSubmit });

    if (!silent) {
      dispatch({ meta, type: VALIDATE, payload: result });
    }

    return canSubmit;
  };
}

function getTouched(payload) {
  return mapValues(payload, () => true);
}

function handleChange(state, payload) {
  return update(state, {
    data: { $merge: payload },
    touched: { $merge: getTouched(payload) },
  });
}

function makeChangeAction(formId) {
  const actionValidate = makeValidateAction(formId);

  return change => (dispatch, getState) => {
    const form = get(getState(), ['form', formId]);
    const { errors } = form;
    const fields = Object.keys(change);
    const isSingle = fields.length === 1;
    const field = fields[0];

    dispatch({
      type: CHANGE,
      meta: { form: formId },
      payload: change,
    });

    if (isSingle && errors[field]) {
      dispatch(actionValidate(false, field));
    } else if (!isSingle) {
      console.warn('Please update the `change` action creator to support more than one field');
    }

    return handleChange(form, change);
  };
}

export function makeActions(form) {
  const makeAction = type => payload => ({
    type,
    meta: { form },
    payload,
  });

  return {
    init: makeAction(INIT),
    clear: makeAction(CLEAR),
    reset: makeAction(RESET),
    error: makeAction(VALIDATE),
    change: makeChangeAction(form),
    validate: makeValidateAction(form),
  };
}

const initialFormState = {
  data: {},
  errors: {},
  touched: {},
  canSubmit: true,
};

function formReducer(state = initialFormState, { type, payload }) {
  switch (type) {
    case INIT: return update(state, { $merge: payload });
    case CHANGE: return handleChange(state, payload);
    case CAN_SUBMIT: return update(state, { canSubmit: { $set: payload } });
    case VALIDATE: return update(state, { errors: { $merge: payload } });
    case CLEAR: return update(state, { data: { $set: {} } });
    case RESET: return update(state, {
      errors: { $set: {} },
      touched: { $set: {} },
      data: { $set: null },
    });
  }

  return state;
}

export default function (state = {}, action) {
  if (!allActions.includes(action.type)) return state;

  const { form } = action.meta;
  const formData = state[form];

  return update(state, { [form]: { $set: formReducer(formData, action) } });
}

const getForms = state => state.form;
const getForm = id => createSelector(getForms, forms => ({
  form: get(forms, [id], {}),
}));

export const selectors = {
  getForms,
  getForm,
};
