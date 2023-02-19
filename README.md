# Spark API ⛩️🏯🗻

The project aims to provide the api endpoints for a potential application that allows event providers to host their events and for consumers to consume the events.

The MVP version was created during my time as a student at [Code Chrysalis](https://www.codechrysalis.io/).

Currently, It is continuously developed and maintained.

<br />

## Frontend Repo

Refer https://github.com/keithching/Spark-frontend for frontend repo.

<br />

## Tech Stack

Server

- `Node.js`
- `Express.js`
- API written in `REST API` style.

Containerization

- Development
  - The app is dockerized into two separate services (containers), namely the backend and the database.
  - A bind mount is used for persisting the database during development mode.
- Deployment
  - The app is containerized and deployed to Heroku.
  - config vars for the postgres database have been set.

Unit Testing

- `Mocha` (Testing Framework)
- `Chai` (Assertion Library)

Library

- `bcrypt` (Password Hashing)

<br />

## Ongoing Features

- uuid
- user-event relational data
- increase test coverage
- protect API routes

<br />

## API Endpoints

### Event Providers (endpoint)

Getting all the event providers.

`GET` /api/event_providers/

| return value | An array of event provider objects. |
| ------------ | ----------------------------------- |

```jsx
[
  {
    id: 1,
    name: "仮東京観光会社",
  },
  {
    id: 2,
    name: "仮京都観光会社",
  },
  {
    id: 3,
    name: "仮福岡観光会社",
  },
];
```

---

Create a new event provider.

`POST` /api/event_providers/

| return value | null |
| ------------ | ---- |

```jsx
id: 1,
name: "仮東京観光会社",
email: "a@example.com",
password: "abcd1234"
```

---

Get a single event provider by id or name.

`GET` /api/event_providers/{id or name}

| return value | An event provider object. |
| ------------ | ------------------------- |

```jsx
"id": 1,
"name": "仮東京観光会社"
```

---

Update an event provider’s information.

`PATCH` /api/event_providers/{id}

| return value | The id for the updated event provider. |
| ------------ | -------------------------------------- |

---

Delete an event provider.

`DELETE` /api/event_providers/{id}

| return value | null |
| ------------ | ---- |

---

### Event Provider (type)

| Name     | Description                           | Type    |
| -------- | ------------------------------------- | ------- |
| id       | The identifier for this resource.     | integer |
| name     | The name for this resource.           | string  |
| email    | The email for this event provider.    | string  |
| password | The password for this event provider. | string  |

<br/>

## Event Category (endpoint)

Getting all the event categories.

`GET` /api/event_categories/

| return value | An array of event category objects. |
| ------------ | ----------------------------------- |

```jsx
[
  {
    id: 1,
    name: "観光",
  },
  {
    id: 2,
    name: "ものづくり体験",
  },
  {
    id: 3,
    name: "バスツアー",
  },
];
```

---

Create a new event category.

`POST` /api/event_categories/

| return value | null |
| ------------ | ---- |

```jsx
id: 4,
name: "登山ツアー"
```

---

Get a single event category by id.

`GET` /api/event_categories/{id}

| return value | An event category object. |
| ------------ | ------------------------- |

```jsx
"id": 1,
"name": "観光"
```

---

Update an event category’s information.

`PATCH` /api/event_categories/{id}

| return value | The id for the updated event category. |
| ------------ | -------------------------------------- |

---

Delete an event category.

`DELETE` /api/event_categories/{id}

| return value | null |
| ------------ | ---- |

---

### Event Category (type)

| Name | Description                       | Type    |
| ---- | --------------------------------- | ------- |
| id   | The identifier for this resource. | integer |
| name | The name for this resource.       | string  |

<br/>

## Event (endpoint)

Getting all the events.

`GET` /api/events/

| return value | An array of event objects. |
| ------------ | -------------------------- |

```jsx
[
  {
    id: 1,
    title: "東京の観光名所巡り",
    eventProvider: "仮東京観光会社",
    eventCategory: "観光",
    location: "Tokyo",
    dateStart: "2021-12-31T15:00:00.000Z",
    dateEnd: "2022-01-01T15:00:00.000Z",
  },
  {
    id: 2,
    title: "京都日帰りツアー",
    eventProvider: "仮京都観光会社",
    eventCategory: "バスツアー",
    location: "Kyoto",
    dateStart: "2022-07-19T15:00:00.000Z",
    dateEnd: "2022-07-19T15:00:00.000Z",
  },
];
```

---

Create a new event.

`POST` /api/events/

| return value | null |
| ------------ | ---- |

```jsx
id: 3,
title: "福岡夜行バス体験",
event_provider_id: 3,
event_category_id: 3,
location: "Fukuoka",
// TODO
// dateStart: "2021-12-31T15:00:00.000Z"
// dateEnd: "2022-01-01T15:00:00.000Z"
```

---

Get a single event by id.

`GET` /api/event_categories/{id}

| return value | An event object. |
| ------------ | ---------------- |

```jsx
"id": 1,
"title": "東京の観光名所巡り",
"eventProvider": "仮東京観光会社",
"eventCategory": "観光",
"location": "Tokyo",
"dateStart": "2021-12-31T15:00:00.000Z",
"dateEnd": "2022-01-01T15:00:00.000Z"
```

---

Update an event’s information.

`PATCH` /api/events/{id}

| return value | The id for the updated event. |
| ------------ | ----------------------------- |

---

Delete an event category.

`DELETE` /api/events/{id}

| return value | null |
| ------------ | ---- |

---

### Event (type)

| Name            | Description                        | Type    |
| --------------- | ---------------------------------- | ------- |
| id              | The identifier for this resource.  | integer |
| title           | The title for the event.           | string  |
| \*eventProvider | The event provider for this event. | string  |
| \*eventCategory | The event category for this event. | string  |
| dateStart       | The start date for this event.     | date    |
| dateEnd         | The end date for this event.       | date    |

- \*denotes relational data.
