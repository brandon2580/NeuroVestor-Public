import React from 'react';
import '../../App.css';
import { Card } from 'antd';
import CardHeaderButtons from '../CardHeaderButtons'
import CanvasJSReact from "../../assets/canvasjs.react";
import { remountHelper } from "../RemountHelper.js";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let loadState = false;

class EstimatesComparisonCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const options = {
            animationEnabled: true,
            theme: "dark2",
            backgroundColor: "",
            data: [{
                type: "pie",
                showInLegend: true,
                legendText: "{label}",
                toolTipContent: "{label}: <strong>{y}%</strong>",
                indexLabel: "{y}%",
                indexLabelPlacement: "inside",
                dataPoints: [
                    { y: 75, label: "Beat Earnings Estimates", color: "rgb(36, 145, 255)" },
                    { y: 25, label: "Missed Earnings Estimates", color: "red" },
                ]
            }]
        }
        return (
            <Card className="EstimatesComparisonCard" style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            title={"EPS Estimates Comparison (Last 4 Years)"} extra={<CardHeaderButtons cardId={this.props.card} changeCard={this.props.change} />}>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
            </Card>
        )
    }
}

export default EstimatesComparisonCard