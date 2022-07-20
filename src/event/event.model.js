const knex = require("../knex");

const EVENT_TABLE = "event";

module.exports = {
    EVENT_TABLE,

    getAll(limit = 100) { // arbitrary limit for now
        return knex.select({
            id: "id",
            title: "title",
            eventProviderId: "event_provider_id",
            eventCategoryId: "event_category_id",
            location: "location",
            dateStart: "date_start",
            dateEnd: "date_end"
        })
        .from(EVENT_TABLE)
        .limit(limit);
    },

    getById(id) {
        return knex.select({
            id: "id",
            title: "title",
            eventProviderId: "event_provider_id",
            eventCategoryId: "event_category_id",
            location: "location",
            dateStart: "date_start",
            dateEnd: "date_end"
        })
        .from(EVENT_TABLE)
        .where("id", id);
    },

    create(event) {
        return knex(EVENT_TABLE).insert(event);
    },

    update(id, event) {
        return knex(EVENT_TABLE)
            .update(event)
            .where("id", id);
    },

    remove(id) {
        knex.from(EVENT_TABLE)
            .where("id", id)
            .del()
            .catch(console.error);
    }
}