import React from "react";
import "../../App.css";
import { Card, Popover } from "antd";
import { FaQuestionCircle } from 'react-icons/fa';
import { TickerValue } from "../TickerControl.js";
import bFormatter from "../../functions/bFormatter";
import CardHeaderButtons from "../CardHeaderButtons";
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

const KeyDataCard = (props) => {
    const [data, setData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const callAPI = () => {
        fetch("http://localhost:9000/iex_key_data", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        }).catch(err => {
            console.log(err);
        })
            .then(iex_key_data => iex_key_data.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        loadState = false;
    }

    React.useEffect(() => {
        if (remountHelper.state) {
            console.log("KeyDataCard good to load first pass");
            callAPI()
        } else {
            if (!loadState) {
                console.log("Pass fetch on KeyDataCard");
                loadState = true;
            } else {
                callAPI()
            }
        }
    }, [TickerValue.current])

    const marketCapContent = (
        <p className="black">The value of a company that is traded on the stock market, calculated by multiplying the total number of shares by the present share price</p>
    );

    const peRatioContent = (
        <p className="black">Ratio of a company's share price to the company's earnings per share</p>
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

    const betaContent = (
        <p className="black">Beta is a measure of a stock's volatility in relation to the overall market</p>
    )

    return (
        <Card
        className="KeyDataCard FirstRowCard"
        title={"Key Data"}
        style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
        extra={<CardHeaderButtons cardId={props.card} changeCard={props.change} />}
    >
        <table className="table">   
            <tbody>
                <tr>
                    <th scope="row">Market Cap:</th>
                    <td>{bFormatter(data.marketcap)} <Popover placement="topLeft" className="popover-item" content={marketCapContent}><FaQuestionCircle className="question-mark" /></Popover> </td>
                </tr>
                <tr>
                    <th scope="row">P/E:</th>
                    <td>{data.peRatio} <Popover placement="topLeft" className="popover-item" content={peRatioContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                </tr>
                <tr>
                    <th scope="row">52 Week High:</th>
                    <td>${data.week52high} <Popover placement="topLeft" className="popover-item" content={weekHighContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                </tr>
                <tr>
                    <th scope="row">52 Week Low:</th>
                    <td>${data.week52low} <Popover placement="topLeft" className="popover-item" content={weekLowContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                </tr>
                <tr>
                    <th scope="row">52 Week Change:</th>
                    <td>{(data.week52change * 100).toFixed(2)}% <Popover placement="topLeft" className="popover-item" content={weekChangeContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                </tr>
                <tr>
                    <th scope="row">Dividend Yield:</th>
                    <td>{(data.dividendYield * 100).toFixed(2)}% <Popover placement="topLeft" className="popover-item" content={dividendYieldContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                </tr>
                <tr>
                    <th scope="row">TTM EPS:</th>
                    <td>{(data.ttmEPS * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={ttmEPSContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                </tr>
                <tr>
                    <th scope="row">Next Earnings Date:</th>
                    <td>{data.nextEarningsDate} <Popover placement="topLeft" className="popover-item" content={nextEarningsDateContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                </tr>
                <tr>
                    <th scope="row">Beta:</th>
                    <td>{(data.beta * 1).toFixed(2)} <Popover placement="topLeft" className="popover-item" content={betaContent}><FaQuestionCircle className="question-mark" /></Popover></td>
                </tr>
            </tbody>
        </table>
    </Card>
    )

}

export default KeyDataCard;
