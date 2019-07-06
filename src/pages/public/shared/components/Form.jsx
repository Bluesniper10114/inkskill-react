import React from 'react';
import { Spacer } from 'core/components';

const Form = ({ children, className, onSubmit }) => (
  <div className="container">
    <div className={className}>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
              <form onSubmit={onSubmit}>
                <Spacer type="giant hidde" />
                {children}
                <Spacer type="tall hidde" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Form;
