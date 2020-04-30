import React from 'react';
import '../../App.css';
import { TickerValue } from "../TickerControl.js";
import { Statistic, Card, Row, Col } from 'antd';
import CardHeaderButtons from '../CardHeaderButtons'
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

class SocialSentimentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { iex_social_sentiment: "" };
    }

    callAPI() {
        console.log("Fetching data...");
        fetch("http://localhost:9000/iex_social_sentiment", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(iex_social_sentiment => iex_social_sentiment.json())
            .then(iex_social_sentiment => {
                console.log("server response: ", iex_social_sentiment);
                this.setState({
                    iex_social_sentiment: iex_social_sentiment
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
            console.log("SocialSentimentCard good to load first pass");
            this.callAPI();
        } else {
            if (!loadState) {
                // This is our first pass (and remountHelper is not set). Ignore this... but we'll need to update the load state
                console.log("Pass fetch on SocialSentimentCard");
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
        console.log(this.state.iex_social_sentiment)
        return (
            <Card className="SocialSentimentCard" style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            title={"Today's Social Sentiment"} extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Positive"
                                className="center"
                                value={(this.state.iex_social_sentiment.positive * 100).toFixed(2)}
                                valueStyle={{ color: '#3f8600' }}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Negative"
                                className="center"
                                value={(this.state.iex_social_sentiment.negative * 100).toFixed(2)}
                                valueStyle={{ color: '#cf1322' }}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default SocialSentimentCard