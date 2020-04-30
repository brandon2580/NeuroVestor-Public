import React from "react";
import { Card } from "antd";
import { TickerValue } from "../TickerControl.js";
import CardHeaderButtons from "../CardHeaderButtons";
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

const ContactCard = (props) => {
    const [data, setData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const callAPI = () => {
        fetch("http://localhost:9000/iex_contact", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        }).catch(err => {
            console.log(err);
        })
            .then(iex_contact => iex_contact.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        loadState = false;
    }

    React.useEffect(() => {
        if (remountHelper.state) {
            console.log("ContactCard good to load first pass");
            callAPI()
        } else {
            if (!loadState) {
                console.log("Pass fetch on ContactCard");
                loadState = true;
            } else {
                callAPI()
            }
        }
    }, [TickerValue.current])

    return (
        <Card
            className="ContactCard"
            title={"Contact"}
            style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            extra={<CardHeaderButtons cardId={props.card} changeCard={props.change} />}
        >
            <h6>Website: {data.website} </h6>
            <h6>Phone Number: {data.phone}</h6>
            <h6>Business Address: {data.address}</h6>
        </Card>
    )

}

export default ContactCard;
