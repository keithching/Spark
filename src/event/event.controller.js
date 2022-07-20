const express = require("express");
const router = express.Router();
const eventModel = require("./event.model");

router.get("/", async (req, res) => {
    try {
        const events = await eventModel.getAll();
        res.send(events).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await eventModel.create(req.body);
        res.status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const event = await eventModel.getById(id);
        res.send(event).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await eventModel.update(id, req.body);
        res.status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await eventModel.remove(id);
        res.send("event deleted").status(204);
    } catch(err) {
        res.send(err).status(404);
    }
});
module.exports = router;