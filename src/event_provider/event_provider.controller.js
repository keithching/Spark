const express = require("express");
const router = express.Router();
const eventProviderModel = require("./event_provider.model");

router.get("/", async (req, res) => {
    try {
        const eventProviders = await eventProviderModel.getAll();
        res.send(eventProviders).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await eventProviderModel.create(req.body);
        res.status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.get("/:idOrName", async (req, res) => {
    try {
        const idOrName = parseInt(req.params.idOrName);
        const eventProvider = await eventProviderModel.getByIdOrName(idOrName);
        res.send(eventProvider).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await eventProviderModel.update(id, req.body);
        res.status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await eventProviderModel.remove(id);
        res.send("event provider deleted").status(204);
    } catch(err) {
        res.send(err).status(404);
    }
});

module.exports = router;