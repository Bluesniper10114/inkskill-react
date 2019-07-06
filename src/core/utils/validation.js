import { Component } from 'react';
import { shallowEqual } from 'recompose';
import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';

const withValidation = options => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        errors: {},
        touched: {},
      };

      this.canSave = this.canSave.bind(this);
      this.hasErrors = this.hasErrors.bind(this);
      this.reset = this.reset.bind(this);
      this.validate = this.validate.bind(this);
      this.validateAll = this.validateAll.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) ||
        !shallowEqual(this.state.errors, nextState.errors) ||
        !shallowEqual(this.state.touched, nextState.touched);
    }

    reset() {
      this.setState({
        errors: {},
        touched: {},
      });
    }

    // eslint-disable-next-line
    countErrors(errors) {
      return Object.keys(errors)
        .map(key => errors[key])
        .filter(error => !!error)
        .length;
    }

    hasErrors() {
      const { errors } = this.state;
      return this.countErrors(errors) > 0;
    }

    canSave() {
      return !this.hasErrors();
    }

    validate(name, data) {
      const { touched } = this.state;
      const value = data[name];
      let errors = this.state.errors;

      if (value !== undefined) {
        touched[name] = true;
        this.setState({ touched });
        errors = this.validateOne(data, name);
      }

      this.setState({ errors });
    }

    validateOne(data, key, force = false) {
      const { errors, touched } = this.state;

      if (!touched[key] && !force) return errors;

      const validator = options[key];
      if (!validator) {
        // eslint-disable-next-line no-console
        console.warn(`There is no validation for the '${key}' field`);
        return errors;
      }

      const value = data[key];
      const error = validator(value, data);

      return {
        ...errors,
        [key]: error,
      };
    }

    validateAll(data) {
      let errors = this.state.errors;

      Object.keys(options).forEach((field) => {
        errors = {
          ...errors,
          ...this.validateOne(data, field, true),
        };
      });

      this.setState({ errors });
      return this.countErrors(errors) === 0;
    }

    render() {
      return factory({
        ...this.props,
        ...this.state,
        canSave: this.canSave,
        hasErrors: this.hasErrors,
        reset: this.reset,
        validate: this.validate,
        validateAll: this.validateAll,
      });
    }
  };
};

export default createHelper(withValidation, 'withValidation');
