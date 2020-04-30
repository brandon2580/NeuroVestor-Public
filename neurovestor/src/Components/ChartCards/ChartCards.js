import React from 'react';
import '../../App.css';
import ChartCard from './ChartCard'
import { TickerValue } from "../TickerControl.js";
import { DanInput } from "../DanInput.jsx";

const ChartCards = () => {
    //console.log("Ticker value from OverviewCards: " + TickerValue.current);
    const [tickerStored, setTicker] = React.useState(TickerValue.current);
    const [tickerShown, changeTicker] = React.useState(tickerStored);
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState(null);

    function tickerUpdate(field, value) {
        // Here, we are not bothering with the field value, as we only have one input
        setTicker(value);
    }

    function doSomething() {
        // Sets the ticker value, ultimately causing all related cards to be updated
        TickerValue.set(tickerStored.toUpperCase());
        changeTicker(tickerStored.toUpperCase());
    }

    React.useEffect(() => {
        fetch("http://localhost:9000/intrinio_realtime_price", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(intrinio_realtime_price => intrinio_realtime_price.json())
            .then(data => {
                setData(data)
                setIsLoading(false)
            });
    }, [TickerValue.current])

    if (isLoading) return null
    return (
        <div>
            <div className="container-fluid Cards">
            <div className="header-parent">
                    <h2 className="header">
                        <h2 className="ticker-header">{TickerValue.current.toUpperCase()} </h2>Chart
                        <h2 className="center">${(data.last_price).toFixed(2)}</h2>
                    </h2>
                </div>
                {/*<input className="form-control mr-sm-2" type="search" placeholder="Search Ticker" aria-label="Search" />*/}
                <div className="search-form">
                    <div className="row">
                        <div className="col-lg-12">
                            <DanInput
                                className="form-control mr-sm-2"
                                placeholder="Search Ticker"
                                aria-label="Search"
                                onUpdate={tickerUpdate}
                                onEnter={doSomething}
                            />
                        </div>
                    </div>
                </div>
                <ChartCard showTicker={tickerShown} />
            </div>
        </div>
    );
}

export default ChartCards;