const express = require("express");

const eventProviderController = require("./event_provider/event_provider.controller");
const eventCategoryController = require("./event_category/event_category.controller");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("First!").status(200);
});

app.use("/event_providers", eventProviderController);
app.use("/event_categories", eventCategoryController);