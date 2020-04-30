import React from 'react';
import '../../App.css';
import BookDataCards from "../BookDataCards/BookDataCards"
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../Components/Auth/Session';

const BookDataPage = () => {
    return (
        <div className="BookDataPage" style={{ backgroundImage: 'linear-gradient(#1F1F27, #25252E)' }}>
            <BookDataCards />
        </div>
    );
}

const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(BookDataPage);
