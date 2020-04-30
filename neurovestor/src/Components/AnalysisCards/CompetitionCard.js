import React from 'react';
import '../../App.css';
import { Card } from 'antd';
import { TickerValue } from "../TickerControl.js";
import CardHeaderButtons from '../CardHeaderButtons'
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

const CompetitionCard = (props) => {
    const [data, setData] = React.useState([0, 1, 2, 3, 4]);
    const [isLoading, setIsLoading] = React.useState(true);

    const callAPI = () => {
        fetch("http://localhost:9000/iex_competition", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        }).catch(err => {
            console.log(err);
        })
            .then(iex_competition => iex_competition.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        loadState = false;
    }

    React.useEffect(() => {
        if (remountHelper.state) {
            console.log("CompetitionCard good to load first pass");
            callAPI()
        } else {
            if (!loadState) {
                console.log("Pass fetch on CompetitionCard");
                loadState = true;
            } else {
                callAPI()
            }
        }
    }, [TickerValue.current])

    return (
        <Card
            className="CompetitionCard"
            title={"Profile"}
            style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            extra={<CardHeaderButtons cardId={props.card} changeCard={props.change} />}
        >
          <div className="center">
            <h4>{data[0]}</h4>
            <h4>{data[1]}</h4>
            <h4>{data[2]}</h4>
            <h4>{data[3]}</h4>
            <h4>{data[4]}</h4>
          </div>
        </Card>
    )
}

export default CompetitionCard
