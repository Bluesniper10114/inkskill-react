import React from 'react';
import { withState } from 'recompose';

export const Tab = ({ children }) => (
  <div
    role="tabpanel"
    className="tab-pane fade in active"
  >
    {children}
  </div>
);


const Tabs = ({ children, current, setTab }) => {
  const nodes = Array.isArray(children) ? children : [children];
  const tabs = nodes.filter(tab => tab.type === Tab);

  return (
    <div className="news-tab">

      <ul className="nav nav-tabs" role="tablist">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={index === current ? 'active' : ''}
            onClick={() => setTab(index)}
          >
            {tab.props.label}
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {tabs[current]}
      </div>
    </div>
  );
};

const enhancer = withState('current', 'setTab', 0);

export default enhancer(Tabs);
