const knex = require("../knex");

const {
  validProps,
  requiredProps,
  isNumberOrString,
} = require("../../util/validation");

const validateProps = validProps(["id", "event_id", "consumer_id"]);

const EVENT_JOIN_EVENT_CONSUMER_TABLE = "event_join_event_consumer";

module.exports = {
  EVENT_JOIN_EVENT_CONSUMER_TABLE,

  getAll(limit = 100) {
    return knex
      .select({
        id: "id",
        eventId: "event_id",
        consumerId: "consumer_id",
        createdAt: "created_at",
      })
      .from(EVENT_JOIN_EVENT_CONSUMER_TABLE)
      .limit(limit);
  },

  create(eventJoinEventConsumer) {
    try {
      return knex(EVENT_JOIN_EVENT_CONSUMER_TABLE).insert(
        validateProps(eventJoinEventConsumer)
      );
    } catch (err) {
      throw new Error(err);
    }
  },

  remove(id) {
    knex
      .from(EVENT_JOIN_EVENT_CONSUMER_TABLE)
      .where("id", id)
      .del()
      .catch(console.error);
  },
};
