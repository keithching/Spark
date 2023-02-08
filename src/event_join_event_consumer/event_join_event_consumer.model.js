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

  async create(eventJoinEventConsumer) {
    try {
      // pull data from DB with event_id
      const result = await knex(EVENT_JOIN_EVENT_CONSUMER_TABLE)
        .count("event_id")
        .where("event_id", eventJoinEventConsumer["event_id"])
        .first();

      if (result.count > 0) {
        throw "duplicated. abort insertion"; // abort the insertion to DB if duplication is found
      }

      return knex(EVENT_JOIN_EVENT_CONSUMER_TABLE).insert(
        validateProps(eventJoinEventConsumer)
      );
    } catch (err) {
      throw err;
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
