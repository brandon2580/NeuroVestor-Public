import React from 'react';
import { TickerValue } from "../TickerControl.js";
import simpleDateSEC from "../../functions/simpleDateSEC"
import '../../App.css';
import { Card } from 'antd';

class SECFilingsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { intrinio_sec_filings: { filings: Array.from(Array(50).keys()) } };
    }

    callAPI() {
        fetch("http://localhost:9000/intrinio_sec_filings", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => {
                console.log(err);
            })
            .then(intrinio_sec_filings => intrinio_sec_filings.json())
            .then(intrinio_sec_filings => {
                console.log("server response: ", intrinio_sec_filings);
                this.setState({
                    intrinio_sec_filings: intrinio_sec_filings
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

    render() {
        this.sec_filings = this.state.intrinio_sec_filings.filings.map((sec_filings) =>
            <div>
                <h6> Filing Type: {sec_filings.report_type} </h6>
                <h6> Filing Date: {simpleDateSEC(sec_filings.filing_date)} </h6>
                <h6><a target="_blank" href={sec_filings.filing_url}> {sec_filings.filing_url} </a></h6>
                <hr className="no-hr" />
            </div>
        );

        return (
            <div className="col-lg-12 center Card SECFilingsCard">
                <Card title="SEC Filings">
                    {this.sec_filings}
                </Card>
            </div>
        )
    }
}

export default SECFilingsCard;