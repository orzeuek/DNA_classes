# Architectural Drivers

## 1. Functional requirements
As a API client I have to be able to:
1. find fares for given: direction, passenger set, dates, railcards, discounts
2. choose delivery method for my tickts, options: ToD, eTicket (mail)
3. pay for order using one of possible payment methods:
- card
- PayPal
- Heathrow Reward Points (HRP)
- card + HRP
- PayPal + HRP
4. get content/files with bought tickets
4a. for ToD Assertis is responsible for "ticket delivery"
4b. for e-ticket, Assertis is responsible just for generate files, delivery is up to API client
5. get notification about "successful fulfilment"
6. perform refund for my tickets

System (behind the scene)  has to:
1. handle shifts settlement via LENNON
2. be up to date with recent RSP data feed
3. be accreditted by RSP

## Quality attributes
1. up time as described in agreement (~99%)
2. traffic up to 100 transactions per hour - constant traffic
3. response time below 5sec.
4. fixed version of API for that particular Client
5. time between payment suceeded and "ticket fulfilment notification" must be <30 sec.

## Project limitations
1. deadline set to 26.09.2019
2. between 1 and 3  backenders available depends on project phase

## conventions
1. PHP or Node.js
2. MySQL database
3. flow forced by our core services

## goals
1. be accreditted and be able to go live at scheduled date.

