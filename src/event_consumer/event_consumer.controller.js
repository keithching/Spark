const express = require("express");
const router = express.Router();
const eventConsumerModel = require("./event_consumer.model");
const { isNumberOrString } = require("../../util/validation");

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
  } catch (err) {
    res.send(err).status(404);
  }
});

router.get("/:idOrNameOrEmail", async (req, res) => {
  try {
    const idOrNameOrEmail = req.params.idOrNameOrEmail;
    if (!idOrNameOrEmail.includes(".com")) {
      const eventConsumer = await eventConsumerModel.getByIdOrName(
        idOrNameOrEmail
      );
      res.send(eventConsumer).status(200);
    }

    // email
    const eventConsumer = await eventConsumerModel.getByEmail(idOrNameOrEmail);
    res.send(eventConsumer).status(200);
  } catch (err) {
    res.send(err).status(404);
  }
});

router.patch("/:idOrEmail", async (req, res) => {
  try {
    // TODO: name support
    const param = isNumberOrString(req.params.idOrEmail);
    if (param.type === "number") {
      await eventConsumerModel.updateById(param.value, req.body);
      res.send("event consumer updated").status(204).end();
    } else if (param.type === "string") {
      await eventConsumerModel.updateByEmail(param.value, req.body);
      res.send("event consumer updated").status(204).end();
    }
  } catch (err) {
    res.send(err).status(404);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // TODO: name support
    const id = parseInt(req.params.id);
    await eventConsumerModel.remove(id);
    res.send("eventConsumer deleted").status(204);
  } catch (err) {
    res.send(err).status(404);
  }
});

module.exports = router;
