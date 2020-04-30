import React from "react";
import "../../App.css";
import OverviewCards from "../OverviewCards/OverviewCards";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../../Components/Auth/Session";

const OverviewPage = props => {
    return (
        <div className="OverviewPage" style={{ backgroundImage: "linear-gradient(#1F1F27, #25252E)" }}>
            <OverviewCards />
        </div>
    );
};


const condition = authUser => !!authUser;
export default compose(withEmailVerification, withAuthorization(condition))(OverviewPage);
