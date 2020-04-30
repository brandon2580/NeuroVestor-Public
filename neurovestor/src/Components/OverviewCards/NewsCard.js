import React from "react";
import { Card } from "antd";
import { TickerValue } from "../TickerControl.js";
import CardHeaderButtons from "../CardHeaderButtons";
import { remountHelper } from "../RemountHelper.js";

let loadState = false;

const NewsCard = (props) => {
    const [data, setData] = React.useState({ news: Array.from(Array(20).keys(20)) });
    const [isLoading, setIsLoading] = React.useState(true);

    const callAPI = () => {
        fetch("http://localhost:9000/intrinio_news", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        }).catch(err => {
            console.log(err);
        })
            .then(intrinio_news => intrinio_news.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        loadState = false;
    }

    React.useEffect(() => {
        if (remountHelper.state) {
            console.log("NewsCard good to load first pass");
            callAPI()
        } else {
            if (!loadState) {
                console.log("Pass fetch on NewsCard");
                loadState = true;
            } else {
                callAPI()
            }
        }
    }, [TickerValue.current])

    return (
        <Card
            className="NewsCard"
            title={"News"}
            style={{ height: '100%', overflow: 'auto', scrollbarColor: '#152233 #131722' }}
            extra={<CardHeaderButtons cardId={props.card} changeCard={props.change} />}>
            {data.news.map(news => {
                return (
                    <div className="WhiteTitle">
                        <Card title={news.title}>
                            <p>{news.summary}</p>
                            <a target="_blank" href={news.url}>
                                {news.url}
                            </a>
                        </Card>
                    </div>
                )
            })}
        </Card>
    )
}

export default NewsCard;
