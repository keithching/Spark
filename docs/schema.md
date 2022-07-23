# Schema Design

`pk` = Primary Key
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## Event Provider Table

```
Table event_provider {
  id int [pk]
  name varchar(32) [not null, unique]
  email varchar(32) [not null, unique]
  password varchar(32) [not null]
}
```

## Event Category Table

```
Table event_category {
  id int [pk]
  name varchar(32) [not null, unique]
}
```

## Event Table

```
Table event {
  id int [pk]
  title varchar(32) [not null, unique]
  event_provider_id [ref: > event_provider.id, not null]
  event_category_id [ref: > event_category.id, not null]
  location varchar(32) [not null]
  date_start date [not null]
  date_end date [not null]
}
```