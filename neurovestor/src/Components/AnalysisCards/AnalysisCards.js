import React from 'react';
import '../../App.css';
import MetricsChartCard from './MetricsChartCard';
import CompetitionCard from "./CompetitionCard"
import RecommendationsCard from './RecommendationsCard';
import ValuationCard from './ValuationCard';
import GrowthCard from './GrowthCard'
import TurnoverCard from './TurnoverCard'
import EstimatesComparisonCard from './EstimatesComparisonCard'
import AdvancedKeyDataCard from './AdvancedKeyDataCard'
import SocialSentimentCard from './SocialSentimentCard';
import ProfileCard from "../OverviewCards/ProfileCard";
import KeyDataCard from "../OverviewCards/KeyDataCard";
import NewsCard from "../OverviewCards/NewsCard";
import ContactCard from "../OverviewCards/ContactCard";
import BasicFinancialsCard from "../OverviewCards/BasicFinancialsCard";
import EarningsCard from "../OverviewCards/EarningsCard";
import InstitutionalOwnershipCard from "../OverviewCards/InstitutionalOwnershipCard";
import { TickerValue } from "../TickerControl.js";
import { remountHelper } from "../RemountHelper"
import { DanInput } from "../DanInput.jsx";
import { WidthProvider, Responsive } from "react-grid-layout";

const AnalysisCards = () => {
    const GridLayout = WidthProvider(Responsive);
    const [tickerStored, setTicker] = React.useState(TickerValue.current);
    const [tickerShown, changeTicker] = React.useState(tickerStored);
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState(null);

    let newTickerCode = TickerValue.current;

    function tickerUpdate(field, value) {
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

    const cardContent = [
        {
            name: "Metrics Chart",
            action: cardId => <MetricsChartCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 14,
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
            w: 6,
            h: 7 
        },
        {
            name: "Turnover Info",
            action: cardId => <TurnoverCard showTicker={tickerShown} card={cardId} change={changeCard} />,
            w: 8,
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

    const [activeCards, setActiveCards] = React.useState([
        { id: "1", current: cardContent.find(e => e.name === "Metrics Chart"), x: 0, y: 0 },
        { id: "2", current: cardContent.find(e => e.name === "Recommendations"), x: 20, y: 0 },
        { id: "3", current: cardContent.find(e => e.name === "Social Sentiment"), x: 20, y: 0 },
        { id: "4", current: cardContent.find(e => e.name === "Valuation"), x: 8, y: 15 },
        { id: "5", current: cardContent.find(e => e.name === "Competition"), x: 14, y: 0 },
        { id: "6", current: cardContent.find(e => e.name === "Advanced Key Data"), x: 15, y: 0 },
        { id: "7", current: cardContent.find(e => e.name === "Turnover Info"), x: 0, y: 30 },
        { id: "8", current: cardContent.find(e => e.name === "Growth Info"), x: 0, y: 25 },
        { id: "9", current: cardContent.find(e => e.name === "Estimates Comparison"), x: 8, y: 50 },
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

        setActiveCards(
            activeCards.map(e => {
                if (e.id === cardSlot.id) {
                    return cardSlot;
                }
                return e;
            })
        );
    }

    if (isLoading) return null;
    console.log("Render analysis");
    return (
        <div>
            <div className="container-fluid Cards">
                <div className="header-parent">
                    <h2 className="header">
                        <h2 className="ticker-header">{TickerValue.current.toUpperCase()} </h2>Analysis
                        <h2 className="center">${(data.last_price).toFixed(2)}</h2>
                    </h2>
                </div>
                {/*<input className="form-control mr-sm-2" type="search" placeholder="Search Ticker" aria-label="Search" />*/}
                <div className="search-form">
                    <div className="row">
                        <div className="col-lg-12">
                            <DanInput
                                className="form-control mr-sm-2"
                                placeholder="Search Ticker"
                                aria-label="Search"
                                onUpdate={tickerUpdate}
                                onEnter={doSomething}
                            />
                        </div>
                    </div>
                </div>
                <GridLayout                    
                    cols={{ lg: 20, sm: 20, md: 20, xs: 20, xxs: 20 }}
                    rowHeight={30}
                    measureBeforeMount={true}
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
}

export default AnalysisCards;
