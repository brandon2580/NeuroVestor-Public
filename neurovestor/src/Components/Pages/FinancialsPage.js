import React from 'react';
import '../../App.css';
import FinancialsCards from "../FinancialsCards/FinancialsCards";
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../Components/Auth/Session';

const FinancialsPage = () => {
    return (
        <div className="FinancialsPage" style={{ backgroundImage: 'linear-gradient(#1F1F27, #25252E)' }}>
            <FinancialsCards />
        </div>
    );
}

const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(FinancialsPage);
