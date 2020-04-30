import React from 'react';
import '../../App.css';
import SECFilingsCards from '../SECFilingsCards/SECFilingsCards'
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Auth/Session';

const SECFilingsPage = () => {
    return (
        <div className="SECFilings" style={{ backgroundImage: 'linear-gradient(#1F1F27, #25252E)' }}>
            <SECFilingsCards />
        </div>
    );
}

const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(SECFilingsPage);
