import React from 'react';
import Tabs, { Tab } from 'core/components/Tabs';
import ReceivedList from './ReceivedListContainer';
import AuthoredList from './AuthoredListContainer';

const Index = ({ isOwner, isArtist }) => (
  <div className="row">
    <div className="col-md-10 col-md-offset-1">
      { isOwner ?
        <Tabs>
          { isArtist && <Tab label="Reviews for me">
            <ReceivedList />
          </Tab> }
          <Tab label="My reviews of other artists">
            <AuthoredList />
          </Tab>
        </Tabs> :
        <ReceivedList />
      }
    </div>
  </div>
);

export default Index;
