const express = require("express");
const cors = require("cors");

const controllers = {
  eventProvider: require("./event_provider/event_provider.controller"),
  eventCategory: require("./event_category/event_category.controller"),
  event: require("./event/event.controller"),
  eventConsumer: require("./event_consumer/event_consumer.controller"),
  eventJoinEventConsumer: require("./event_join_event_consumer/event_join_event_consumer.controller"),
};

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use("/api/event_providers", controllers.eventProvider);
app.use("/api/event_categories", controllers.eventCategory);
app.use("/api/events", controllers.event);
app.use("/api/event_consumers", controllers.eventConsumer);
app.use("/api/events_event_consumers", controllers.eventJoinEventConsumer);

app.use("/", express.static("public"));
// serve static files in express
// https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
