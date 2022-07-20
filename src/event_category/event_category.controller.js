const express = require("express");
const router = express.Router();
const eventCategoryModel = require("./event_category.model");

router.get("/", async (req, res) => {
    try {
        const eventCatgories = await eventCategoryModel.getAll();
        res.send(eventCatgories).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eventCategory = await eventCategoryModel.getById(id);
        res.send(eventCategory).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
});

module.exports = router;