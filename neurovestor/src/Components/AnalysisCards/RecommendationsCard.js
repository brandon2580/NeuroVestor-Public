import React from 'react';
import '../../App.css';
import { TickerValue } from "../TickerControl.js";
import { Card, Progress } from 'antd';
import CardHeaderButtons from '../CardHeaderButtons'
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

class RecommendationsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { iex_recommendations: [0] };
    }

    callAPI() {
        console.log("Fetching data...");
        fetch("http://localhost:9000/iex_recommendations", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(iex_recommendations => iex_recommendations.json())
            .then(iex_recommendations => {
                console.log("server response: ", iex_recommendations);
                this.setState({
                    iex_recommendations: iex_recommendations
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
            console.log("RecommendationCard good to load first pass");
            this.callAPI();
        } else {
            if (!loadState) {
                // This is our first pass (and remountHelper is not set). Ignore this... but we'll need to update the load state
                console.log("Pass fetch on RecommendationsCard");
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
        var ratingOne = this.state.iex_recommendations[0].ratingBuy
        var ratingTwo = this.state.iex_recommendations[0].ratingOverweight
        var ratingThree = this.state.iex_recommendations[0].ratingHold
        var ratingFour = this.state.iex_recommendations[0].ratingUnderweight
        var ratingFive = this.state.iex_recommendations[0].ratingSell
        var ratingTotal = ratingOne + ratingTwo + ratingThree + ratingFour + ratingFive
        return (
            <Card className="RecommendationsCard" style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            title={"Analyst Recommendations"} extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Buy</th>
                            <td><Progress status="success" className="analystProgress" percent={ratingOne / ratingTotal * 100} />{this.state.iex_recommendations[0].ratingBuy}</td>
                        </tr>
                        <tr>
                            <th scope="row">Overweight</th>
                            <td><Progress status="success" className="analystProgress" percent={ratingTwo / ratingTotal * 100} /> {this.state.iex_recommendations[0].ratingOverweight}</td>
                        </tr>
                        <tr>
                            <th scope="row">Hold</th>
                            <td><Progress status='normal' className="analystProgress analystProgressHold" percent={ratingThree / ratingTotal * 100} /> {this.state.iex_recommendations[0].ratingHold}</td>
                        </tr>
                        <tr>
                            <th scope="row">Underweight</th>
                            <td><Progress status='exception' className="analystProgress" percent={ratingFour / ratingTotal * 100} /> {this.state.iex_recommendations[0].ratingUnderweight}</td>
                        </tr>
                        <tr>
                            <th scope="row">Sell</th>
                            <td><Progress status="exception" className="analystProgress" percent={ratingFive / ratingTotal * 100} /> {this.state.iex_recommendations[0].ratingSell}</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }
}

export default RecommendationsCard