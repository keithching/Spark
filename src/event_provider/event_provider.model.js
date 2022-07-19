const knex = require("../knex");

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
        .where("id", id);
    },

    create(eventProvider) {
        return knex(EVENT_PROVIDER_TABLE).insert(eventProvider);
    }
}