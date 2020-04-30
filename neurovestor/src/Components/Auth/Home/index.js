import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';
import OverviewPage from '../../Pages/OverviewPage';

const HomePage = () => (
  <div>
    <OverviewPage />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
