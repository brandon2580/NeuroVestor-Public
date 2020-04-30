import React from 'react';
import '../../App.css';
import { Card } from 'antd';
import { TickerValue } from "../TickerControl.js";
import CardHeaderButtons from '../CardHeaderButtons'
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

class GrowthCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { intrinio_growth_data: { data: Array.from(Array(12).keys()) } };
    }

    callAPI() {
        console.log("Fetching data...");
        fetch("http://localhost:9000/intrinio_growth_data", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(intrinio_growth_data => intrinio_growth_data.json())
            .then(intrinio_growth_data => {
                console.log("server response: ", intrinio_growth_data);
                this.setState({
                    intrinio_growth_data: intrinio_growth_data
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
            console.log("GrowthCard good to load first pass");
            this.callAPI();
        } else {
            if (!loadState) {
                // This is our first pass (and remountHelper is not set). Ignore this... but we'll need to update the load state
                console.log("Pass fetch on GrowthCard");
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
        return (
            <Card className="GrowthCard" style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            title={"Growth"} extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}>
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Y/Y Revenue Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[0].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Q/Q Revenue Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[1].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Y/Y EPS Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[2].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Q/Q EPS Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[3].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Y/Y Net Income Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[4].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Q/Q Net Income Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[5].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Y/Y EBIT Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[6].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Q/Q EBIT Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[7].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Y/Y EBITDA Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[8].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Q/Q EBITDA Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[9].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Y/Y Operating Cash Flow Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[10].value * 100).toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th scope="row">Q/Q Operating Cash Flow Growth</th>
                            <td>{(this.state.intrinio_growth_data.data[11].value * 100).toFixed(2)}%</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }
}

export default GrowthCard