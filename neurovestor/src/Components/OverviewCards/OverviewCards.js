import React from "react";
import "../../App.css";
import ProfileCard from "./ProfileCard";
import KeyDataCard from "./KeyDataCard";
import MetricsChartCard from "./MetricsChartCard";
import BasicFinancialsCard from "./BasicFinancialsCard";
import NewsCard from "./NewsCard";
import EarningsCard from "./EarningsCard";
import ContactCard from "./ContactCard";
import InstitutionalOwnershipCard from "./InstitutionalOwnershipCard";
import RecommendationsCard from "../AnalysisCards/RecommendationsCard";
import AdvancedKeyDataCard from "../AnalysisCards/AdvancedKeyDataCard";
import ValuationCard from "../AnalysisCards/ValuationCard";
import CompetitionCard from "../AnalysisCards/CompetitionCard";
import TurnoverCard from "../AnalysisCards/TurnoverCard";
import GrowthCard from "../AnalysisCards/GrowthCard";
import EstimatesComparisonCard from "../AnalysisCards/EstimatesComparisonCard";
import SocialSentimentCard from "../AnalysisCards/SocialSentimentCard";
import { TickerValue } from "../TickerControl.js";
import { DanInput } from "../DanInput.jsx";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Button } from "antd";
import { remountHelper } from "../RemountHelper.js";

const OverviewCards = () => {
    const GridLayout = WidthProvider(Responsive);
    const [tickerStored, setTicker] = React.useState(TickerValue.current);
    const [tickerShown, changeTicker] = React.useState(tickerStored);
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState(null);

    /*
    Grid layout:
    layout is traditionally tied to the 'layout' array of objects, declared above. This can set starting stats of items, instead of
        declaring inline via the data-grid prop. I believe it is required, whether empty or not.
    cols object affects things... I'm not sure exactly what
    Each sub-object needs a className of draggableBox, and a unique key
    Keys shared between different components will cause them to move and size identically, meaning you'll have no way to separate them
    data-grid determines starting position & size
    CSS of inner components needs to be modified; may need to be stripped and re-built to determine what works and what doesn't
    */

    let newTickerCode = TickerValue.current;

    function tickerUpdate(field, value) {
        // Here, we are not bothering with the field value, as we only have one input

        // Using React's useState causes all the components to re-render when updating the ticker's state here.
        // Since this updates every time a letter is typed, that can become problematic
        // What we need to do is have this function update only a local value
        newTickerCode = value;
    }

    function doSomething() {
        // Sets the ticker value, ultimately causing all related cards to be updated
        remountHelper.set(false);
        TickerValue.set(newTickerCode.toUpperCase());
        changeTicker(newTickerCode.toUpperCase());
        
    }

    React.useEffect(() => {
        fetch("http://localhost:9000/intrinio_realtime_price", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({ ticker: TickerValue.current })
        })
            .then(intrinio_realtime_price => intrinio_realtime_price.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
    }, [TickerValue.current]);

    // Since each 'card' can be swapped out, we need to maintain a separation between the cards and the inner data
    // that the cards show.
    // Name - what value that we will search for when selecting a card
    // Action - Function called when we want to render the selected card
    // w - how wide to display this card
    // h - how tall to display this card
    // To add a new card type, you will need to add to this list. You will also need to add it to the CardHeaderButtons to make
    // it selectable. We may want to 'export' this list, so that CardHeaderButtons.js can reference it for deciding what
    // buttons to generate, thus saving the work of getting the two lists to match.

    const cardContent = [
        {
            name: "Metrics Chart",
            action: cardId => <MetricsChartCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 7,
            h: 14
        },
        {
            name: "Profile",
            action: cardId => <ProfileCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 8,
            h: 17
        },
        {
            name: "Recommendations",
            action: cardId => <RecommendationsCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 6,
            h: 10
        },
        {
            name: "Advanced Key Data",
            action: cardId => <AdvancedKeyDataCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 6,
            h: 20
        },
        {
            name: "Valuation",
            action: cardId => <ValuationCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 6,
            h: 16
        },
        {
            name: "Competition",
            action: cardId => <CompetitionCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 8,
            h: 14
        },
        {
            name: "Turnover Info",
            action: cardId => <TurnoverCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 6,
            h: 12
        },
        {
            name: "Growth Info",
            action: cardId => <GrowthCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 8,
            h: 18
        },
        {
            name: "Estimates Comparison",
            action: cardId => <EstimatesComparisonCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 6,
            h: 14
        },
        {
            name: "Social Sentiment",
            action: cardId => <SocialSentimentCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 6,
            h: 7    
        },
        {
            name: "Contact",
            action: cardId => <ContactCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 8,
            h: 5
        },
        {
            name: "Key Data",
            action: cardId => <KeyDataCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 5,
            h: 14
        },
        {
            name: "News",
            action: cardId => <NewsCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 8,
            h: 14
        },
        {
            name: "Basic Financials",
            action: cardId => <BasicFinancialsCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 12,
            h: 14
        },
        {
            name: "Earnings",
            action: cardId => <EarningsCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 8,
            h: 14
        },
        {
            name: "Institutional Ownership",
            action: cardId => <InstitutionalOwnershipCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 12,
            h: 17
        }
    ];

    // We also need an array to manage which cards go to which displayed object. Since we're using React, we need to use it
    // to update the view, when it changes. We can go ahead and pass 'default' states to that, right here.
    const [activeCards, updateActiveCards] = React.useState([
        { id: "1", current: cardContent.find(e => e.name === "Profile"), x: 0, y: 0 },
        { id: "2", current: cardContent.find(e => e.name === "Metrics Chart"), x: 8, y: 0 },
        { id: "3", current: cardContent.find(e => e.name === "Key Data"), x: 15, y: 0 },
        { id: "4", current: cardContent.find(e => e.name === "News"), x: 0, y: 15 },
        { id: "5", current: cardContent.find(e => e.name === "Basic Financials"), x: 12, y: 15 },
        { id: "6", current: cardContent.find(e => e.name === "Earnings"), x: 0, y: 25 },
        { id: "7", current: cardContent.find(e => e.name === "Institutional Ownership"), x: 12, y: 15 }
    ]);

    function changeCard(cardId, newCardName) {
        // This allows us to change which card is shown in which slot. This definition will need to be passed otu to the
        // CardHeaderButtons component, so that it can use this there
        let cardSlot = activeCards.find(e => e.id === cardId);
        remountHelper.state = true
        if (!cardSlot) {
            console.log("Error - id of " + cardId + " was not found");
            return;
        }
        cardSlot.current = cardContent.find(e => e.name === newCardName);
        // We need to update our full list with the new content, passing it to the useState's update method
        updateActiveCards(
            activeCards.map(e => {
                if (e.id === cardSlot.id) {
                    return cardSlot;
                }
                return e;
            })
        );
    }

    if (isLoading) return null;
    console.log("Render overview");
    return (
        <div>
            <div className="container-fluid Cards">
                <div className="header-parent">
                    <h2 className="header">
                        <h2 className="ticker-header">{TickerValue.current.toUpperCase()} </h2>Overview
                        <h2 className="center">${data.last_price.toFixed(2)}</h2>
                    </h2>
                </div>

                <div className="search-form">
                    <div className="row">
                        <div className="col-lg-12">
                            <DanInput
                                className="form-control mr-sm-2"
                                placeholder="Search Ticker"
                                aria-label="Search"
                                onUpdate={tickerUpdate}
                                onEnter={doSomething}
                                onBlur={doSomething}
                            />
                        </div>
                    </div>
                </div>

                <GridLayout                    
                    cols={{ lg: 20, sm: 20, md: 20, xs: 20, xxs: 20 }}
                    rowHeight={30}
                    draggableHandle={'.ant-card-head'}
                >
                    {/* For this to work properly, we will have to do a lot of different things here. The
                        first 'task' is to map over all the active cards */}

                    {activeCards.map(card => {
                        //console.log(card.current);
                        return (
                            <div
                                className="draggableBox"
                                key={card.id}
                            
                                data-grid={{ x: card.x, y: card.y, w: card.current.w, h: card.current.h }}
                            >
                                {card.current.action(card.id)}
                            </div>
                        );
                    })}
                </GridLayout>
            </div>
        </div>
    );
};

export default OverviewCards;
