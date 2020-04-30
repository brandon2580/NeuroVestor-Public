import React from 'react';
import '../../App.css';
import { TickerValue } from "../TickerControl.js";
import bFormatter from '../../functions/bFormatter'
import simpleDateFinancials from '../../functions/simpleDateFinancials'
import { Card } from 'antd';

class IncomeStatementCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iex_annual_income_statement: { income: [0, 1, 2, 3, 4] },
            iex_quarterly_income_statement: { income: [0, 1, 2, 3, 4] },
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
            .catch(err => {
                console.log(err);
            })
            .then(iex_annual_income_statement => iex_annual_income_statement.json())
            .then(iex_annual_income_statement => {
                console.log("server response: ", iex_annual_income_statement);
                this.setState({
                    iex_annual_income_statement: iex_annual_income_statement
                });
            });

        fetch("http://localhost:9000/iex_quarterly_income-statement", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => {
                console.log(err);
            })
            .then(iex_quarterly_income_statement => iex_quarterly_income_statement.json())
            .then(iex_quarterly_income_statement => {
                console.log("server response: ", iex_quarterly_income_statement);
                this.setState({
                    iex_quarterly_income_statement: iex_quarterly_income_statement
                });
            });
    }

    componentDidMount() {
        this.callAPI();
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
                            <th scope="row">Cost of Revenue</th>
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
                            <th scope="row">Research & Development</th>
                            {this.researchAndDevelopment = this.state.iex_annual_income_statement.income.map((researchAndDevelopment) =>
                                <td> ${bFormatter(researchAndDevelopment.researchAndDevelopment)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Selling, General, & Admin</th>
                            {this.sellingGeneralAndAdmin = this.state.iex_annual_income_statement.income.map((sellingGeneralAndAdmin) =>
                                <td> ${bFormatter(sellingGeneralAndAdmin.sellingGeneralAndAdmin)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Operating Expenses</th>
                            {this.operatingExpense = this.state.iex_annual_income_statement.income.map((operatingExpense) =>
                                <td> ${bFormatter(operatingExpense.operatingExpense)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Operating Income</th>
                            {this.operatingIncome = this.state.iex_annual_income_statement.income.map((operatingIncome) =>
                                <td> ${bFormatter(operatingIncome.operatingIncome)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">EBIT</th>
                            {this.ebit = this.state.iex_annual_income_statement.income.map((ebit) =>
                                <td> ${bFormatter(ebit.ebit)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Interest Income</th>
                            {this.interestIncome = this.state.iex_annual_income_statement.income.map((interestIncome) =>
                                <td> ${bFormatter(interestIncome.interestIncome)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Pretax Income</th>
                            {this.pretaxIncome = this.state.iex_annual_income_statement.income.map((pretaxIncome) =>
                                <td> ${bFormatter(pretaxIncome.pretaxIncome)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Income Tax</th>
                            {this.incomeTax = this.state.iex_annual_income_statement.income.map((incomeTax) =>
                                <td> ${bFormatter(incomeTax.incomeTax)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Net Income</th>
                            {this.netIncome = this.state.iex_annual_income_statement.income.map((netIncome) =>
                                <td> ${bFormatter(netIncome.netIncome)} </td>
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
                            <th scope="row">Cost of Revenue</th>
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
                            <th scope="row">Research & Development</th>
                            {this.researchAndDevelopment = this.state.iex_quarterly_income_statement.income.map((researchAndDevelopment) =>
                                <td> ${bFormatter(researchAndDevelopment.researchAndDevelopment)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Selling, General, & Admin</th>
                            {this.sellingGeneralAndAdmin = this.state.iex_quarterly_income_statement.income.map((sellingGeneralAndAdmin) =>
                                <td> ${bFormatter(sellingGeneralAndAdmin.sellingGeneralAndAdmin)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Operating Expenses</th>
                            {this.operatingExpense = this.state.iex_quarterly_income_statement.income.map((operatingExpense) =>
                                <td> ${bFormatter(operatingExpense.operatingExpense)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Operating Income</th>
                            {this.operatingIncome = this.state.iex_quarterly_income_statement.income.map((operatingIncome) =>
                                <td> ${bFormatter(operatingIncome.operatingIncome)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">EBIT</th>
                            {this.ebit = this.state.iex_quarterly_income_statement.income.map((ebit) =>
                                <td> ${bFormatter(ebit.ebit)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Interest Income</th>
                            {this.interestIncome = this.state.iex_quarterly_income_statement.income.map((interestIncome) =>
                                <td> ${bFormatter(interestIncome.interestIncome)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Pretax Income</th>
                            {this.pretaxIncome = this.state.iex_quarterly_income_statement.income.map((pretaxIncome) =>
                                <td> ${bFormatter(pretaxIncome.pretaxIncome)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Income Tax</th>
                            {this.incomeTax = this.state.iex_quarterly_income_statement.income.map((incomeTax) =>
                                <td> ${bFormatter(incomeTax.incomeTax)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Net Income</th>
                            {this.netIncome = this.state.iex_quarterly_income_statement.income.map((netIncome) =>
                                <td> ${bFormatter(netIncome.netIncome)} </td>
                            )}
                        </tr>
                    </tbody>
                </table>
        }
        return (
            <div className="Card FinancialsCard">
                <Card title="Income Statement"
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        )
    }
}

export default IncomeStatementCard;