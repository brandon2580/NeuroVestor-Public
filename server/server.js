/*
    NeuroVestor
    Server software
    Rebuild from the original server code, to hopefully fix bugs this time around
*/

const express = require("express");
const IEXCloudClient = require("node-iex-cloud");
const axios = require("axios");
const intrinio = require("intrinio-sdk");
const fetch = require("node-fetch");
const cors = require("cors");
const firebase = require("firebase");
var CronJob = require('cron').CronJob;

const admin = require("firebase-admin");
let serviceAccount = require("PathToServiceKey");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

/*
firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});
*/
/*
firebase.initializeApp({
    apiKey: "AIzaSyAlddj_24qBoYD847G1MkFgPihFhP-UrkU",
    authDomain: "neurovestor.firebaseapp.com",
    projectId: "neurovestor",
    databaseURL: "https://neurovestor.firebaseio.com"
});

require("firebase/firestore");

//const admin = require("firebase-admin");
//const functions = require("firebase-functions");
//admin.initializeApp(functions.config().firebase);
//let db = admin.firestore();

let db = firebase.firestore();
//let db = firebase.initializeApp({});
*/
app = express();

let ticker = "AAPL";

iexKey = {
    sandbox: true,
    publishable: "Tpk_6009e7dbf79e4d2687724dbb55d86f1c",
    version: "stable"
};

// Now, let's build some structures, to manage responses
routes = [
    {
        name: "/iex_annual_balance-sheet",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("annual_balance_sheets").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_annual_balance_sheet);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .balanceSheet((period = "annual"), (last = 5))
                        .then(data => {
                            res.send(data)
                            db.collection("annual_balance_sheets")
                                .doc(ticker)
                                .set({ iex_annual_balance_sheet: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_annual_balance_sheet");
                                return;
                            }
                            console.log("Received new error through iex_annual_balance_sheet: ", err.message);
                            //console.log(error);
                        })
                });
        }
    },
    {
        name: "/iex_quarterly_balance-sheet",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("quarterly_balance_sheets").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_quarterly_balance_sheet);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .balanceSheet((period = "quarterly"), (last = 5))
                        .then(data => {
                            res.send(data)
                            db.collection("quarterly_balance_sheets")
                                .doc(ticker)
                                .set({ iex_quarterly_balance_sheet: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_quarterly_balance_sheet");
                                return;
                            }
                            console.log("Received new error through iex_quarterly_balance_sheet: ", err.message);
                            //console.log(error);
                        })
                });
        }
    },
    {
        name: "/iex_annual_income-statement",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("annual_income_statements").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_annual_income_statement);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .income((period = "annual"), (last = 5))
                        .then(data => {
                            res.send(data)
                            db.collection("annual_income_statements")
                                .doc(ticker)
                                .set({ iex_annual_income_statement: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_annual_income");
                                return;
                            }
                            console.log("Received new error through iex_annual_income: ", err.message);
                            //console.log(error);
                        })
                });
        }
    },
    {
        name: "/iex_quarterly_income-statement",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("quarterly_income_statements").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_quarterly_income_statement);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .income((period = "quarterly"), (last = 5))
                        .then(data => {
                            res.send(data)
                            db.collection("quarterly_income_statements")
                                .doc(ticker)
                                .set({ iex_quarterly_income_statement: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_quarterly_income_statement");
                                return;
                            }
                            console.log("Received new error through iex_quarterly_income_statement: ", err.message);
                            //console.log(error);
                        })
                });
        }
    },
    {
        name: "/iex_annual_cash-flow",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("annual_cashflow_statements").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_annual_cash_flow);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .cashFlow((period = "annual"), (last = 5))
                        .then(data => {
                            res.send(data)
                            db.collection("annual_cashflow_statements")
                                .doc(ticker)
                                .set({ iex_annual_cash_flow: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_annual_cash_flow");
                                return;
                            }
                            console.log("Received new error through iex_annual_cash_flow: ", err.message);
                            //console.log(error);
                        })
                })
        }
    },
    {
        name: "/iex_quarterly_cash-flow",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("quarterly_cashflow_statements").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_quarterly_cash_flow);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .cashFlow((period = "quarterly"), (last = 5))
                        .then(data => {
                            res.send(data)
                            db.collection("quarterly_cashflow_statements")
                                .doc(ticker)
                                .set({ iex_quarterly_cash_flow: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_quarterly_cash_flow");
                                return;
                            }
                            console.log("Received new error through iex_quarterly_cash_flow: ", err.message);
                            //console.log(error);
                        })
                })
        }
    },
    {
        name: "/iex_key_data",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("key_data").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_key_data);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .stats()
                        //.historical()
                        .then(data => {
                            res.send(data)
                            db.collection("key_data")
                                .doc(ticker)
                                .set({ iex_key_data: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_key_data");
                                return;
                            }
                            console.log("Received new error through iex_key_data: ", err.message);
                            //console.log(error);
                        })
                });
        }
    },
    {
        name: "/iex_contact",
        mgr: "iex",
        handle: (res, iex) => {
            let docRef = db.collection("contacts").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_contact);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    iex
                        .symbol(ticker)
                        .company()
                        .then(data => {
                            res.send(data)
                            db.collection("contacts")
                                .doc(ticker)
                                .set({ iex_contact: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_contact");
                                return;
                            }
                            console.log("Received new error through iex_contact: ", err.message);
                            //console.log(error);
                        })
                })
        }
    },
    {
        name: "/iex_competition",
        mgr: "iex",
        handle: (res, iex) => {
            let docRef = db.collection("competitors").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_competition);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    iex
                        .symbol(ticker)
                        .peers()
                        .then(data => {
                            res.send(data)
                            db.collection("competitors")
                                .doc(ticker)
                                .set({ iex_competition: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_competition");
                                return;
                            }
                            console.log("Received new error through iex_competition: ", err.message);
                            //console.log(error);
                        })
                })
        }
    },
    {
        name: "/iex_recommendations",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("recommendations").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_recommendations);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");

                    iex
                        .symbol(ticker)
                        .recommendationTrends()
                        .then(data => {
                            res.send(data)
                            db.collection("recommendations")
                                .doc(ticker)
                                .set({ iex_recommendations: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_recommendations");
                                return;
                            }
                            console.log("Received new error through iex_recommendations: ", err.message);
                            //console.log(error);
                        })
                })
        }
    },
    {
        name: "/iex_earnings",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("earnings").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_earnings);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .earnings()
                        //.historical()
                        .then(data => {
                            res.send(data)
                            db.collection("earnings")
                                .doc(ticker)
                                .set({ iex_earnings: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_earnings");
                                return;
                            }
                            console.log("Received new error through iex_earnings: ", err.message);
                            //console.log(error);
                        })
                });
        }
    },
    {
        name: "/iex_institutional_ownership",
        mgr: "iex",
        handle: (res, iex) => {
            let docRef = db.collection("institutional_ownership").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_institutional_ownership);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");

                    iex
                        .symbol(ticker)
                        .institutionalOwnership()
                        .then(data => {
                            res.send(data)
                            db.collection("institutional_ownership")
                                .doc(ticker)
                                .set({ iex_institutional_ownership: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_institutional_ownership");
                                return;
                            }
                            console.log("Received new error through iex_institutional_ownership: ", err.message);
                            //console.log(error);
                        })
                })
        }
    },
    {
        name: "/iex_price_target",
        mgr: "iex",
        handle: (res, iex) =>
            iex
                .symbol(ticker)
                .priceTarget()
                .then(data => res.send(data))
                .catch(err => {
                    if (err.message.trim() === "Not Found") {
                        res.status(400).send({ message: "No data available for ticker " + ticker });
                        console.log("Handled no-ticker-data in iex_price_target");
                        return;
                    }
                    console.log("Received error in iex_price_target: ", err.message);
                    //console.log(error);
                })
    },
    {
        name: "/intrinio_historical_price",
        mgr: "int",
        handle: res => {
            //var tag = "adj_close_price"; // String | An Intrinio data tag ID or code reference [see - https://data.intrinio.com/data-tags]
            var opts = {
                frequency: "weekly", // String | Return historical data in the given frequency
                type: null, // String | Return historical data for given fiscal period type
                startDate: new Date("2018-01-01"), // Date | Return historical data on or after this date
                endDate: null, // Date | Return historical data on or before this date
                sortOrder: "desc", // String | Sort by date `asc` or `desc`
                pageSize: 100, // Number | The number of results to return
                nextPage: null // String | Gets the next page of data from a previous API call
            };

            new intrinio.CompanyApi()
                .getCompanyHistoricalData(ticker, "adj_close_price", opts)
                .then(data => res.send(data))
                .catch(err => {
                    if (err.message.trim() === "Not Found") {
                        res.status(400).send({ message: "No data available for ticker " + ticker });
                        console.log("Handled no-ticker-data in intrinio_historical_price");
                        return;
                    }
                    console.log("Received error from intrinio_historial_price: ", err.message);
                    //console.log(err)
                });
        }
    },
    {
        name: "/intrinio_historical_pricetoearnings",
        mgr: "int",
        handle: res => {
            var tag = "pricetoearnings"; // String | An Intrinio data tag ID or code reference [see - https://data.intrinio.com/data-tags]

            var opts = {
                frequency: "weekly", // String | Return historical data in the given frequency
                type: null, // String | Return historical data for given fiscal period type
                startDate: new Date("2018-01-01"), // Date | Return historical data on or after this date
                endDate: null, // Date | Return historical data on or before this date
                sortOrder: "desc", // String | Sort by date `asc` or `desc`
                pageSize: 100, // Number | The number of results to return
                nextPage: null // String | Gets the next page of data from a previous API call
            };

            new intrinio.CompanyApi()
                .getCompanyHistoricalData(ticker, "pricetoearnings", opts)
                .then(data => res.send(data))
                .catch(err => {
                    if (err.message.trim() === "Not Found") {
                        res.status(400).send({ message: "No data available for ticker " + ticker });
                        console.log("Handled no-ticker-data in intrinio_historical_pricetoearnings");
                        return;
                    }
                    console.log("Received error from intrinio_historical_pricetoearnings: ", err.message);
                    //console.log(err);
                });
        }
    },
    {
        name: "/intrinio_historical_pricetobook",
        mgr: "int",
        handle: res => {

            var opts = {
                frequency: "weekly", // String | Return historical data in the given frequency
                type: null, // String | Return historical data for given fiscal period type
                startDate: new Date("2018-01-01"), // Date | Return historical data on or after this date
                endDate: null, // Date | Return historical data on or before this date
                sortOrder: "desc", // String | Sort by date `asc` or `desc`
                pageSize: 100, // Number | The number of results to return
                nextPage: null // String | Gets the next page of data from a previous API call
            };

            new intrinio.CompanyApi()
                .getCompanyHistoricalData(ticker, "pricetobook", opts)
                .then(data => res.send(data))
                .catch(err => {
                    if (err.message.trim() === "Not Found") {
                        res.status(400).send({ message: "No data available for ticker " + ticker });
                        console.log("Handled no-ticker-data in intrinio_historical_pricetobook");
                        return;
                    }
                    console.log("Received error from intrinio_historical_pricetobook: ", err.message);
                    //console.log(err);
                });
        }
    },
    {
        name: "/intrinio_longdescription",
        mgr: "int",
        handle: res => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("profiles").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.intrinio_longdescription);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    new intrinio.CompanyApi()
                        .getCompanyDataPointText(ticker, "long_description")
                        .then(data => {
                            //console.log("Now send to db: " + ticker + " to store:", data);
                            res.send(data);
                            // Note that we don't need to add the 'longdescription' portion here; since we are sending
                            // its raw data anyway, we can leave that off

                            // With the user now having the correct data, we need to store this to the database as well
                            db.collection("profiles")
                                .doc(ticker)
                                .set({ intrinio_longdescription: data });
                            // With the database, we want to name this field as we store it. We can add more properties
                            // to this document as we like... but for now, this will do.
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in intrinio_longdescription");
                                return;
                            }
                            console.log("Received error in intrinio_longdescription: ", err.message);
                            //console.log(err);
                        });
                });
        }
    },
    {
        name: "/intrinio_sec_filings",
        mgr: "int",
        handle: res => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("sec_filings").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.intrinio_sec_filings);
                        // Note that this is really only sending the text content of the 'opts'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now

                    var opts = {
                        'reportType': null, // String | Filter by report type [see - https://docs.intrinio.com/documentation/sec_filing_report_types]. Separate values with commas to return multiple report types.
                        'startDate': new Date("2015-01-01"), // Date | Filed on or after the given date
                        'endDate': null, // Date | Filed before or after the given date
                        'pageSize': 150, // Number | The number of results to return
                        'nextPage': null // String | Gets the next page of data from a previous API call
                    };

                    new intrinio.FilingApi()
                        .getAllFilings(ticker, opts)
                        .then(data => {
                            res.send(data);
                            db.collection("sec_filings")
                                .doc(ticker)
                                .set({ intrinio_sec_filings: JSON.stringify(data) });
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in intrinio_sec_filings");
                                return;
                            }
                            console.log("Received error in intrinio_sec_filings: ", err.message);
                            //console.log(err);
                        });
                });
        }
    },
    {
        name: "/intrinio_realtime_price",
        mgr: "int",
        handle: res => {
            var opts = {
                source: null // String | Return the realtime price from the specified data source. If no source is specified, the best source available is used.
            };

            new intrinio.SecurityApi()
                .getSecurityRealtimePrice(ticker, opts)
                .then(data => res.send(data))
                .catch(err => {
                    if (err.message.trim() === "Not Found") {
                        res.status(400).send({ message: "No data available for ticker " + ticker });
                        console.log("Handled no-ticker-data in intrinio_realtime_price");
                        return;
                    }
                    console.log("Received error in intrinio_realtime_price: ", err.message);
                    //console.log(err);
                });
        }
    },
    {
        name: "/intrinio_news",
        mgr: "int",
        handle: res => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("news").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.intrinio_news);
                        // Note that this is really only sending the text content of the 'opts'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now

                    let opts = {
                        pageSize: 20, // Number | The number of results to return
                        nextPage: null // String | Gets the next page of data from a previous API call
                    };

                    new intrinio.CompanyApi()
                        .getCompanyNews(ticker, opts)
                        .then(data => {
                            res.send(data);
                            db.collection("news")
                                .doc(ticker)
                                .set({ intrinio_news: JSON.stringify(data) });
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in intrinio_news");
                                return;
                            }
                            console.log("Received error in intrinio_news: ", err.message);
                            //console.log(err);
                        });
                });
        }
    },
    {
        name: "/intrinio_historical_dividend_yield",
        mgr: "int",
        handle: res => {
            let opts = {
                frequency: "weekly", // String | Return historical data in the given frequency
                type: null, // String | Return historical data for given fiscal period type
                startDate: new Date("2018-01-01"), // Date | Return historical data on or after this date
                endDate: null, // Date | Return historical data on or before this date
                sortOrder: "desc", // String | Sort by date `asc` or `desc`
                pageSize: 100, // Number | The number of results to return
                nextPage: null // String | Gets the next page of data from a previous API call
            };

            new intrinio.CompanyApi()
                .getCompanyHistoricalData(ticker, "dividendyield", opts)
                .then(data => res.send(data))
                .catch(err => {
                    if (err.message.trim() === "Not Found") {
                        res.status(400).send({ message: "No data available for ticker " + ticker });
                        console.log("Handled no-ticker-data in intrinio_historical_dividend_yield");
                        return;
                    }
                    console.log("Received error in intrinio_historical_dividend_yield: ", err.message);
                    //console.log(err);
                });
        }
    },
    {
        name: "/intrinio_historical_eps",
        mgr: "int",
        handle: res => {
            let opts = {
                frequency: "quarterly", // String | Return historical data in the given frequency
                startDate: new Date("2018-01-01"), // Date | Return historical data on or after this date
                sortOrder: "desc", // String | Sort by date `asc` or `desc`
                pageSize: 100 // Number | The number of results to return
            };
            new intrinio.CompanyApi()
                .getCompanyHistoricalData(ticker, "basicdilutedeps", opts)
                .then(data => res.send(data))
                .catch(err => {
                    if (err.message.trim() === "Not Found") {
                        res.status(400).send({ message: "No data available for ticker " + ticker });
                        console.log("Handled no-ticker-data in intrinio_historical_eps");
                        return;
                    }
                    console.log("Recieved error in intrinio_historical_eps: ", err.message);
                    //console.log(err);
                });
        }
    },
    {
        name: "/intrinio_historical_price_to_sales",
        mgr: "int",
        handle: res => {
            var opts = {
                frequency: "weekly", // String | Return historical data in the given frequency
                type: null, // String | Return historical data for given fiscal period type
                startDate: new Date("2018-01-01"), // Date | Return historical data on or after this date
                endDate: null, // Date | Return historical data on or before this date
                sortOrder: "desc", // String | Sort by date `asc` or `desc`
                pageSize: 100, // Number | The number of results to return
                nextPage: null // String | Gets the next page of data from a previous API call
            };

            new intrinio.CompanyApi()
                .getCompanyHistoricalData(ticker.toUpperCase(), "pricetorevenue", opts)
                .then(data => res.send(data))
                .catch(err => {
                    if (err.message.trim() === "Not Found") {
                        res.status(400).send({ message: "No data available for ticker " + ticker });
                        console.log("Handled no-ticker-data in intrinio_historical_price_to_sales");
                        return;
                    }
                    console.log("Received error in intrinio_historical_price_to_sales: ", err.message);
                    //console.log(err);
                });
        }
    },
    {
        name: "/intrinio_growth_data",
        mgr: "int",
        handle: res => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("growth_data").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.intrinio_growth_data);
                        // Note that this is really only sending the text content of the 'opts'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now


                    fetch(
                        `https://api.intrinio.com/data_point?identifier=${ticker}&item=revenuegrowth,revenueqoqgrowth,epsgrowth,epsqoqgrowth,netincomegrowth,netincomeqoqgrowth,ebitgrowth,ebitqoqgrowth,ebitdagrowth,e bitdaqoqgrowth,ocfgrowth,ocfqoqgrowth,&api_key={Ojc4MGZkOWQxZTY0ODdhOTUwN2FkYTFmYzI2ZGE0NzA1}`
                    )
                        .then(response => response.json())
                        .then(data => {
                            res.send(data);
                            db.collection("growth_data")
                                .doc(ticker)
                                .set({ intrinio_growth_data: data });
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in intrinio_growth_data");
                                return;
                            }
                            console.log("Received error in intrinio_growth_data: ", err.message);
                            //console.log(err);
                        });
                });
        }
    },
    {
        name: "/intrinio_valuation_data",
        mgr: "int",
        handle: res => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("valuation_data").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.intrinio_valuation_data);
                        // Note that this is really only sending the text content of the 'opts'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now


                    fetch(
                        `https://api.intrinio.com/data_point?identifier=${ticker}&item=marketcap,pricetoearnings,pricetorevenue,pricetobook,enterprisevalue,evtoebit,evtoebitda,evtofcff,currentratio,quickratio&api_key={Ojc4MGZkOWQxZTY0ODdhOTUwN2FkYTFmYzI2ZGE0NzA1}`
                    )
                        .then(response => response.json())
                        .then(data => {
                            res.send(data);
                            db.collection("valuation_data")
                                .doc(ticker)
                                .set({ intrinio_valuation_data: data });
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in intrinio_valuation_data");
                                return;
                            }
                            console.log("Received error in intrinio_valuation_data: ", err.message);
                            //console.log(err);
                        });
                });
        }
    },
    {
        name: "/intrinio_turnover_data",
        mgr: "int",
        handle: res => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("turnover_data").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.intrinio_turnover_data);
                        // Note that this is really only sending the text content of the 'opts'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now

                    fetch(
                        `https://api.intrinio.com/data_point?identifier=${ticker}&item=assetturnover,arturnover,faturnover,invturnover,apturnover,investedcapitalturnover,altmanzscore&api_key={Ojc4MGZkOWQxZTY0ODdhOTUwN2FkYTFmYzI2ZGE0NzA1}`
                    )
                        .then(response => response.json())
                        .then(data => {
                            res.send(data);
                            db.collection("turnover_data")
                                .doc(ticker)
                                .set({ intrinio_turnover_data: data });
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in intrinio_turnover_data");
                                return;
                            }
                            console.log("Received error in intrinio_turnover_dataa: ", err.message);
                            //console.log(err);
                        });
                });
        }
    },
    {
        name: "/iex_advanced_stats",
        mgr: "iex",
        handle: res => {
            let docRef = db.collection("advanced_stats").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_advanced_stats);
                        // Note that this is really only sending the text content of the 'opts'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    fetch(
                        `https://sandbox.iexapis.com/stable/stock/${ticker}/advanced-stats?token=Tsk_87c2708786764bdf9a89ad71675264be`
                    )
                        .then(response => response.json())
                        .then(data => {
                            res.send(data);
                            db.collection("advanced_stats")
                                .doc(ticker)
                                .set({ iex_advanced_stats: data });
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_advanced_stats");
                                return;
                            }
                            console.log("Received error in iex_advanced_stats: ", err.message);
                            //console.log(err);
                        })
                })
        }
    },
    {
        name: "/iex_options_calls",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("options_calls").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_options_calls);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now

                    // This creates a date that creates valid syntax (YYYMM) for the IEX options endpoint
                    var date = new Date()
                    var optionsDateYear = Date().slice(11, 15).toString()
                    var optionsDateMonth = date.getMonth() + 1
                    optionsDateMonth.toString()
                    var optionsDateMonthLength = optionsDateMonth.length
                    if (optionsDateMonthLength = 1) {
                        optionsDateMonth = "0" + optionsDateMonth
                    }
                    var fullOptionsDate = optionsDateYear + optionsDateMonth
                    console.log(fullOptionsDate)

                    iex
                        .symbol(ticker)
                        .options(expiration = fullOptionsDate, optionSide = "call")
                        .then(data => {
                            res.send(data)
                            db.collection("options_calls")
                                .doc(ticker)
                                .set({ iex_options_calls: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_options_calls");
                                return;
                            }
                            console.log("Received new error through iex_options_calls: ", err.message);
                            //console.log(error);
                        })
                });
        }
    },
    {
        name: "/iex_options_puts",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("options_puts").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_options_puts);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now

                    // This creates a date that creates valid syntax (YYYMM) for the IEX options endpoint
                    var date = new Date()
                    var optionsDateYear = Date().slice(11, 15).toString()
                    var optionsDateMonth = date.getMonth() + 1
                    optionsDateMonth.toString()
                    var optionsDateMonthLength = optionsDateMonth.length
                    if (optionsDateMonthLength = 1) {
                        optionsDateMonth = "0" + optionsDateMonth
                    }
                    var fullOptionsDate = optionsDateYear + optionsDateMonth
                    console.log(fullOptionsDate)

                    iex
                        .symbol(ticker)
                        .options(expiration = fullOptionsDate, optionSide = "put")
                        .then(data => {
                            res.send(data)
                            db.collection("options_puts")
                                .doc(ticker)
                                .set({ iex_options_puts: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_options_puts");
                                return;
                            }
                            console.log("Received new error through iex_options_puts: ", err.message);
                            //console.log(error);
                        })
                });
        }
    },
    {
        name: "/iex_social_sentiment",
        mgr: "iex",
        handle: (res, iex) => {
            // Rather than fetching data from the API, we will check our private database for the target data
            let docRef = db.collection("social_sentiment").doc(ticker);
            docRef
                .get()
                .catch(err => console.log("docRef failed...", err))
                .then(doc => {
                    if (doc.exists) {
                        let result = doc.data();
                        //console.log("Sending from database: ", result);
                        res.send(result.iex_social_sentiment);
                        // Note that this is really only sending the text content of the 'longdescription'. We don't need
                        // to wrap it in another object
                        return;
                    }
                    console.log("Database missing data. Get from API");
                    // The target information was not found in the database. Fetch it from the API now
                    iex
                        .symbol(ticker)
                        .sentiment(type = "daily")
                        .then(data => {
                            res.send(data)
                            db.collection("social_sentiment")
                                .doc(ticker)
                                .set({ iex_social_sentiment: data })
                        })
                        .catch(err => {
                            if (err.message.trim() === "Not Found") {
                                res.status(400).send({ message: "No data available for ticker " + ticker });
                                console.log("Handled no-ticker-data in iex_social_sentiment");
                                return;
                            }
                            console.log("Received new error through iex_social_sentiment: ", err.message);
                            //console.log(error);
                        })
                })
        }
    },
];

// db.collection('profiles').doc(ticker).delete();

/*

 var job = new CronJob('0 0 0 * 1/12 *', function () {
    console.log('You will see this message at 12:00AM, every 6 months');
}, null, true, 'America/Los_Angeles');
job.start();

*/




app.use("/", cors("localhost:3000"));
app.use("/", (req, res, next) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
        if (body === "") {
            console.log("Error: Received no JSON content from user");
            res.send("Hello, this is the server for NeuroVestor. It requires JSON content to work");
            return;
        }
        const struct = JSON.parse(body);
        ticker = struct.ticker.toUpperCase(); // we might as well make this all caps here, to avoid errors later
        next();
    });
});

// Here, we actually handle the
//app.get("/iex_balance-sheet", (req, res) => {
app.post(
    routes.map(ele => ele.name), // maps our route names to an array (which POST happily accepts)
    (req, res, next) => {
        // We got here using a specific route, but we don't have direct access to it.
        // But we can reach it again via req.originalUrl
        // Find the matching object in the routes array
        console.log("Got path: " + req.originalUrl);
        let target = routes.find(ele => ele.name === req.originalUrl);
        if (target === undefined) {
            console.log("Did not find path for " + req.originalUrl);
            res.send("");
            return;
        }
        switch (target.mgr) {
            case "iex":
                target.handle(
                    res,
                    new IEXCloudClient.IEXCloudClient(fetch, {
                        sandbox: true,
                        publishable: "Tpk_6009e7dbf79e4d2687724dbb55d86f1c",
                        version: "stable"
                    })
                );
                break;
            case "int":
                intrinio.ApiClient.instance.authentications["ApiKeyAuth"].apiKey =
                    "Ojc4MGZkOWQxZTY0ODdhOTUwN2FkYTFmYzI2ZGE0NzA1";
                target.handle(res);
                break;
        }
    }
);

app.post("*", (req, res) => {
    console.log("Error: Did not handle path " + req.route.path);
    res.send("");
});

app.listen(9000, () => console.log("Listening on port 9000"));
