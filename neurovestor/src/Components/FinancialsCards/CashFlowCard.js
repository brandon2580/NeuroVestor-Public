import React from 'react';
import '../../App.css';
import { TickerValue } from "../TickerControl.js";
import bFormatter from '../../functions/bFormatter'
import simpleDateFinancials from '../../functions/simpleDateFinancials'
import { Card } from 'antd';

class CashFlowCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iex_annual_cash_flow: { cashflow: [0, 1, 2, 3, 4] },
            iex_quarterly_cash_flow: { cashflow: [0, 1, 2, 3, 4] },
            key: 'Annual',
            noTitleKey: 'app',
        };
    }

    callAPI() {
        fetch("http://localhost:9000/iex_annual_cash-flow", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => {
                console.log(err);
            })
            .then(iex_annual_cash_flow => iex_annual_cash_flow.json())
            .then(iex_annual_cash_flow => {
                console.log("server response: ", iex_annual_cash_flow);
                this.setState({
                    iex_annual_cash_flow: iex_annual_cash_flow
                });
            });

        fetch("http://localhost:9000/iex_quarterly_cash-flow", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => {
                console.log(err);
            })
            .then(iex_quarterly_cash_flow => iex_quarterly_cash_flow.json())
            .then(iex_quarterly_cash_flow => {
                console.log("server response: ", iex_quarterly_cash_flow);
                this.setState({
                    iex_quarterly_cash_flow: iex_quarterly_cash_flow
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
                        {this.reportDates = this.state.iex_annual_cash_flow.cashflow.map((reportDates) =>
                            <th> {(reportDates.reportDate)} </th>
                        )}
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Capital Expenditures</th>
                            {this.capitalExpenditures = this.state.iex_annual_cash_flow.cashflow.map((capitalExpenditures) =>
                                <td> ${bFormatter(capitalExpenditures.capitalExpenditures)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cash Change</th>
                            {this.cashChange = this.state.iex_annual_cash_flow.cashflow.map((cashChange) =>
                                <td> ${bFormatter(cashChange.cashChange)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cash Flow</th>
                            {this.cashFlow = this.state.iex_annual_cash_flow.cashflow.map((cashFlow) =>
                                <td> ${bFormatter(cashFlow.cashFlow)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cash Flow Financing</th>
                            {this.cashFlowFinancing = this.state.iex_annual_cash_flow.cashflow.map((cashFlowFinancing) =>
                                <td> ${bFormatter(cashFlowFinancing.cashFlowFinancing)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Changes In Inventories</th>
                            {this.changesInInventories = this.state.iex_annual_cash_flow.cashflow.map((changesInInventories) =>
                                <td> ${bFormatter(changesInInventories.changesInInventories)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Changes In Receivables</th>
                            {this.changesInReceivables = this.state.iex_annual_cash_flow.cashflow.map((changesInReceivables) =>
                                <td> ${bFormatter(changesInReceivables.changesInReceivables)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Depreciation</th>
                            {this.depreciation = this.state.iex_annual_cash_flow.cashflow.map((depreciation) =>
                                <td> ${bFormatter(depreciation.depreciation)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Dividends Paid</th>
                            {this.dividendsPaid = this.state.iex_annual_cash_flow.cashflow.map((dividendsPaid) =>
                                <td> ${bFormatter(dividendsPaid.dividendsPaid)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Investing Activity</th>
                            {this.investingActivityOther = this.state.iex_annual_cash_flow.cashflow.map((investingActivityOther) =>
                                <td> ${bFormatter(investingActivityOther.investingActivityOther)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Investments</th>
                            {this.investments = this.state.iex_annual_cash_flow.cashflow.map((investments) =>
                                <td> ${bFormatter(investments.investments)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Net Borrowings</th>
                            {this.netBorrowings = this.state.iex_annual_cash_flow.cashflow.map((netBorrowings) =>
                                <td> ${bFormatter(netBorrowings.netBorrowings)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Net Income</th>
                            {this.netIncome = this.state.iex_annual_cash_flow.cashflow.map((netIncome) =>
                                <td> ${bFormatter(netIncome.netIncome)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Financing Cash Flows</th>
                            {this.otherFinancingCashFlows = this.state.iex_annual_cash_flow.cashflow.map((otherFinancingCashFlows) =>
                                <td> ${bFormatter(otherFinancingCashFlows.otherFinancingCashFlows)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Investing Cash Flows</th>
                            {this.totalInvestingCashFlows = this.state.iex_annual_cash_flow.cashflow.map((totalInvestingCashFlows) =>
                                <td> ${bFormatter(totalInvestingCashFlows.totalInvestingCashFlows)} </td>
                            )}
                        </tr>
                    </tbody>
                </table>,

            Quarterly:
                <table className="table">
                    <thead>
                        <th scope="col">Quarter</th>
                        {this.reportDates = this.state.iex_quarterly_cash_flow.cashflow.map((reportDates) =>
                            <th> {(reportDates.reportDate)} </th>
                        )}
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Capital Expenditures</th>
                            {this.capitalExpenditures = this.state.iex_quarterly_cash_flow.cashflow.map((capitalExpenditures) =>
                                <td> ${bFormatter(capitalExpenditures.capitalExpenditures)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cash Change</th>
                            {this.cashChange = this.state.iex_quarterly_cash_flow.cashflow.map((cashChange) =>
                                <td> ${bFormatter(cashChange.cashChange)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cash Flow</th>
                            {this.cashFlow = this.state.iex_quarterly_cash_flow.cashflow.map((cashFlow) =>
                                <td> ${bFormatter(cashFlow.cashFlow)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Cash Flow Financing</th>
                            {this.cashFlowFinancing = this.state.iex_quarterly_cash_flow.cashflow.map((cashFlowFinancing) =>
                                <td> ${bFormatter(cashFlowFinancing.cashFlowFinancing)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Changes In Inventories</th>
                            {this.changesInInventories = this.state.iex_quarterly_cash_flow.cashflow.map((changesInInventories) =>
                                <td> ${bFormatter(changesInInventories.changesInInventories)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Changes In Receivables</th>
                            {this.changesInReceivables = this.state.iex_quarterly_cash_flow.cashflow.map((changesInReceivables) =>
                                <td> ${bFormatter(changesInReceivables.changesInReceivables)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Depreciation</th>
                            {this.depreciation = this.state.iex_quarterly_cash_flow.cashflow.map((depreciation) =>
                                <td> ${bFormatter(depreciation.depreciation)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Dividends Paid</th>
                            {this.dividendsPaid = this.state.iex_quarterly_cash_flow.cashflow.map((dividendsPaid) =>
                                <td> ${bFormatter(dividendsPaid.dividendsPaid)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Investing Activity</th>
                            {this.investingActivityOther = this.state.iex_quarterly_cash_flow.cashflow.map((investingActivityOther) =>
                                <td> ${bFormatter(investingActivityOther.investingActivityOther)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Investments</th>
                            {this.investments = this.state.iex_quarterly_cash_flow.cashflow.map((investments) =>
                                <td> ${bFormatter(investments.investments)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Net Borrowings</th>
                            {this.netBorrowings = this.state.iex_quarterly_cash_flow.cashflow.map((netBorrowings) =>
                                <td> ${bFormatter(netBorrowings.netBorrowings)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Net Income</th>
                            {this.netIncome = this.state.iex_quarterly_cash_flow.cashflow.map((netIncome) =>
                                <td> ${bFormatter(netIncome.netIncome)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Financing Cash Flows</th>
                            {this.otherFinancingCashFlows = this.state.iex_quarterly_cash_flow.cashflow.map((otherFinancingCashFlows) =>
                                <td> ${bFormatter(otherFinancingCashFlows.otherFinancingCashFlows)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Investing Cash Flows</th>
                            {this.totalInvestingCashFlows = this.state.iex_quarterly_cash_flow.cashflow.map((totalInvestingCashFlows) =>
                                <td> ${bFormatter(totalInvestingCashFlows.totalInvestingCashFlows)} </td>
                            )}
                        </tr>
                    </tbody>
                </table>
        }
        return (
            <Card title="Cash Flow Statement"
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {contentList[this.state.key]}
            </Card>
        )
    }
}

export default CashFlowCard;