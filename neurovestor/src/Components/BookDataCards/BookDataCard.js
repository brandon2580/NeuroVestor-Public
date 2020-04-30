import React from 'react';
import '../../App.css';
import { TickerValue } from "../TickerControl.js";
import { Card } from 'antd';

class BookDataCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { intrinio_realtime_price: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/intrinio_realtime_price", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(intrinio_realtime_price => intrinio_realtime_price.json())
            .then(intrinio_realtime_price => this.setState({ intrinio_realtime_price }));
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.showTicker !== this.props.showTicker) {
            this.callAPI();
        }
    }


    render() {
        return (
            <Card className="BookDataCard" title="Book Data">
                <h3 className="center">Last Price: {this.state.intrinio_realtime_price.last_price}</h3>
                <hr className="no-hr" />
                <h3 className="center">Bid Price: {this.state.intrinio_realtime_price.bid_price}</h3>
                <hr className="no-hr" />
                <h3 className="center">Bid Size: {this.state.intrinio_realtime_price.bid_size}</h3>
                <hr className="no-hr" />
                <h3 className="center">Ask Price: {this.state.intrinio_realtime_price.ask_price}</h3>
                <hr className="no-hr" />
                <h3 className="center">Ask Size: {this.state.intrinio_realtime_price.ask_size}</h3>
                <hr className="no-hr" />
                <h3 className="center">Exchange Volume: {this.state.intrinio_realtime_price.exchange_volume}</h3>
                <hr className="no-hr" />
                <h3 className="center">Last Time: {this.state.intrinio_realtime_price.last_time}</h3>
                <hr className="no-hr" />
            </Card>
        )
    }
}

export default BookDataCard;