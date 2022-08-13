const express = require("express");
const router = express.Router();
const eventProviderModel = require("./event_provider.model");
const { isNumberOrString } = require('../../util/validation');

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
        res.send("event provider created").status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.get("/:idOrName", async (req, res) => {
    try {
        const idOrName = req.params.idOrName;
        const eventProvider = await eventProviderModel.getByIdOrName(idOrName);
        res.send(eventProvider).status(200);
    } 
    catch(err) {
        res.send(err).status(404);
    }
});

router.patch("/:idOrEmail", async (req, res) => {
    try {
        // TODO: name support
        const param = isNumberOrString(req.params.idOrEmail);
        if (param.type === 'number') {
            await eventProviderModel.updateById(param.value, req.body);
            res.send("event provider updated").status(204).end();
        } else if (param.type === 'string') {
            await eventProviderModel.updateByEmail(param.value, req.body);
            res.send("event provider updated").status(204).end();
        }
    } catch(err) {
        res.send(err).status(404);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // TODO: name support
        const id = parseInt(req.params.id);
        await eventProviderModel.remove(id);
        res.send("event provider deleted").status(204);
    } catch(err) {
        res.send(err).status(404);
    }
});

module.exports = router;