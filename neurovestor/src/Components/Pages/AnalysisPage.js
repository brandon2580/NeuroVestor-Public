import React from 'react';
import '../../App.css';
import AnalysisCards from "../AnalysisCards/AnalysisCards"
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../Components/Auth/Session';

const AnalysisPage = () => {
    return (
        <div className="AnalysisPage" style={{ backgroundImage: 'linear-gradient(#1F1F27, #25252E)' }}>
            <AnalysisCards />
        </div>
    );
}

const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AnalysisPage);
