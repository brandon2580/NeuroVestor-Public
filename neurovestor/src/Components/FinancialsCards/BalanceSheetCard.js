import React from 'react';
import '../../App.css';
import { TickerValue } from "../TickerControl.js";
import bFormatter from '../../functions/bFormatter'
import simpleDateFinancials from '../../functions/simpleDateFinancials'
import { Card } from 'antd';

class BalanceSheetCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iex_annual_balance_sheet: { balancesheet: [0, 1, 2, 3, 4] },
            iex_quarterly_balance_sheet: { balancesheet: [0, 1, 2, 3, 4] },
            key: 'Annual',
            noTitleKey: 'app',
        };
    }

    callAPI() {
        fetch("http://localhost:9000/iex_annual_balance-sheet", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => {
                console.log(err);
            })
            .then(iex_annual_balance_sheet => iex_annual_balance_sheet.json())
            .then(iex_annual_balance_sheet => {
                console.log("server response: ", iex_annual_balance_sheet);
                this.setState({
                    iex_annual_balance_sheet: iex_annual_balance_sheet
                });
            });

        fetch("http://localhost:9000/iex_quarterly_balance-sheet", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => {
                console.log(err);
            })
            .then(iex_quarterly_balance_sheet => iex_quarterly_balance_sheet.json())
            .then(iex_quarterly_balance_sheet => {
                console.log("server response: ", iex_quarterly_balance_sheet);
                this.setState({
                    iex_quarterly_balance_sheet: iex_quarterly_balance_sheet
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
                        {this.reportDates = this.state.iex_annual_balance_sheet.balancesheet.map((reportDates) =>
                            <th> {(reportDates.reportDate)} </th>
                        )}
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Cash</th>
                            {this.currentCash = this.state.iex_annual_balance_sheet.balancesheet.map((currentCash) =>
                                <td> ${bFormatter(currentCash.currentCash)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Short Term Investments</th>
                            {this.shortTermInvestments = this.state.iex_annual_balance_sheet.balancesheet.map((shortTermInvestments) =>
                                <td> ${bFormatter(shortTermInvestments.shortTermInvestments)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Receivables</th>
                            {this.receivables = this.state.iex_annual_balance_sheet.balancesheet.map((receivables) =>
                                <td> ${bFormatter(receivables.receivables)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Inventory</th>
                            {this.inventory = this.state.iex_annual_balance_sheet.balancesheet.map((inventory) =>
                                <td> ${bFormatter(inventory.inventory)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Current Assets</th>
                            {this.otherCurrentAssets = this.state.iex_annual_balance_sheet.balancesheet.map((otherCurrentAssets) =>
                                <td> ${bFormatter(otherCurrentAssets.otherCurrentAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Current Assets</th>
                            {this.currentAssets = this.state.iex_annual_balance_sheet.balancesheet.map((currentAssets) =>
                                <td> ${bFormatter(currentAssets.currentAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Long Term Investments</th>
                            {this.longTermInvestments = this.state.iex_annual_balance_sheet.balancesheet.map((longTermInvestments) =>
                                <td> ${bFormatter(longTermInvestments.longTermInvestments)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Property, Plant, & Equipment</th>
                            {this.propertyPlantEquipment = this.state.iex_annual_balance_sheet.balancesheet.map((propertyPlantEquipment) =>
                                <td> ${bFormatter(propertyPlantEquipment.propertyPlantEquipment)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Goodwill</th>
                            {this.goodwill = this.state.iex_annual_balance_sheet.balancesheet.map((goodwill) =>
                                <td> ${bFormatter(goodwill.goodwill)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Intangible Assets</th>
                            {this.intangibleAssets = this.state.iex_annual_balance_sheet.balancesheet.map((intangibleAssets) =>
                                <td> ${bFormatter(intangibleAssets.intangibleAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Assets</th>
                            {this.otherAssets = this.state.iex_annual_balance_sheet.balancesheet.map((otherAssets) =>
                                <td> ${bFormatter(otherAssets.otherAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Assets</th>
                            {this.totalAssets = this.state.iex_annual_balance_sheet.balancesheet.map((totalAssets) =>
                                <td> ${bFormatter(totalAssets.totalAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Accounts Payable</th>
                            {this.accountsPayable = this.state.iex_annual_balance_sheet.balancesheet.map((accountsPayable) =>
                                <td> ${bFormatter(accountsPayable.accountsPayable)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Current Long Term Debt</th>
                            {this.currentLongTermDebt = this.state.iex_annual_balance_sheet.balancesheet.map((currentLongTermDebt) =>
                                <td> ${bFormatter(currentLongTermDebt.currentLongTermDebt)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Current Liabilities</th>
                            {this.otherCurrentLiabilities = this.state.iex_annual_balance_sheet.balancesheet.map((otherCurrentLiabilities) =>
                                <td> ${bFormatter(otherCurrentLiabilities.otherCurrentLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Current Liabilities</th>
                            {this.totalCurrentLiabilities = this.state.iex_annual_balance_sheet.balancesheet.map((totalCurrentLiabilities) =>
                                <td> ${bFormatter(totalCurrentLiabilities.totalCurrentLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Long Term Debt</th>
                            {this.longTermDebt = this.state.iex_annual_balance_sheet.balancesheet.map((longTermDebt) =>
                                <td> ${bFormatter(longTermDebt.longTermDebt)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Liabilities</th>
                            {this.otherLiabilities = this.state.iex_annual_balance_sheet.balancesheet.map((otherLiabilities) =>
                                <td> ${bFormatter(otherLiabilities.otherLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Liabilities</th>
                            {this.totalLiabilities = this.state.iex_annual_balance_sheet.balancesheet.map((totalLiabilities) =>
                                <td> ${bFormatter(totalLiabilities.totalLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Common Stock</th>
                            {this.commonStock = this.state.iex_annual_balance_sheet.balancesheet.map((commonStock) =>
                                <td> ${bFormatter(commonStock.commonStock)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Retained Earnings</th>
                            {this.retainedEarnings = this.state.iex_annual_balance_sheet.balancesheet.map((retainedEarnings) =>
                                <td> ${bFormatter(retainedEarnings.retainedEarnings)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Treasury Stock</th>
                            {this.treasuryStock = this.state.iex_annual_balance_sheet.balancesheet.map((treasuryStock) =>
                                <td> ${bFormatter(treasuryStock.treasuryStock)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Shareholder Equity</th>
                            {this.shareholderEquity = this.state.iex_annual_balance_sheet.balancesheet.map((shareholderEquity) =>
                                <td> ${bFormatter(shareholderEquity.shareholderEquity)} </td>
                            )}
                        </tr>
                    </tbody>
                </table>,

            Quarterly:
                <table className="table">
                    <thead>
                        <th scope="col">Quarter</th>
                        {this.reportDates = this.state.iex_quarterly_balance_sheet.balancesheet.map((reportDates) =>
                            <th> {(reportDates.reportDate)} </th>
                        )}
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Cash</th>
                            {this.currentCash = this.state.iex_quarterly_balance_sheet.balancesheet.map((currentCash) =>
                                <td> ${bFormatter(currentCash.currentCash)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Short Term Investments</th>
                            {this.shortTermInvestments = this.state.iex_quarterly_balance_sheet.balancesheet.map((shortTermInvestments) =>
                                <td> ${bFormatter(shortTermInvestments.shortTermInvestments)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Receivables</th>
                            {this.receivables = this.state.iex_quarterly_balance_sheet.balancesheet.map((receivables) =>
                                <td> ${bFormatter(receivables.receivables)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Inventory</th>
                            {this.inventory = this.state.iex_quarterly_balance_sheet.balancesheet.map((inventory) =>
                                <td> ${bFormatter(inventory.inventory)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Current Assets</th>
                            {this.otherCurrentAssets = this.state.iex_quarterly_balance_sheet.balancesheet.map((otherCurrentAssets) =>
                                <td> ${bFormatter(otherCurrentAssets.otherCurrentAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Current Assets</th>
                            {this.currentAssets = this.state.iex_quarterly_balance_sheet.balancesheet.map((currentAssets) =>
                                <td> ${bFormatter(currentAssets.currentAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Long Term Investments</th>
                            {this.longTermInvestments = this.state.iex_quarterly_balance_sheet.balancesheet.map((longTermInvestments) =>
                                <td> ${bFormatter(longTermInvestments.longTermInvestments)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Property, Plant, & Equipment</th>
                            {this.propertyPlantEquipment = this.state.iex_quarterly_balance_sheet.balancesheet.map((propertyPlantEquipment) =>
                                <td> ${bFormatter(propertyPlantEquipment.propertyPlantEquipment)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Goodwill</th>
                            {this.goodwill = this.state.iex_quarterly_balance_sheet.balancesheet.map((goodwill) =>
                                <td> ${bFormatter(goodwill.goodwill)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Intangible Assets</th>
                            {this.intangibleAssets = this.state.iex_quarterly_balance_sheet.balancesheet.map((intangibleAssets) =>
                                <td> ${bFormatter(intangibleAssets.intangibleAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Assets</th>
                            {this.otherAssets = this.state.iex_quarterly_balance_sheet.balancesheet.map((otherAssets) =>
                                <td> ${bFormatter(otherAssets.otherAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Assets</th>
                            {this.totalAssets = this.state.iex_quarterly_balance_sheet.balancesheet.map((totalAssets) =>
                                <td> ${bFormatter(totalAssets.totalAssets)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Accounts Payable</th>
                            {this.accountsPayable = this.state.iex_quarterly_balance_sheet.balancesheet.map((accountsPayable) =>
                                <td> ${bFormatter(accountsPayable.accountsPayable)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Current Long Term Debt</th>
                            {this.currentLongTermDebt = this.state.iex_quarterly_balance_sheet.balancesheet.map((currentLongTermDebt) =>
                                <td> ${bFormatter(currentLongTermDebt.currentLongTermDebt)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Current Liabilities</th>
                            {this.otherCurrentLiabilities = this.state.iex_quarterly_balance_sheet.balancesheet.map((otherCurrentLiabilities) =>
                                <td> ${bFormatter(otherCurrentLiabilities.otherCurrentLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Current Liabilities</th>
                            {this.totalCurrentLiabilities = this.state.iex_quarterly_balance_sheet.balancesheet.map((totalCurrentLiabilities) =>
                                <td> ${bFormatter(totalCurrentLiabilities.totalCurrentLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Long Term Debt</th>
                            {this.longTermDebt = this.state.iex_quarterly_balance_sheet.balancesheet.map((longTermDebt) =>
                                <td> ${bFormatter(longTermDebt.longTermDebt)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Other Liabilities</th>
                            {this.otherLiabilities = this.state.iex_quarterly_balance_sheet.balancesheet.map((otherLiabilities) =>
                                <td> ${bFormatter(otherLiabilities.otherLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Total Liabilities</th>
                            {this.totalLiabilities = this.state.iex_quarterly_balance_sheet.balancesheet.map((totalLiabilities) =>
                                <td> ${bFormatter(totalLiabilities.totalLiabilities)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Common Stock</th>
                            {this.commonStock = this.state.iex_quarterly_balance_sheet.balancesheet.map((commonStock) =>
                                <td> ${bFormatter(commonStock.commonStock)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Retained Earnings</th>
                            {this.retainedEarnings = this.state.iex_quarterly_balance_sheet.balancesheet.map((retainedEarnings) =>
                                <td> ${bFormatter(retainedEarnings.retainedEarnings)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Treasury Stock</th>
                            {this.treasuryStock = this.state.iex_quarterly_balance_sheet.balancesheet.map((treasuryStock) =>
                                <td> ${bFormatter(treasuryStock.treasuryStock)} </td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Shareholder Equity</th>
                            {this.shareholderEquity = this.state.iex_quarterly_balance_sheet.balancesheet.map((shareholderEquity) =>
                                <td> ${bFormatter(shareholderEquity.shareholderEquity)} </td>
                            )}
                        </tr>
                    </tbody>
                </table>
        }
        return (
            <Card title="Balance Sheet"
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

export default BalanceSheetCard;