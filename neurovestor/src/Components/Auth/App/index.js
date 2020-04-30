import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import OverviewPage from "../../Pages/OverviewPage";
import FinancialsPage from "../../Pages/FinancialsPage";
import AnalysisPage from "../../Pages/AnalysisPage";
import SECFilingsPage from "../../Pages/SECFilingsPage";
import BookDataPage from "../../Pages/BookDataPage";
import ChartPage from "../../Pages/ChartPage";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ROUTES from "../../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => {
    const [tickerCode, setTickerCode] = React.useState("QUIK");
    // A quick search tells me QUIK is a valid stock code. I didn't look for any other info on it

    return (
        <Router>
            <Navigation onClick={() => console.log("Second test!")} />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.BOOKDATA} component={BookDataPage} />
            <Route
                path={ROUTES.OVERVIEW}
                component={OverviewPage}
                tickerCode={tickerCode}
                onClick={() => console.log("Ouch!")}
            />
            <Route path={ROUTES.FINANCIALS} component={FinancialsPage} />
            <Route path={ROUTES.ANALYSIS} component={AnalysisPage} />
            <Route path={ROUTES.SECFILINGS} component={SECFilingsPage} />
            <Route path={ROUTES.CHART} component={ChartPage} />
        </Router>
    );
};

export default withAuthentication(App);
