import { describe, it } from 'mocha';
import { expect } from 'chai';
import { validate, validateField, parseRule, countErrors } from './validate';

// TODO these tests should not know about exact validation messages

const signUpForm = {
  data: { role: 'artist', gender: 'male' },
  errors: {},
  touched: {},
  canSave: true,
  form: 'sign_up',
  rules: {
    role: ['required', 'oneOf:artist,enthusiast'],
    email: ['required', 'email'],
    gender: ['required', 'oneOf:male,female'],
    username: ['required', 'length:3'],
    password: ['required', 'length:6', 'related:passwordConfirm'],
    passwordConfirm: ['required', 'length:6', 'equal:password'],
  },
};

const profileEditForm = {
  data: { name: 'User Name', urls: { web: 'http://localhost' } },
  errors: {},
  touched: {},
  canSave: true,
  form: 'profile_edit',
  rules: {
    name: ['required', 'length:3,30'],
    urls: {
      web: ['externalUrl'],
    },
  },
};

describe('core/modules/form/validate', () => {
  it('should validate a single field', () => {
    const data = { email: 'wrong@email' };
    const localForm = Object.assign({}, signUpForm, { data });
    const errors = validateField(localForm, 'email');

    expect(errors).to.be.a('object');
    expect(errors).to.have.property('email', 'Invalid email address');
    expect(errors.username).to.equal(undefined); // make sure other fields didn't validate
  });

  it('should not mutate form props', () => {
    const data = { email: 'wrong@email' };
    const localForm = Object.assign({}, signUpForm, { data });
    const errors = validateField(localForm, 'email');
    expect(errors).to.be.a('object');
    expect(errors).to.have.property('email', 'Invalid email address');

    expect(localForm.errors).to.be.a('object');
    expect(localForm.errors.email).to.equal(undefined);
  });

  it('should validate touched related fields', () => {
    const untouched = Object.assign({}, signUpForm, {
      data: { password: 'password', passwordConfirm: '' },
      touched: { password: true },
    });
    const touched = Object.assign({}, signUpForm, {
      data: { password: 'password', passwordConfirm: 'passw0rd' },
      touched: { password: true, passwordConfirm: true },
    });

    const errors1 = validateField(untouched, 'password');
    expect(errors1.passwordConfirm).to.equal(undefined);

    const errors2 = validateField(touched, 'password');
    expect(errors2.passwordConfirm).to.equal('Must be matching with password');
  });

  it('should validate all form data', () => {
    const errors = validate(signUpForm);

    expect(errors).to.be.a('object');
    expect(errors).to.have.property('username', 'Required');
    expect(errors.gender).to.equal(undefined);
  });

  it('should validate tree-values', () => {
    const errors = validate(profileEditForm);

    expect(errors).to.be.a('object');
    expect(errors).to.have.property('urls');
    expect(errors.urls).to.be.a('object');
    expect(errors.urls).to.have.property('web', 'Invalid URL');
  });

  describe('parseRule()', () => {
    it('should parse a rule correctly', () => {
      const rule = parseRule('email');
      expect(rule).to.be.a('function');
      expect(rule.length).to.equal(1); // expect one argument

      const result = rule('wrong@email');
      expect(result).to.equal('Invalid email address');
    });

    it('should parse a rule with params correctly', () => {
      const rule = parseRule('oneOf:male,female');
      expect(rule).to.be.a('function');
      expect(rule.length).to.equal(1); // expect one argument

      const try1 = rule('wrong value');
      const try2 = rule('male');

      expect(try1).to.eql('Must be one of: male, female');
      expect(try2).to.eql(undefined);
    });
  });

  describe('countErrors()', () => {
    it('should count errors correctly', () => {
      const errors = { email: 'Invalid email', username: undefined };

      expect(countErrors(errors)).to.equal(1);
    });

    it('should count tree-errors', () => {
      const errors = {
        name: 'Required',
        bio: undefined,
        urls: {
          web: 'Invalid',
          fb: undefined,
          gp: 'Invalid',
        },
      };

      expect(countErrors(errors)).to.equal(3);
    });
  });
});
