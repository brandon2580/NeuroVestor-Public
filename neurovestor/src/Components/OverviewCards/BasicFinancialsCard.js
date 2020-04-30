import React from "react";
import "../../App.css";
import { Card, Button } from "antd";
import bFormatter from "../../functions/bFormatter";
import simpleDateFinancials from "../../functions/simpleDateFinancials";
import CardHeaderButtons from "../CardHeaderButtons";
import { TickerValue } from "../TickerControl.js";
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

class BasicFinancialsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iex_annual_income_statement: { income: Array.from(Array(4).keys(4)) },
            iex_annual_balance_sheet: { balancesheet: Array.from(Array(4).keys(4)) },
            iex_quarterly_balance_sheet: { balancesheet: Array.from(Array(4).keys(4)) },
            iex_quarterly_income_statement: { income: Array.from(Array(4).keys(4)) },
            key: 'Annual',
            noTitleKey: 'app',
        };
    }

    callAPI() {
        fetch("http://localhost:9000/iex_annual_income-statement", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(iex_annual_income_statement => iex_annual_income_statement.json())
            .then(iex_annual_income_statement => this.setState({ iex_annual_income_statement }));


        fetch("http://localhost:9000/iex_annual_balance-sheet", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(iex_annual_balance_sheet => iex_annual_balance_sheet.json())
            .then(iex_annual_balance_sheet => this.setState({ iex_annual_balance_sheet }));

        fetch("http://localhost:9000/iex_quarterly_balance-sheet", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(iex_quarterly_balance_sheet => iex_quarterly_balance_sheet.json())
            .then(iex_quarterly_balance_sheet => this.setState({ iex_quarterly_balance_sheet }));

        fetch("http://localhost:9000/iex_quarterly_income-statement", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(iex_quarterly_income_statement => iex_quarterly_income_statement.json())
            .then(iex_quarterly_income_statement => this.setState({ iex_quarterly_income_statement }));

            loadState = false;
    }

    componentDidMount() {
        if (remountHelper.state) {
            // If remountHelper is set to true, the page has already loaded; there will be no secondary mounting of this device
            // We are good to query the data right now
            console.log("BasicFinancialsCard good to load first pass");
            this.callAPI();
        } else {
            if (!loadState) {
                // This is our first pass (and remountHelper is not set). Ignore this... but we'll need to update the load state
                console.log("Pass fetch on BasicFinancialsCard");
                loadState = true;
            } else {
                this.callAPI();
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.showTicker !== this.props.showTicker) {
            this.callAPI();
        }
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        const tabList = [
            {
                key: 'Annual',
                tab: 'Annual',
            },
            {
                key: 'Quarterly',
                tab: 'Quarterly',
            },
        ];
        const contentList = {
            Annual:
                <table className="table">
                    <thead>
                        <th scope="col">Year</th>
                        {this.reportDates = this.state.iex_annual_income_statement.income.map((reportDates) =>
                            <th> {(reportDates.reportDate)} </th>
                        )}
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Revenue</th>
                            {this.totalRevenue = this.state.iex_annual_income_statement.income.map((totalRevenue) =>
                                <td> ${bFormatter(totalRevenue.totalRevenue)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cost Of Revenue</th>
                            {this.costOfRevenue = this.state.iex_annual_income_statement.income.map((costOfRevenue) =>
                                <td> ${bFormatter(costOfRevenue.costOfRevenue)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Gross Profit</th>
                            {this.grossProfit = this.state.iex_annual_income_statement.income.map((grossProfit) =>
                                <td> ${bFormatter(grossProfit.grossProfit)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Assets</th>
                            {this.totalAssets = this.state.iex_annual_balance_sheet.balancesheet.map((totalAssets) =>
                                <td> ${bFormatter(totalAssets.totalAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Liabilities</th>
                            {this.totalLiabilities = this.state.iex_annual_balance_sheet.balancesheet.map((totalLiabilities) =>
                                <td> ${bFormatter(totalLiabilities.totalLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cash</th>
                            {this.currentCash = this.state.iex_annual_balance_sheet.balancesheet.map((currentCash) =>
                                <td> ${bFormatter(currentCash.currentCash)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Long Term Debt</th>
                            {this.longTermDebt = this.state.iex_annual_balance_sheet.balancesheet.map((longTermDebt) =>
                                <td> ${bFormatter(longTermDebt.longTermDebt)} </td>
                            )}
                        </tr>
                    </tbody>
                </table>,

            Quarterly:
                <table className="table">
                    <thead>
                        <th scope="col">Quarter</th>
                        {this.reportDates = this.state.iex_quarterly_income_statement.income.map((reportDates) =>
                            <th> {(reportDates.reportDate)} </th>
                        )}
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Revenue</th>
                            {this.totalRevenue = this.state.iex_quarterly_income_statement.income.map((totalRevenue) =>
                                <td> ${bFormatter(totalRevenue.totalRevenue)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cost Of Revenue</th>
                            {this.costOfRevenue = this.state.iex_quarterly_income_statement.income.map((costOfRevenue) =>
                                <td> ${bFormatter(costOfRevenue.costOfRevenue)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Gross Profit</th>
                            {this.grossProfit = this.state.iex_quarterly_income_statement.income.map((grossProfit) =>
                                <td> ${bFormatter(grossProfit.grossProfit)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Assets</th>
                            {this.totalAssets = this.state.iex_quarterly_balance_sheet.balancesheet.map((totalAssets) =>
                                <td> ${bFormatter(totalAssets.totalAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Liabilities</th>
                            {this.totalLiabilities = this.state.iex_quarterly_balance_sheet.balancesheet.map((totalLiabilities) =>
                                <td> ${bFormatter(totalLiabilities.totalLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cash</th>
                            {this.currentCash = this.state.iex_quarterly_balance_sheet.balancesheet.map((currentCash) =>
                                <td> ${bFormatter(currentCash.currentCash)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Long Term Debt</th>
                            {this.longTermDebt = this.state.iex_quarterly_balance_sheet.balancesheet.map((longTermDebt) =>
                                <td> ${bFormatter(longTermDebt.longTermDebt)} </td>
                            )}
                        </tr>
                    </tbody>
                </table>,
        };
        return (
            <Card
                className="BasicFinancialsCard"
                title={"Basic Financials"}
                style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
                extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {contentList[this.state.key]}
            </Card>
        );
    }
}

export default BasicFinancialsCard;
