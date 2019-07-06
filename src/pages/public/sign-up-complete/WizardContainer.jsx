import { graphql } from 'react-apollo';
import omit from 'lodash/omit';
import findIndex from 'lodash/findIndex';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { withAuth, onlyAuthorized } from 'core/utils/auth';
import withLoading from 'core/utils/loading';
import { cleanTypeNames } from 'core/utils/graphql';
import Wizard from './Wizard';
import CompleteSignUpMutation from './CompleteSignUp.graphql';


const artistSteps = [
  { id: 'general', title: 'General' },
  { id: 'bio', title: 'Bio' },
  { id: 'shop', title: 'Shop' },
  { id: 'images', title: 'Photos' },
  { id: 'videos', title: 'Videos' },
  { id: 'qa', title: 'Q&A' },
];

const enthusiastSteps = artistSteps.filter(s =>
  ['general', 'images', 'videos'].includes(s.id));

const getSteps = auth => (auth.role === 'artist' ? artistSteps : enthusiastSteps);
const getStepIndex = (active, steps) => findIndex(steps, { id: active });
const isLastStep = (active, steps) => getStepIndex(active, steps) === steps.length - 1;
const getAvailable = ({ auth }) => {
  const steps = getSteps(auth);
  const index = getStepIndex(auth.step, steps);

  return steps.slice(0, index + 1).map(s => s.id);
};
const concatAvailable = (available, stepId) => {
  if (available.includes(stepId)) {
    return available;
  }

  return available.concat(stepId);
};


export default compose(
  withAuth,
  withLoading(({ auth }) => auth.loading),
  onlyAuthorized,
  withState('active', 'setStep', ({ auth }) => auth.step),
  withState('available', 'setAvailable', getAvailable),
  withProps(({ auth, active }) => {
    const steps = getSteps(auth);
    return ({
      steps,
      activeIndex: getStepIndex(active, steps),
      isLast: isLastStep(active, steps),
    });
  }),
  graphql(CompleteSignUpMutation, {
    props: ({ mutate, ownProps }) => ({
      handleSubmit: formData => mutate({
        variables: {
          step: ownProps.active,
          data: formData.target ? {} : cleanTypeNames(formData),
        },
      }).then(({ data }) => {
        const result = data.completeSignUp;
        const nextData = result.step === ownProps.step ? omit(result, 'step') : result;
        const nextAvailable = concatAvailable(ownProps.available, result.step);

        ownProps.setAvailable(nextAvailable);
        ownProps.setStep(result.step);
        ownProps.updateAuth(nextData);
      }),
    }),
  }),
  withHandlers({
    nextStep: ({ setStep, setAvailable, available, activeIndex, steps }) => () => {
      const max = steps.length - 1;
      const nextIndex = Math.min(activeIndex + 1, max);
      const next = steps[nextIndex];
      const nextAvailable = concatAvailable(available, next.id);

      setAvailable(nextAvailable);
      setStep(next.id);
    },
    prevStep: ({ setStep, activeIndex, steps }) => () => {
      const prevIndex = Math.max(activeIndex - 1, 0);
      const prev = steps[prevIndex];

      setStep(prev.id);
    },
  })
)(Wizard);
