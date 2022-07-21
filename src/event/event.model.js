const knex = require("../knex");

const { validProps, requiredProps } = require("../../util/validation");

const validateProps = validProps([
    "id",
    "title",
    "event_provider_id",
    "event_category_id",
    "location",
    "date_start",
    "date_end"
]);

// const validateRequired = requiredProps(["name"]);

const EVENT_TABLE = "event";

module.exports = {
    EVENT_TABLE,

    getAll(limit = 100) { // arbitrary limit for now
        // grab the relational data by join table and return it
        return knex(EVENT_TABLE).select({
            id: "event.id",
            title: "event.title",
            eventProvider: "event_provider.name",
            eventCategory: "event_category.name",
            location: "event.location",
            dateStart: "event.date_start",
            dateEnd: "event.date_end"
        })
        .join("event_provider", "event_provider_id", "event_provider.id")
        .join("event_category", "event_category_id", "event_category.id")
        .limit(limit);
    },

    getById(id) {
        // TODO: grab the relational data by join table and return it
        return knex(EVENT_TABLE).select({
            id: "event.id",
            title: "event.title",
            eventProvider: "event_provider.name",
            eventCategory: "event_category.name",
            location: "event.location",
            dateStart: "event.date_start",
            dateEnd: "event.date_end"
        })
        .join("event_provider", "event_provider_id", "event_provider.id")
        .join("event_category", "event_category_id", "event_category.id")
        .where("event.id", id);
    },

    // TODO: handle the date creation
    create(event) {
        const eventData = {
            ...event,
            date_start: new Date(), // TO UPDATE
            date_end: new Date() // TO UPDATE
        }

        return knex(EVENT_TABLE).insert(
            validateProps(eventData)
        );
    },

    // TODO: handle the date update
    update(id, event) {
        return knex(EVENT_TABLE)
            .update(validateProps(event))
            .where("id", id);
    },

    remove(id) {
        knex.from(EVENT_TABLE)
            .where("id", id)
            .del()
            .catch(console.error);
    }
}