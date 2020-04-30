import React from "react";
import { Card } from "antd";
import { TickerValue } from "../TickerControl.js";
import CardHeaderButtons from "../CardHeaderButtons";
import numberWithCommas from "../../functions/numberWithCommas";
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

const InstitutionalOwnershipCard = (props) => {
    const [data, setData] = React.useState(Array.from(Array(10).keys(10)));
    const [isLoading, setIsLoading] = React.useState(true);

    const callAPI = () => {
        fetch("http://localhost:9000/iex_institutional_ownership", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        }).catch(err => {
            console.log(err);
        })
            .then(iex_institutional_ownership => iex_institutional_ownership.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        loadState = false;
    }

    React.useEffect(() => {
        if (remountHelper.state) {
            console.log("InstitutionalOwnershipCard good to load first pass");
            callAPI()
        } else {
            if (!loadState) {
                console.log("Pass fetch on InstitutionalOwnershipCard");
                loadState = true;
            } else {
                callAPI()
            }
        }
    }, [TickerValue.current])

    return (
        <Card
            className="InstitutionalOwnership"
            title={"Institutional Ownership"}
            style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            extra={<CardHeaderButtons cardId={props.card} changeCard={props.change} />}
        >
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Institution Name</th>
                        <th scope="col">Reported Shares Held</th>
                        <th scope="col">Adjusted Shares Held</th>
                        <th scope="col">Value Of Holding</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{data[0].entityProperName}</th>
                        <td>{numberWithCommas(data[0].reportedHolding)}</td>
                        <td>{numberWithCommas(data[0].adjHolding)}</td>
                        <td>${numberWithCommas(data[0].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[1].entityProperName}</th>
                        <td>{numberWithCommas(data[1].reportedHolding)}</td>
                        <td>{numberWithCommas(data[1].adjHolding)}</td>
                        <td>${numberWithCommas(data[1].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[2].entityProperName}</th>
                        <td>{numberWithCommas(data[2].reportedHolding)}</td>
                        <td>{numberWithCommas(data[2].adjHolding)}</td>
                        <td>${numberWithCommas(data[2].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[3].entityProperName}</th>
                        <td>{numberWithCommas(data[3].reportedHolding)}</td>
                        <td>{numberWithCommas(data[3].adjHolding)}</td>
                        <td>${numberWithCommas(data[3].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[4].entityProperName}</th>
                        <td>{numberWithCommas(data[4].reportedHolding)}</td>
                        <td>{numberWithCommas(data[4].adjHolding)}</td>
                        <td>${numberWithCommas(data[4].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[5].entityProperName}</th>
                        <td>{numberWithCommas(data[5].reportedHolding)}</td>
                        <td>{numberWithCommas(data[5].adjHolding)}</td>
                        <td>${numberWithCommas(data[5].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[6].entityProperName}</th>
                        <td>{numberWithCommas(data[6].reportedHolding)}</td>
                        <td>{numberWithCommas(data[6].adjHolding)}</td>
                        <td>${numberWithCommas(data[6].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[7].entityProperName}</th>
                        <td>{numberWithCommas(data[7].reportedHolding)}</td>
                        <td>{numberWithCommas(data[7].adjHolding)}</td>
                        <td>${numberWithCommas(data[7].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[8].entityProperName}</th>
                        <td>{numberWithCommas(data[8].reportedHolding)}</td>
                        <td>{numberWithCommas(data[8].adjHolding)}</td>
                        <td>${numberWithCommas(data[8].adjMv)}</td>
                    </tr>
                    <tr>
                        <th scope="row">{data[9].entityProperName}</th>
                        <td>{numberWithCommas(data[9].reportedHolding)}</td>
                        <td>{numberWithCommas(data[9].adjHolding)}</td>
                        <td>${numberWithCommas(data[9].adjMv)}</td>
                    </tr>
                </tbody>
            </table>
        </Card>
    )
}

export default InstitutionalOwnershipCard;
