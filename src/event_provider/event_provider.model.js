const knex = require("../knex");

const EVENT_PROVIDER_TABLE = "event_provider";

module.exports = {
    EVENT_PROVIDER_TABLE,

    getAll(limit = 100) { // arbituary limit for now
        return knex.select({
            id: "id",
            name: "name"
        })
        .from(EVENT_PROVIDER_TABLE)
        .limit(limit);
    }
}