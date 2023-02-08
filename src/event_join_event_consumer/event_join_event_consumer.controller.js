const express = require("express");
const router = express.Router();
const eventJoinEventConsumerModel = require("./event_join_event_consumer.model");

router.get("/", async (req, res) => {
  try {
    const eventsEventConsumers = await eventJoinEventConsumerModel.getAll();
    res.send(eventsEventConsumers).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/:idOrNameOrEmail", async (req, res) => {
  try {
    const idOrNameOrEmail = req.params.idOrNameOrEmail;
    if (!idOrNameOrEmail.includes(".com")) {
      const eventsEventConsumers =
        await eventJoinEventConsumerModel.getByIdOrName(idOrNameOrEmail);
      res.send(eventsEventConsumers).status(200);
    }

    // email
    const eventsEventConsumers = await eventJoinEventConsumerModel.getByEmail(
      idOrNameOrEmail
    );
    res.send(eventsEventConsumers).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.post("/", async (req, res) => {
  try {
    const incomingData = { ...req.body };

    for (const eventId of incomingData.eventIds) {
      const dataToModel = {
        event_id: eventId,
        consumer_id: incomingData.consumerId,
      };

      await eventJoinEventConsumerModel.create(dataToModel);
    }
    res.send("event-join-event-consumer created").status(204).end();
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await eventJoinEventConsumerModel.remove(id);
    res.send("event-join-event-consumer deleted").status(204);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
