import React from 'react';
import '../../App.css';
import { Card, Popover } from 'antd';
import { FaQuestionCircle } from 'react-icons/fa';
import { TickerValue } from "../TickerControl.js";
import CardHeaderButtons from '../CardHeaderButtons'
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

class TurnoverCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { intrinio_turnover_data: { data: Array.from(Array(12).keys()) } };
    }

    callAPI() {
        console.log("Fetching data...");
        fetch("http://localhost:9000/intrinio_turnover_data", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(intrinio_turnover_data => intrinio_turnover_data.json())
            .then(intrinio_turnover_data => {
                console.log("server response: ", intrinio_turnover_data);
                this.setState({
                    intrinio_turnover_data: intrinio_turnover_data
                });
            }).catch(err => {
                console.log(err);
            })
            loadState = false;
    }

    componentDidMount() {
        if (remountHelper.state) {
            // If remountHelper is set to true, the page has already loaded; there will be no secondary mounting of this device
            // We are good to query the data right now
            console.log("TurnoverCard good to load first pass");
            this.callAPI();
        } else {
            if (!loadState) {
                // This is our first pass (and remountHelper is not set). Ignore this... but we'll need to update the load state
                console.log("Pass fetch on TurnoverCard");
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

    render() {
        const assetTurnoverContent = (
            <p className="black">A financial ratio that measures the efficiency of a company's use of its assets in generating sales revenue or sales income to the company</p>
        )

        const accountsReceivableContent = (
            <p className="black">An accounting measure used to measure how effective a company is in extending credit as well as collecting debts</p>
        )

        const fixedAssetContent = (
            <p className="black">Ratio of sales to the value of fixed assets</p>
        )

        const inventoryContent = (
            <p className="black">A measure of the number of times inventory is sold or used in a time period such as a year</p>
        )

        const accountsPayableContent = (
            <p className="black">A ratio that measures the speed with which a company pays its suppliers</p>
        )

        const investedCapitalContent = (
            <p className="black">Compares the annual sales of a business to the total amount of its stockholders' equity</p>
        )

        const altmanZScoreContent = (
            <p className="black">Output of a credit-strength test that gauges a publicly-traded company's likelihood of bankruptcy</p>
        )

        return (
            <Card className="TurnoverCard" style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            title={"Turnover Info"} extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Asset Turnover</th>
                            <td>{(this.state.intrinio_turnover_data.data[0].value * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={assetTurnoverContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Accounts Receivable Turnover</th>
                            <td>{(this.state.intrinio_turnover_data.data[1].value * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={accountsReceivableContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Fixed Asset Turnover</th>
                            <td>{(this.state.intrinio_turnover_data.data[2].value * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={fixedAssetContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Inventory Turnover</th>
                            <td>{(this.state.intrinio_turnover_data.data[3].value * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={inventoryContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Accounts Payable Turnover</th>
                            <td>{(this.state.intrinio_turnover_data.data[4].value * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={accountsPayableContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Invested Capital Turnover</th>
                            <td>{(this.state.intrinio_turnover_data.data[5].value * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={investedCapitalContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Altman Z-Score</th>
                            <td>{(this.state.intrinio_turnover_data.data[6].value * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={altmanZScoreContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }
}

export default TurnoverCard