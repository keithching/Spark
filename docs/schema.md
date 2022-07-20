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