/* Ticker control

    Here, we want to provide a way to set and read a ticker value. We are doing this separate from React,
    as it is proving difficult to work around React-Router-Dom (I don't yet understand it)
    This might be considered a hack, but should hopefully get the job done.
*/

export const TickerValue = {
    current: "AAPL",
    set: value => {
        TickerValue.current = value;
    }
};
