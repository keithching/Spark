const knex = require("../knex");

const { validProps, requiredProps, isNumberOrString } = require("../../util/validation");

const validateProps = validProps([
    "id",
    "event_id",
    "event_consumer_id",
]);

const EVENT_JOIN_EVENT_CONSUMER_TABLE = "event_join_event_consumer";

module.exports = {
    EVENT_JOIN_EVENT_CONSUMER_TABLE,

    getAll(limit = 100) {
        return knex.select({
            id: "id",
            eventId: "event_id",
            userId: "event_consumer_id",
            createdAt: "created_at"
        })
        .from(EVENT_JOIN_EVENT_CONSUMER_TABLE)
        .limit(limit);
    },

    create(eventUser) {
        try {
            return knex(EVENT_JOIN_EVENT_CONSUMER_TABLE).insert(
                validateProps(eventUser)
            );
        } catch (err) {
            throw new Error(err);
        }
    },

    remove(id) {
        knex.from(EVENT_JOIN_EVENT_CONSUMER_TABLE)
            .where("id", id)
            .del()
            .catch(console.error);
    }
}