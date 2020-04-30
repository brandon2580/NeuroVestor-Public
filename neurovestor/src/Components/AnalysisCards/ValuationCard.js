import React from 'react';
import '../../App.css';
import { Card, Popover } from 'antd';
import { FaQuestionCircle } from 'react-icons/fa';
import bFormatter from '../../functions/bFormatter'
import CardHeaderButtons from '../CardHeaderButtons'
import { TickerValue } from "../TickerControl.js";
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

class ValuationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { intrinio_valuation_data: { data: Array.from(Array(10).keys()) } };

    }

    callAPI() {
        console.log("Fetching data...");
        fetch("http://localhost:9000/intrinio_valuation_data", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(intrinio_valuation_data => intrinio_valuation_data.json())
            .then(intrinio_valuation_data => {
                console.log("server response: ", intrinio_valuation_data);
                this.setState({
                    intrinio_valuation_data: intrinio_valuation_data
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
            console.log("ValuationCard good to load first pass");
            this.callAPI();
        } else {
            if (!loadState) {
                // This is our first pass (and remountHelper is not set). Ignore this... but we'll need to update the load state
                console.log("Pass fetch on ValuationCard");
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

        const psRatioContent = (
            <p className="black">Ratio of a company's share price to the company's revenue per share</p>
        )

        const pbRatioContent = (
            <p className="black">Ratio of a company's share price to the company's book value per share</p>
        )

        const enterpriseValueContent = (
            <p className="black">A measure of a company's total value, often used as a more comprehensive alternative to equity market capitalization</p>
        )

        const evEbitContent = (
            <p className="black">Ratio of a company's enterprise value to the company's EBIT</p>
        )

        const evEbitdaContent = (
            <p className="black">Ratio of a company's enterprise value to the company's EBITDA</p>
        )

        const evFcfContent = (
            <p className="black">Ratio of a company's enterprise value to the company's FCF</p>
        )

        const currentRatioContent = (
            <p className="black">A liquidity ratio that measures whether a firm has enough resources to meet its short-term obligations</p>
        )

        const quickRatioContent = (
            <p className="black">An indicator of a company's short-term liquidity position and measures a company's ability to meet its short-term obligations with its most liquid assets</p>
        )
        

        return (
            <Card className="ValuationCard" style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            title={"Valuation"} extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Market Capitalization</th>
                            <td>{bFormatter(this.state.intrinio_valuation_data.data[0].value)} <Popover placement="topLeft" className="popover-item" content={marketCapContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">P/E</th>
                            <td>{(this.state.intrinio_valuation_data.data[1].value*1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={peRatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">P/S</th>
                            <td>{(this.state.intrinio_valuation_data.data[2].value*1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={psRatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">P/B</th>
                            <td>{(this.state.intrinio_valuation_data.data[3].value*1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={pbRatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Enterprise Value</th>
                            <td>{bFormatter(this.state.intrinio_valuation_data.data[4].value)} <Popover placement="topLeft" className="popover-item" content={enterpriseValueContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">EV/EBIT</th>
                            <td>{(this.state.intrinio_valuation_data.data[5].value*1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={evEbitContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">EV/EBITDA</th>
                            <td>{(this.state.intrinio_valuation_data.data[6].value*1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={evEbitdaContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">EV/FCF</th>
                            <td>{(this.state.intrinio_valuation_data.data[7].value*1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={evFcfContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Current Ratio</th>
                            <td>{(this.state.intrinio_valuation_data.data[8].value*1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={currentRatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                        <tr>
                            <th scope="row">Quick Ratio</th>
                            <td>{(this.state.intrinio_valuation_data.data[9].value*1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={quickRatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }
}

export default ValuationCard