import React, { Component } from 'react';
import TradingViewWidget from "react-tradingview-widget";
import { TickerValue } from "../TickerControl.js";

const ChartCard = () => {
    return (
        <div>
            <div className='chartWidget'>
                <TradingViewWidget
                    symbol={TickerValue.current}
                    theme='dark'
                    autosize
                />
            </div>
        </div>
    );
}


export default ChartCard;