import React from 'react';
import { TimeLine } from 'core/modules/time-line';
import Spacer from 'core/components/Spacer';

const Index = ({ profile, isOwner }) => (
  <div>
    <Spacer type="tall" />
    <TimeLine userId={profile.id} readOnly={!isOwner} />
  </div>
);

export default Index;
