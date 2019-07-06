/* eslint-disable class-methods-use-this */

import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { omit, defaults, get, isEqual } from 'lodash';
import createFactory from '../../utils/createFactory';
import { makeActions } from './state';
import createRecomposeHelper from "../../utils/createRecomposeHelper";


export const formatValidationError = (error) => {
  const errors = {};

  if (error.graphQLErrors) {
    return formatValidationError(error.graphQLErrors[0]);
  } else if (!error.details) {
    errors._summarized_ = error.error;
  } else {
    error.details.forEach((err) => {
      errors[err.path] = err.message;
    });
  }

  return errors;
};

// TODO add options validation
// TODO cover this component with tests
// TODO PoC: think about making fields connected to redux
const createForm = optionsIn => (BaseComponent) => {
  const factory = createFactory(BaseComponent);
  const options = defaults(optionsIn, {
    data: {},
    validation: {},
    autoSubmit: () => false,
    autoUpdate: false,
    autoClear: false,
  });

  function mapStateToProps(state) {
    return {
      form: state.form[options.form] || {
        errors: {},
        touched: {},
      },
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(makeActions(options.form), dispatch),
      dispatch,
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    componentWillMount() {
      this.props.actions.init(Object.assign({}, options, { data: this.getData() }));
    }

    componentDidMount() {
      if (options.instantValidation) {
        this.props.actions.validate();
      }
    }

    componentWillUnmount() {
      this.props.actions.reset();
    }

    componentWillReceiveProps(props) {
      if (!options.autoUpdate || typeof options.data !== 'function') return;

      const { form, actions } = this.props;
      const newData = options.data(props);

      if (!isEqual(form.data, newData)) {
        actions.change(newData);
      }
    }

    onChange = ({ target }) => {
      const { actions } = this.props;
      const { name, value } = target;
      const change = { [name]: value };
      const nextForm = actions.change(change);

      if (options.autoSubmit('change', name)) {
        this.submit({ autoSubmit: true }, nextForm);
      }
    };

    onBlur = ({ target }) => {
      const { actions } = this.props;
      const { name } = target;
      const isValid = actions.validate(false, name);

      if (isValid && options.autoSubmit('blur', name)) {
        this.submit({ autoSubmit: true });
      }
    };

    onSubmit = (event) => {
      event.preventDefault();
      this.submit();
    };

    onError = (err) => {
      this.props.actions.error(formatValidationError(err));
    };

    afterSubmit() {
      if (options.autoClear) {
        this.props.actions.clear();
      }
    }

    submit(meta, nextForm) {
      const { form, actions, dispatch } = this.props;
      const handleSubmit = options.handleSubmit || this.props.handleSubmit;
      const isValid = actions.validate(false);

      if (!isValid || !handleSubmit) return;

      let data = get(nextForm, 'data', form.data);
      if (meta) {
        data = Object.assign({}, data, { _meta: meta });
      }

      if (options.beforeSubmit) {
        data = options.beforeSubmit(data);
      }

      // TODO refactor try/catch below
      try {
        const action = handleSubmit(data);

        if (typeof action === 'function' || action.type) {
          dispatch(action)
            .then(() => this.afterSubmit())
            .catch((err) => {
              this.onError(err);
            });
        } else if (action.then) {
          action
            .then(() => this.afterSubmit())
            .catch((err) => {
              this.onError(err);
            });
        } else {
          this.afterSubmit();
        }
      } catch (err) {
        this.onError(err);
      }
    }

    getData() {
      const { form } = this.props;
      if (form.data) return form.data;

      const data = options.data;
      if (typeof data === 'function') {
        return data(this.props);
      }

      return data;
    }

    render() {
      const props = omit(this.props, 'form', 'actions');
      const { form } = this.props;
      const data = this.getData();

      return factory({
        ...props,
        data,
        errors: form.errors || {},
        canSubmit: form.canSubmit,
        validate: this.validate,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onSubmit: this.onSubmit,
        onError: this.onError,
      });
    }
  });
};

export default createRecomposeHelper(createForm, 'form');
