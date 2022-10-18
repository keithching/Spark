const knex = require("../knex");

const { validProps, requiredProps, isNumberOrString } = require("../../util/validation");

const validateProps = validProps([
    "id",
    "event_id",
    "user_id",
]);

const EVENT_USER_TABLE = "event_user";

module.exports = {
    EVENT_USER_TABLE,

    getAll(limit = 100) {
        return knex.select({
            id: "id",
            eventId: "event_id",
            userId: "user_id",
            createdAt: "created_at"
        })
        .from(EVENT_USER_TABLE)
        .limit(limit);
    },

    create(eventUser) {
        try {
            return knex(EVENT_USER_TABLE).insert(
                validateProps(eventUser)
            );
        } catch (err) {
            throw new Error(err);
        }
    },

    remove(id) {
        knex.from(EVENT_USER_TABLE)
            .where("id", id)
            .del()
            .catch(console.error);
    }
}