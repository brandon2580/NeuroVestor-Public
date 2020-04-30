import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { AuthUserContext } from "../Session";
import SignOut from "../SignOut";
import "../../../App.css";
import * as ROUTES from "../../../constants/routes";
import * as ROLES from "../../../constants/roles";
import "bootstrap/js/src/collapse.js";

import { remountHelper } from "../../RemountHelper.js";

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <div className="col-xl-12">
        <nav className="navbar navbar-custom navbar-expand-lg navbar-dark fixed-top bg-dark">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <Link to="/overview" className="nav-link">
                            <Button type="default" className="TabItem" onClick={() => remountHelper.set(true)}>
                                Overview
                            </Button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/financials" className="nav-link">
                            <Button type="default" className="TabItem">
                                Financials
                            </Button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/analysis" className="nav-link">
                            <Button type="default" className="TabItem" onClick={() => remountHelper.set(true)}>
                                Analysis
                            </Button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sec_filings" className="nav-link">
                            <Button type="default" className="TabItem">
                                SEC Filings
                            </Button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/book_data" className="nav-link">
                            <Button type="default" className="TabItem">
                                Book Data
                            </Button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/chart" className="nav-link">
                            <Button type="default" className="TabItem">
                                Chart
                            </Button>
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                <li className="nav-item">
                        <Link to={ROUTES.LANDING} className="nav-link">
                            <Button type="default" className="TabItem">
                                Homepage
                            </Button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={ROUTES.ACCOUNT} className="nav-link">
                            <Button type="default" className="TabItem">
                                Account
                            </Button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <SignOut />
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);

const NavigationNonAuth = () => (
    <div className="container-fluid">
        <div className="col-xl-12">
            <nav className="navbar navbar-custom navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={ROUTES.LANDING}>
                                <Button type="default" className="TabItem">
                                    Landing Page
                                </Button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={ROUTES.SIGN_UP}>
                                <Button type="default" className="TabItem">
                                    Sign Up
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
);

export default Navigation;
