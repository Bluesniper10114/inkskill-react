// @flow

import React from 'react';
import { Spacer } from 'core/components';
import TeamCard from './TeamCard';

type Props = {
  content: string,
  team: TeamMember[],
};

const Content = ({
  content,
  team,
}: Props) => (
  <div className="container single-page-box">
    <div className="row">
      <div className="col-md-2 col-md-offset-1 name text-center">
        BLOG.
      </div>

      <Spacer type="tall hidden-md hidden-lg" />

      <div className="col-md-8">
        <div className="text-box about-us-text">
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-12">
        <hr />
      </div>
    </div>

    <div className="row">
      <div className="col-md-2 col-md-offset-1 name text-center">
        OUR TEAM.
      </div>

      <Spacer type="tall hidden-md hidden-lg" />

      {team.map((member: TeamMember) => (
        <div key={member.id} className="col-xs-6 col-md-2">
          <TeamCard member={member} />
        </div>
      ))}
    </div>
  </div>
);

export default Content;
