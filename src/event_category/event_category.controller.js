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

router.post("/", async (req, res) => {
    try {
        const result = await eventCategoryModel.create(req.body);
        res.status(204).end();
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

router.patch("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await eventCategoryModel.update(id, req.body);
        res.status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await eventCategoryModel.remove(id);
        res.send("event category deleted").status(204);
    } catch(err) {
        res.send(err).status(404);
    }
});

module.exports = router;