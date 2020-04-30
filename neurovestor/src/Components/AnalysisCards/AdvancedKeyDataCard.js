import React from 'react';
import '../../App.css';
import { Card, Popover } from 'antd';
import { TickerValue } from "../TickerControl.js";
import { FaQuestionCircle } from 'react-icons/fa';
import bFormatter from '../../functions/bFormatter'
import CardHeaderButtons from '../CardHeaderButtons'
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

class AdvancedKeyDataCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { iex_advanced_stats: {data: Array.from(Array(12).keys())} };
    }

    callAPI() {
        console.log("Fetching data...");
        fetch("http://localhost:9000/iex_advanced_stats", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(iex_advanced_stats => iex_advanced_stats.json())
            .then(iex_advanced_stats => {
                console.log("server response: ", iex_advanced_stats);
                this.setState({
                    iex_advanced_stats: iex_advanced_stats
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
            console.log("AdvancedKeyDataCard good to load first pass");
            this.callAPI();
        } else {
            if (!loadState) {
                // This is our first pass (and remountHelper is not set). Ignore this... but we'll need to update the load state
                console.log("Pass fetch on AdvancedKeyDataCardtactCard");
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
        const marketCapContent = (
            <p className="black">The value of a company that is traded on the stock market, calculated by multiplying the total number of shares by the present share price</p>
        );

        const peRatioContent = (
            <p className="black">Ratio of a company's share price to the company's earnings per share</p>
        )
        
        const forwardPERatioContent = (
            <p className="black">Current stock price to the company's predicted earnings per share for the future 12 months</p>
        )
                
        const peHighContent = (
            <p className="black">Highest P/E ratio over the past 12 months</p>
        )
                        
        const peLowContent = (
            <p className="black">Lowest P/E ratio over the past 12 months</p>
        )
                                
        const pbRatioContent = (
            <p className="black">Ratio of a company's share price to the company's book value per share</p>
        )

        const weekHighContent = (
            <p className="black">Highest price at which a stock has traded during the previous year</p>
        )

        const weekLowContent = (
            <p className="black">Lowest price at which a stock has traded during the previous year</p>
        )

        const weekChangeContent = (
            <p className="black">Range of price of a given share in the previous year</p>
        )

        const dividendYieldContent = (
            <p className="black">Dividend per share, divided by the price per share</p>
        )
        
        const ttmEPSContent = (
            <p className="black">Total earnings or profits per share the company has made over the last 12 months</p>
        )

        const nextEarningsDateContent = (
            <p className="black">The date of the next release of a company's financial reports</p>
        )

        const deContent = (
            <p className="black">Ratio of a company's debt to the company's equity</p>
        )

        const betaContent = (
            <p className="black">Beta is a measure of a stock's volatility in relation to the overall market</p>
        )

        return (
            <Card className="AdvancedKeyDataCard" style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            title={"Advanced Key Data"} extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Market Cap:</th>
                            <td>{bFormatter(this.state.iex_advanced_stats.marketcap)} <Popover placement="topLeft" className="popover-item" content={marketCapContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">P/E:</th>
                            <td>{this.state.iex_advanced_stats.peRatio} <Popover placement="topLeft" className="popover-item" content={peRatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Forward P/E:</th>
                            <td>{this.state.iex_advanced_stats.forwardPERatio} <Popover placement="topLeft" className="popover-item" content={forwardPERatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">P/E High:</th>
                            <td>{(this.state.iex_advanced_stats.peHigh * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={peHighContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">P/E Low:</th>
                            <td>{(this.state.iex_advanced_stats.peLow * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={peLowContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">P/B:</th>
                            <td>{(this.state.iex_advanced_stats.priceToBook * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={pbRatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">52 Week High:</th>
                            <td>${this.state.iex_advanced_stats.week52high} <Popover placement="topLeft" className="popover-item" content={weekHighContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">52 Week Low:</th>
                            <td>${this.state.iex_advanced_stats.week52low} <Popover placement="topLeft" className="popover-item" content={weekLowContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">52 Week Change:</th>
                            <td>{(this.state.iex_advanced_stats.week52change * 100).toFixed(2)}% <Popover placement="topLeft" className="popover-item" content={weekChangeContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Dividend Yield:</th>
                            <td>{(this.state.iex_advanced_stats.dividendYield * 100).toFixed(2)}% <Popover placement="topLeft" className="popover-item" content={dividendYieldContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">TTM EPS:</th>
                            <td>{(this.state.iex_advanced_stats.ttmEPS * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={ttmEPSContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Next Earnings Date:</th>
                            <td>{this.state.iex_advanced_stats.nextEarningsDate} <Popover placement="topLeft" className="popover-item" content={nextEarningsDateContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Debt To Equity:</th>
                            <td>{this.state.iex_advanced_stats.debtToEquity} <Popover placement="topLeft" className="popover-item" content={deContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Beta:</th>
                            <td>{(this.state.iex_advanced_stats.beta * 1).toFixed(2)}<Popover placement="topLeft" className="popover-item" content={betaContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }
}

export default AdvancedKeyDataCard