import React from "react";
import { Card } from "antd";
import { TickerValue } from "../TickerControl.js";
import CardHeaderButtons from "../CardHeaderButtons";
import { remountHelper } from "../RemountHelper.js";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let loadState = false;

const EarningsCard = (props) => {
    const [data, setData] = React.useState({earnings: [0]});
    const [isLoading, setIsLoading] = React.useState(true);

    const callAPI = () => {
        fetch("http://localhost:9000/iex_earnings", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        }).catch(err => {
            console.log(err);
        })
            .then(iex_earnings => iex_earnings.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        loadState = false;
    }

    React.useEffect(() => {
        if (remountHelper.state) {
            console.log("EarningsCard good to load first pass");
            callAPI()
        } else {
            if (!loadState) {
                console.log("Pass fetch on EarningsCard");
                loadState = true;
            } else {
                callAPI()
            }
        }
    }, [TickerValue.current])

    const options = {
        animationEnabled: true,
        theme: "dark2",
        backgroundColor: "",
        axisY: {
            prefix: "$",
            suffix: " EPS",
            includeZero: false,
            gridThickness: 0.25
        },
        toolTip: {
            shared: true,
            reversed: true
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "center",
        },
        data: [
            {
                type: "stackedColumn",
                color: "#2491FF",
                yValueFormatString: "$##.00",
                name: "Actual",
                showInLegend: true,
                dataPoints: [
                    { label: "2016", y: data.earnings[0].actualEPS },
                    { label: "2017", y: 5.05 },
                    { label: "2018", y: 5.53 },
                    { label: "2019", y: 6.07 }
                ]
            },
            {
                type: "line",
                name: "Estimated",
                yValueFormatString: "$##.00",
                color: "white",
                showInLegend: true,
                dataPoints: [
                    { label: "2016", y: data.earnings[0].consensusEPS },
                    { label: "2017", y: 4.89 },
                    { label: "2018", y: 5.56 },
                    { label: "2019", y: 6.22 }
                ]
            }
        ]
    };

    return (
        <Card
            className="EarningsCard"
            title={"Earnings"}
            style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            extra={<CardHeaderButtons cardId={props.card} changeCard={props.change} />}
        >
            <CanvasJSChart options={options}  />
        </Card>
    )

}

export default EarningsCard;
