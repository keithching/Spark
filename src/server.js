const express = require("express");

const controllers = {
    eventProvider: require("./event_provider/event_provider.controller"),
    eventCategory: require("./event_category/event_category.controller"),
    event: require("./event/event.controller")
};

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("First!").status(200);
});

app.use("/event_providers", controllers.eventProvider);
app.use("/event_categories", controllers.eventCategory);
app.use("/events", controllers.event);