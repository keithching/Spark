const express = require("express");
const router = express.Router();
const eventConsumerModel = require("./event_consumer.model");

router.get("/", async (req, res) => {
    try {
        const users = await eventConsumerModel.getAll();
        res.send(users).status(200);
    } catch (err) {
        res.send(err).status(404);
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await eventConsumerModel.create(req.body);
        res.send("eventConsumer created").status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.get("/:idOrName", async (req, res) => {
    try {
        const idOrName = req.params.idOrName;
        const eventConsumer = await eventConsumerModel.getByIdOrName(idOrName);
        res.send(eventConsumer).status(200);
    } 
    catch(err) {
        res.send(err).status(404);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        // TODO: name support
        const id = parseInt(req.params.id);
        await eventConsumerModel.update(id, req.body);
        res.send("eventConsumer updated").status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // TODO: name support
        const id = parseInt(req.params.id);
        await eventConsumerModel.remove(id);
        res.send("eventConsumer deleted").status(204);
    } catch(err) {
        res.send(err).status(404);
    }
});

module.exports = router;