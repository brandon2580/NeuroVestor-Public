import React from 'react';
import '../../App.css';
import ChartCards from '../ChartCards/ChartCards'
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../Components/Auth/Session';

const ChartPage = () => {
    return (
        <div className="ChartPage" style={{ backgroundImage: 'linear-gradient(#1F1F27, #25252E)' }}>
            <ChartCards />
        </div>
    );
}

const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(ChartPage);
