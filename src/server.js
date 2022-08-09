const express = require("express");
const cors = require("cors");

const controllers = {
    eventProvider: require("./event_provider/event_provider.controller"),
    eventCategory: require("./event_category/event_category.controller"),
    event: require("./event/event.controller"),
    user: require("./user/user.controller"),
    eventUser: require('./event_user/event_user.controller')
};

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use("/api/event_providers", controllers.eventProvider);
app.use("/api/event_categories", controllers.eventCategory);
app.use("/api/events", controllers.event);
app.use("/api/users", controllers.user);
app.use("/api/events_users", controllers.eventUser);

// app.use("/", express.static('public'));
// serve static files in express
// https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express

