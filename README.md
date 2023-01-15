# NeuroVestor

## About
NeuroVestor is an in-depth equity analysis tool that retrieves sandbox data from Intrinio and IEXCloud. Because IEXCloud is a pay-as-you-go service, I implemented a data caching ETL process to save money. I did this via storing the data from IEXCloud in Firebase. The required data from both data providers will run you ~$2,300/yr.

## Features
- Cards on the Overview page and Analysis page are draggable, droppable, and resizable
- Firebase Auth system
- CanvaJS Charts
- ETL process to save money with IEXCloud
- Valuation metrics, growth data, key data, financials, news, trailing metrics, SEC filings, book data, charts & MUCH more

## Note
In its current state, any user cannot completely run the project from this repository. You will be able to run the frontend code via npm install then npm start in /neurovestor. However, this will not actually display any data.

- This application is NOT meant for real world research in its current state. All of the data is sandbox test data from Intrinio and IEXCloud. I am not responsible for any financial loss as a result of your usage of NeuroVestor.

- Please remember, you can ONLY enter tickers that are present in the DOW 30. Doing otherwise will leave you with a blank page. This is because of sandbox limitations.

- After you FIRST initially load the page after logging in, you will probably have to wait a few seconds (3-10 seconds) for anything to happen. No, the page is not frozen. There are some slight inefficiencies in the ETL process causing the initial page load to take longer than expected. You might see some blank cards show up. In this case, just refresh the page and the issue should not arise again during your session. This is my first large project, so I apologize for lack of efficiency. 

- This app was not designed with mobile-friendliness in mind. With the features and flow of this web application, the developer decided that in order for it to be practically used on a mobile device, a dedicated mobile app would have to be created (this has not been done and is not planned to be done anytime soon)

- The EPS Estimates Comparison tool on the Analysis page does nothing and contains dummy data (the proper data needed to be paid for, which I don't want to do unless I monetize this, which I do not plan on doing)

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
