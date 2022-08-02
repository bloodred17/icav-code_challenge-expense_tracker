# Expense Tracker

This repo is a submission for the coding challenge received from ICav Technologies.

## Requirements

- [Nodejs](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## Core

- [Nestjs](https://nestjs.com/) (for api)
- [Typegoose](https://typegoose.github.io/typegoose/) (for mongodb)
- [exceljs](https://github.com/exceljs/exceljs) (for csv)

## Docker

https://hub.docker.com/r/bloodred17/icav

## Local

http://localhost:3100

### Setup

1. `git clone https://github.com/bloodred17/icav-code_challenge-expense_tracker.git`

2. `npm install --legacy-peer-deps`

3. `npm run start:dev`

## Live

https://icav.ankurdutta.me <br>
https://icav-expense-tracker.onrender.com <br>

> The live version can be a little slow in the beginning because it is deployed on the free tier and can experience a cold start. The link will be live for 1 week from today (3/8/22).

Contact ankur.611@gmail.com if any issues.

## API Docs

[local: /api-docs](http://localhost:3100/api-docs)
[live: /api-docs](https://icav-expense-tracker.onrender.com/api-docs)

### * Correction in Swagger generated docs

 - /expense-tracker (displays all receipts)
 - /expense-tracker/:id (searches receipts based on Mongodb Object id)


## Author

[Ankur Dutta](https://github.com/bloodred17)
