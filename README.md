# NeuroVestor

## About
NeuroVestor is an in-depth equity analysis tool that retrieves sandbox data from Intrinio and IEXCloud. Because IEXCloud is a pay-as-you-go service, I implemented a data caching ETL process to save money. I did this via storing the data from IEXCloud in a Firebase DB. The required data from both data providers will cost somewhere around $2,300/yr. To be 100% functional, there is some setup required, so if you are interested in using this tool for personal equity research purposes, please feel free to contact me at - dalbecb@gmail.com

## Features
- Cards on the Overview page and Analysis page are draggable, droppable, and resizable
- Firebase Auth system
- CanvaJS Charts
- ETL process to save money with IEXCloud
- Valuation metrics, growth data, key data, financials, news, trailing metrics, SEC filings, book data, charts & MUCH more

## Note
In it's current state, any user cannot completely run the project from this repository. You will be able to run the frontend code via npm install then npm start in /neurovestor. However, this will not actually display any data. If you are wanting to see actual data, you can view the project at https://neurovestor.web.app

- Please remember, you can ONLY enter tickers that are present in the DOW 30. Doing otherwise will leave you with a blank page. This is because of sandbox limitations.

- The EPS Estimates Comparison tool on the Analysis page does nothing, and contains dummy data (the proper data needed to be paid for, which I don't wanna do unless I monetize this, which I do not plan on doing)

- Most of the data on the Earnings card (Overview page) contains dummy data. This also costs money for real data

- If you create an account, email verification is required (you may sign in as a Guest)

## Overview Page
![Overview Page](https://i.gyazo.com/aec1a821ca6325d0cca439a718a9e54d.png)

## Analysis Page
![Analysis Page](https://i.gyazo.com/3e39d28396ebed055999d90032f65ef2.png)

## SEC Filings Page
![SEC Filings Page](https://i.gyazo.com/76b1509745d909c765d8eb2f1fef1155.png)

## Book Data Page
![Book Data Page](https://i.gyazo.com/9bc6c6e766442d7070dda1ae0e7e31f1.png)

## Chart Page
![Chart Page](https://i.gyazo.com/cc5272db5248411a005283ac8dcaec78.png)
