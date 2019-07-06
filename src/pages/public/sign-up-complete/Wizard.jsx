import React from 'react';
import classNames from 'classnames';
import ActiveStep from './ActiveStep';

const StepButton = ({ step, active, available, onClick }) => (
  <li
    key={step.id}
    className={classNames({ active, available })}
    onClick={() => available && onClick(step.id)}
  >
    {step.title}
  </li>
);

const Wizard = ({
  steps,
  active,
  available,
  isLast,
  prevStep,
  nextStep,
  setStep,
  handleSubmit,
}) => (
  <div className="wizard">
    <div className="container">
      <ul className="steps">
        {steps.map(step => (
          <StepButton
            key={step.id}
            step={step}
            active={active === step.id}
            available={available.includes(step.id)}
            onClick={setStep}
          />
        ))}
      </ul>
    </div>
    <ActiveStep
      step={active}
      isLast={isLast}
      onPrev={prevStep}
      onNext={nextStep}
      handleSubmit={handleSubmit}
    />
  </div>
);

export default Wizard;
