const knex = require("../knex");

const { validProps, isNumberOrString } = require("../../util/validation");

const validateProps = validProps(["id", "event_id", "consumer_id"]);

const EVENT_JOIN_EVENT_CONSUMER_TABLE = "event_join_event_consumer";
// relational data to reach the target resource:
// event_id in TABLE event_join_event_consumer -> event_provider_id in TABLE event -> email in TABLE event_provider
const { EVENT_TABLE } = require("../event/event.model");
const {
  EVENT_PROVIDER_TABLE,
} = require("../event_provider/event_provider.model");
// event_consumer_id in TABLE event_join_event_consumer -> id in TABLE event_consumer
const {
  EVENT_CONSUMER_TABLE,
} = require("../event_consumer/event_consumer.model");

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

  getById(idOrName) {
    const data = isNumberOrString(idOrName);
    if (data.type == "number") {
      return knex
        .select({
          id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.id`,
          event_id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.event_id`,
          consumer_id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.consumer_id`,
          consumer_name: `${EVENT_CONSUMER_TABLE}.name`,
        })
        .from(EVENT_JOIN_EVENT_CONSUMER_TABLE)
        .join(EVENT_CONSUMER_TABLE, "consumer_id", `${EVENT_CONSUMER_TABLE}.id`)
        .where("event_id", data.value);
    }
  },

  // get by event consumer email - get all events joined by this consumer
  // URI: /api/events_event_consumers/:eventConsumerEmail

  // get by event provider email - get all events created by this provider
  // URI: /api/events_event_consumers/:eventProviderEmail
  async getByEmail(email) {
    const consumerCount = await knex(EVENT_CONSUMER_TABLE)
      .count(`${EVENT_CONSUMER_TABLE}.email`)
      .where(`${EVENT_CONSUMER_TABLE}.email`, email)
      .first();

    if (Number(consumerCount.count) !== 0) {
      return knex(EVENT_JOIN_EVENT_CONSUMER_TABLE)
        .select({
          id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.id`,
          consumer_id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.consumer_id`,
          event_id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.event_id`,
          consumer_email: `${EVENT_CONSUMER_TABLE}.email`,
        })
        .join(EVENT_CONSUMER_TABLE, "consumer_id", `${EVENT_CONSUMER_TABLE}.id`)
        .where(`${EVENT_CONSUMER_TABLE}.email`, email);
    }

    const providerCount = await knex(EVENT_PROVIDER_TABLE)
      .count(`${EVENT_PROVIDER_TABLE}.email`)
      .where(`${EVENT_PROVIDER_TABLE}.email`, email)
      .first();

    if (Number(providerCount.count) !== 0) {
      return knex(EVENT_JOIN_EVENT_CONSUMER_TABLE)
        .select({
          id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.id`,
          event_id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.event_id`,
          provider_id: `${EVENT_TABLE}.event_provider_id`,
          event_id: `${EVENT_JOIN_EVENT_CONSUMER_TABLE}.event_id`,
          provider_email: `${EVENT_PROVIDER_TABLE}.email`,
        })
        .join(EVENT_TABLE, "event_id", `${EVENT_TABLE}.id`)
        .join(
          EVENT_PROVIDER_TABLE,
          `${EVENT_TABLE}.event_provider_id`,
          `${EVENT_PROVIDER_TABLE}.id`
        )
        .where(`${EVENT_PROVIDER_TABLE}.email`, email);
    }
  },

  async create(eventJoinEventConsumer) {
    try {
      // pull data from DB with event_id
      const result = await knex(EVENT_JOIN_EVENT_CONSUMER_TABLE)
        .count("event_id")
        .where("event_id", eventJoinEventConsumer["event_id"])
        .where("consumer_id", eventJoinEventConsumer["consumer_id"])
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

  remove(eventJoinEventConsumer) {
    return knex
      .from(EVENT_JOIN_EVENT_CONSUMER_TABLE)
      .where({
        event_id: eventJoinEventConsumer.event_id,
        consumer_id: eventJoinEventConsumer.consumer_id,
      })
      .del()
      .catch(console.error);
  },

  removeById(id) {
    knex
      .from(EVENT_JOIN_EVENT_CONSUMER_TABLE)
      .where("id", id)
      .del()
      .catch(console.error);
  },
};
