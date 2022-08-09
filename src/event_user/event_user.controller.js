const express = require("express");
const router = express.Router();
const eventUserModel = require("./event_user.model");

router.get("/", async (req, res) => {
    try {
        const eventsUsers = await eventUserModel.getAll();
        res.send(eventsUsers).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await eventUserModel.create(req.body);
        res.send("event user created").status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await eventUserModel.remove(id);
        res.send("event user deleted").status(204);
    } catch(err) {
        res.send(err).status(404);
    }
});

module.exports = router;