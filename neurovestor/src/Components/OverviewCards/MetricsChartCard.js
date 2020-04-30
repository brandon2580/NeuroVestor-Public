import React from "react";
import "../../App.css";
import { Card } from "antd";
import intrinio_simpleDate from "../../functions/intrinio_simpleDate";
import CardHeaderButtons from "../CardHeaderButtons";
import CanvasJSReact from "../../assets/canvasjs.react";
import { TickerValue } from "../TickerControl.js";
import { remountHelper } from "../RemountHelper.js";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let loadState = false;

class MetricsChartCard extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
        this.state = {
            iex_price_target: "",
            intrinio_historical_price: { historical_data: Array.from(Array().keys()) },
            intrinio_historical_pricetoearnings: { historical_data: Array.from(Array().keys()) },
            intrinio_historical_pricetobook: { historical_data: Array.from(Array().keys()) },
            intrinio_historical_dividend_yield: { historical_data: Array.from(Array().keys()) },
            intrinio_historical_price_to_sales: { historical_data: Array.from(Array().keys()) },
        };
    }

    callAPI() {
        console.log("Projections card using code " + TickerValue.current);
        fetch("http://localhost:9000/iex_price_target", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => console.log(err))
            .then(iex_price_target => iex_price_target.json())
            .then(iex_price_target => this.setState({ iex_price_target }));

        fetch("http://localhost:9000/intrinio_historical_price", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => {
                console.log(err);
                this.setState({ intrinio_historical_price: "n/a" });
            })
            .then(intrinio_historical_price => intrinio_historical_price.json())
            .then(intrinio_historical_price => this.setState({ intrinio_historical_price }));

        fetch("http://localhost:9000/intrinio_historical_pricetoearnings", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => console.log(err))
            .then(intrinio_historical_pricetoearnings => intrinio_historical_pricetoearnings.json())
            .then(intrinio_historical_pricetoearnings => this.setState({ intrinio_historical_pricetoearnings }));

        fetch("http://localhost:9000/intrinio_historical_pricetobook", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => console.log(err))
            .then(intrinio_historical_pricetobook => intrinio_historical_pricetobook.json())
            .then(intrinio_historical_pricetobook => this.setState({ intrinio_historical_pricetobook }));

        fetch("http://localhost:9000/intrinio_historical_dividend_yield", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => console.log(err))
            .then(intrinio_historical_dividend_yield => intrinio_historical_dividend_yield.json())
            .then(intrinio_historical_dividend_yield => this.setState({ intrinio_historical_dividend_yield }));

        fetch("http://localhost:9000/intrinio_historical_price_to_sales", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .catch(err => console.log(err))
            .then(intrinio_historical_price_to_sales => intrinio_historical_price_to_sales.json())
            .then(intrinio_historical_price_to_sales => this.setState({ intrinio_historical_price_to_sales }));
            loadState = false;

    }

    componentDidMount() {
        if (remountHelper.state) {
            // If remountHelper is set to true, the page has already loaded; there will be no secondary mounting of this device
            // We are good to query the data right now
            console.log("MetricsChartCard good to load first pass");
            this.callAPI();
        } else {
            if (!loadState) {
                // This is our first pass (and remountHelper is not set). Ignore this... but we'll need to update the load state
                console.log("Pass fetch on MetricsChartCard");
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

    toggleDataSeries(e) {
        if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }

    render() {
        let functional = true;
        const priceToEarningsArray = [];
        for (let historical_data of this.state.intrinio_historical_pricetoearnings.historical_data) {
            priceToEarningsArray.push({ y: historical_data.value });
        }
        priceToEarningsArray.reverse();

        const pricetoBookArray = [];
        for (let historical_data of this.state.intrinio_historical_pricetobook.historical_data) {
            pricetoBookArray.push({ y: historical_data.value });
        }
        pricetoBookArray.reverse();

        const dividendArray = [];
        for (let historical_data of this.state.intrinio_historical_dividend_yield.historical_data) {
            dividendArray.push({ y: historical_data.value * 100 });
        }
        dividendArray.reverse();

        const priceToSalesArray = [];
        for (let historical_data of this.state.intrinio_historical_price_to_sales.historical_data) {
            priceToSalesArray.push({ y: historical_data.value });
        }
        priceToSalesArray.reverse();

        const priceAndLabelArray = [];
        if (this.state.intrinio_historical_price === "n/a") {
            functional = false;
        } else {
            for (let historical_data of this.state.intrinio_historical_price.historical_data) {
                priceAndLabelArray.push({ y: historical_data.value, label: intrinio_simpleDate(historical_data.date) });
            }
            priceAndLabelArray.reverse();
        }

        const options = {
            animationEnabled: true,
            theme: "dark2",
            backgroundColor: "",
            zoomEnabled: true,
            height: 430,
            axisY: {
                includeZero: false,
                prefix: "$",
                gridThickness: 0.25,
            },
            axisX: {
                gridThickness: 0.25,
                interval: 8,
            },
            toolTip: {
                shared: true
            },
            legend: {
                verticalAlign: "top",
                horizontalAlign: "center",
                itemclick: this.toggleDataSeries
            },

            data: [
                {
                    type: "area",
                    lineColor: "white",
                    color: "#2491FF",
                    nullDataLineDashType: "dot",
                    connectNullData: true,
                    name: "Price",
                    showInLegend: true,
                    dataPoints: priceAndLabelArray
                },
                {
                    type: "spline",
                    name: "P/E",
                    includeZero: false,
                    axisYType: "secondary",
                    showInLegend: true,
                    dataPoints: priceToEarningsArray
                },
                {
                    type: "spline",
                    name: "P/B",
                    includeZero: false,
                    axisYType: "secondary",
                    showInLegend: true,
                    dataPoints: pricetoBookArray
                },
                {
                    type: "spline",
                    name: "P/S",
                    includeZero: false,
                    axisYType: "secondary",
                    showInLegend: true,
                    dataPoints: priceToSalesArray
                },
                {
                    type: "area",
                    name: "Dividend Yield",
                    includeZero: false,
                    axisYType: "secondary",
                    showInLegend: true,
                    dataPoints: dividendArray
                }
            ]
        };
        return (
            <Card
                className="MetricsChartCard"
                title={"Metrics Chart"}
                style={{ height: '100%', width: '100%', overflow: 'auto',  scrollbarColor: '#152233 #131722' }}
                extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}
            >
                {functional ? (
                    <div className="row" style={{overflow: '-webkit-paged-x'}}>
                        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
                    </div>
                ) : (
                        "No Data Available"
                    )}
            </Card>
        );
    }
}

export default MetricsChartCard;
