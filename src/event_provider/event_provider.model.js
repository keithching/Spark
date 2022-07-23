const knex = require("../knex");

const { validProps, requiredProps } = require("../../util/validation");

const validateProps = validProps([
    "id",
    "name",
    "email",
    "password"
]);

// const validateRequired = requiredProps(["name"]);

const EVENT_PROVIDER_TABLE = "event_provider";

module.exports = {
    EVENT_PROVIDER_TABLE,

    getAll(limit = 100) { // arbitrary limit for now
        return knex.select({
            id: "id",
            name: "name"
        })
        .from(EVENT_PROVIDER_TABLE)
        .limit(limit);
    },

    getById(id) {
        return knex.select({
            id: "id",
            name: "name"
        })
        .from(EVENT_PROVIDER_TABLE)
        .where("id", id)
        .first();
    },

    create(eventProvider) {
        try {
            return knex(EVENT_PROVIDER_TABLE).insert(
                validateProps(eventProvider)
            );
        } catch(err) {
            throw new Error(err);
        }
    },

    update(id, eventProvider) {
        return knex(EVENT_PROVIDER_TABLE)
            .update(validateProps(eventProvider))
            .where("id", id)
            .returning("id")
            .then(result => result[0].id)
            .catch(error => {throw new Error(error)});
    },

    remove(id) {
        knex.from(EVENT_PROVIDER_TABLE)
            .where("id", id)
            .del()
            .catch(console.error);
    }
}