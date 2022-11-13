const express = require("express");
const router = express.Router();
const eventModel = require("./event.model");
const { isNumberOrString } = require('../../util/validation');

router.get("/", async (req, res) => {
    try {
        const events = await eventModel.getAll();
        res.send(events).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
});

router.get("/test", async (req, res) => {
    try {
        const events = await eventModel.getAllTest().then(res => res.rows);
        res.send(events).status(200);
    } catch(err) {
        res.send(err).status(404);
    }
})

// router.get("/:eventId", async (req, res) => {
//     try {
//         const { eventId } = req.params;
//         const event = await eventModel.getById(eventId);
//         res.send(event).status(200);
//     } catch(err) {
//         res.send(err).status(404);
//     }
// })


router.post("/", async (req, res) => {
    try {
        const result = await eventModel.create(req.body);
        res.status(204).end();
    } catch(err) {
        res.send(err).status(404);
    }
});

router.get("/:eventIdOrEventProviderNameOrEventProviderEmail", async (req, res) => {
    try {
        const param = isNumberOrString(req.params.eventIdOrEventProviderNameOrEventProviderEmail);
        if (param.type === 'number') {
            // https://expressjs.com/en/guide/migrating-5.html
            // quote: "If you need to send a number by using the res.send() function, quote the number to convert it to a string, 
            // so that Express does not interpret it as an attempt to use the unsupported old signature."
            res.send(param.value.toString()).status(200);
            // const event = await eventModel.getById(param.value);
            // res.send(event).status(200);
        } else if (param.type === 'string') {
            // debugging: pure string
            if (!param.value.includes(".com")) {
                res.send(param.value).status(200);
                // const event = await eventModel.getByEventProviderName(param.value);
                // res.send(event).status(200);
            }
            
            // email
            const event = await eventModel.getByEventProviderEmail(param.value);
            res.send(event).status(200);
        }
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