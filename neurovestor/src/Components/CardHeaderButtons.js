import React from "react";
import "../App.css";
import { Menu, Dropdown, Button } from "antd";

function CardHeaderButtons(props) {
    const ShowList = (
        <Menu>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Profile")}>Profile</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "News")}>News</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Key Data")}>Key Data</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Earnings")}>Earnings</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Growth Info")}>Growth</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Valuation")}>Valuation</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Contact")}>Contact</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Metrics Chart")}>Metrics Chart</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Estimates Comparison")}>EPS Estimates</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Turnover Info")}>Turnover Info</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Competition")}>Competition</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Social Sentiment")}>Social Sentiment</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Basic Financials")}>Basic Financials</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Advanced Key Data")}>Advanced Key Data</Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Institutional Ownership")}>
                    Institutional Ownership
                </Button>
            </Menu.Item>
            <Menu.Item style={{ textAlign: "center" }}>
                <Button onClick={() => props.changeCard(props.cardId, "Recommendations")}>
                    Analyst Recommendations
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="button">
            <Dropdown overlay={ShowList} placement="bottomCenter">
                <Button>Edit</Button>
            </Dropdown>
        </div>
    );
}

export default CardHeaderButtons;
