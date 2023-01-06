# [API] Notifications Service
![CircleCI](https://img.shields.io/circleci/build/github/DiegoVictor/notifications-service?style=flat-square&logo=circleci)
![NestJS](https://img.shields.io/badge/nestjs-9.2.1-E0234E?style=flat-square&logo=nestjs)
[![eslint](https://img.shields.io/badge/eslint-8.29.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![jest](https://img.shields.io/badge/jest-28.1.3-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/notifications-service?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/notifications-service)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/notifications-service/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Notification%20Service&uri=https%3A%2F%2Fraw.githubusercontent.com%2FDiegoVictor%2Fnotifications-service%2Fmain%2FInsomnia_2022-12-15.json)

Small microservice to handle notifications, it allows you to send and cancel notifications, mark as read/unread and get the recipient notifications list.

## Table of Contents
* [Installing](#installing)
  * [Configuring](#configuring)
    * [SQLite](#sqlite)
    * [Kafka](#kafka)
* [Usage](#usage)
  * [Routes](#routes)
    * [Requests](#requests)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
The application is using just one database: [SQLite](https://www.sqlite.org/index.html). For the fastest setup is recommended to use [docker-compose](https://docs.docker.com/compose/), you just need to up all services:
```
$ docker-compose up -d
```

Or follow the instructions in [SQLite](#sqlite) and [Kafka](#kafka) sections.

### SQLite
It stores all the application's data. You just need to remember to run the migrations:
```
$ npx prisma migrate dev
```
> See more information on [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate).


### Kafka
Kafka is used to receive notifications through events:
```
$ docker-compose up -d zookeeper kafka
```
> Remember to run the application manually, see [Usage](#usage)

# Usage
To start up the app run:
```
$ yarn start:dev
```
Or:
```
npm run start:dev
```

## Routes
|route|HTTP Method|params|description
|:---|:---:|:---:|:---:
|`/notifications`|POST|Body with notification `content`, `category` and `recipientId`.|Create a new notification.
|`/notifications/recipient/:id`|GET|`:id` of the recipient.|Lists recipient notifications.
|`/notifications/recipient/:id/count`|GET|`:id` of the recipient.|Count recipient notifications.
|`/notifications/:id/cancel`|PATCH|`:id` of the notification.|Set notification as canceled.
|`/notifications/:id/read`|PATCH|`:id` of the notification.|Set notification as read.
|`/notifications/:id/unread`|PATCH|`:id` of the notification.|Set notification as unread.

### Requests
* `POST /notifications`

Request body:
```json
{
  "content": "Lorem ipsum dolor sit amet",
  "category": "example",
  "recipientId": "69c9a4f1-adbb-44c7-97ca-eac8eee9f029"
}
```

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
