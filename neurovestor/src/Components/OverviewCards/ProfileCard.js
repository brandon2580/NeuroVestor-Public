import React from "react";
import { Card } from "antd";
import { TickerValue } from "../TickerControl.js";
import CardHeaderButtons from "../CardHeaderButtons";
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

const ProfileCard = (props) => {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const callAPI = () => {
        fetch("http://localhost:9000/intrinio_longdescription", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        }).catch(err => {
            console.log(err);
        })
            .then(intrinio_longdescription => intrinio_longdescription.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        loadState = false;
    }

    React.useEffect(() => {
        if (remountHelper.state) {
            console.log("ProfileCard good to load first pass");
            callAPI()
        } else {
            if (!loadState) {
                console.log("Pass fetch on ProfileCard");
                loadState = true;
            } else {
                callAPI()
            }
        }
    }, [TickerValue.current])

    return (
        <Card
            className="ProfileCard"
            title={"Profile"}
            style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            extra={<CardHeaderButtons cardId={props.card} changeCard={props.change} />}
        >
            <p className="ProfileText">{data}</p>
        </Card>
    )

}

export default ProfileCard;
