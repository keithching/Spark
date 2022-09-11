const knex = require("../knex");
const { validProps, requiredProps } = require("../../util/validation");
const { EVENT_PROVIDER_TABLE } = require("../event_provider/event_provider.model");
const { EVENT_CATEGORY_TABLE } = require("../event_category/event_category.model");

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
            dateEnd: "event.date_end",
            imageURL: "event.imageURL"
        })
        .join("event_provider", "event_provider_id", "event_provider.id")
        .join("event_category", "event_category_id", "event_category.id")
        .limit(limit);
    },

    getAllTest(limit = 100) {
        return knex.raw(
            `SELECT event.id, event.title, event_provider.name, event_category.name
            , event.location, to_char(event.date_start, 'YYYY-MM-DD'), to_char(event.date_end, 'YYYY-MM-DD')
            FROM ${EVENT_TABLE} JOIN event_provider ON event_provider_id = event_provider.id
            JOIN event_category ON event_category_id = event_category.id
            LIMIT ${limit}`
            // `SELECT * FROM event`
        );
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
            dateEnd: "event.date_end",
            imageURL: "event.imageURL"
        })
        .join("event_provider", "event_provider_id", "event_provider.id")
        .join("event_category", "event_category_id", "event_category.id")
        .where("event.id", id);
    },

    getByEventProviderEmail(email) {
        // TODO: grab the relational data by join table and return it
        return knex(EVENT_TABLE).select({
            id: "event.id",
            title: "event.title",
            eventProvider: "event_provider.name",
            eventCategory: "event_category.name",
            location: "event.location",
            dateStart: "event.date_start",
            dateEnd: "event.date_end",
            imageURL: "event.imageURL"
        })
        .join("event_provider", "event_provider_id", "event_provider.id")
        .join("event_category", "event_category_id", "event_category.id")
        .where("event_provider.email", email);
    },

    // TODO: handle the date creation
    async create(event) {
        const eventData = {
            ...event,
            date_start: new Date(), // TO UPDATE
            date_end: new Date() // TO UPDATE
        }

        // pre-process the data here
        // eventProvider => event_provider_id
        // eventCategory => event_category_id
        if (eventData.eventProvider) {
            const eventProviderId = await knex.select("id")
            .from(EVENT_PROVIDER_TABLE)
            .where("name", eventData.eventProvider)
            .first();
            
            eventData.event_provider_id = eventProviderId.id;
            delete eventData.eventProvider;
        }

        if (eventData.eventCategory) {
            const eventCategoryId = await knex.select("id")
            .from(EVENT_CATEGORY_TABLE)
            .where("name", eventData.eventCategory)
            .first();
            
            eventData.event_category_id = eventCategoryId.id;
            delete eventData.eventCategory;
        }
        
        return knex(EVENT_TABLE).insert(validateProps(eventData))
    },

    // TODO: handle the date update
    async update(id, event) {
        const eventData = {...event};
        if (eventData.eventProvider) {
            const eventProviderId = await knex.select("id")
            .from(EVENT_PROVIDER_TABLE)
            .where("name", eventData.eventProvider)
            .first();
            
            eventData.event_provider_id = eventProviderId.id;
            delete eventData.eventProvider;
        }

        if (eventData.eventCategory) {
            const eventCategoryId = await knex.select("id")
            .from(EVENT_CATEGORY_TABLE)
            .where("name", eventData.eventCategory)
            .first();
            
            eventData.event_category_id = eventCategoryId.id;
            delete eventData.eventCategory;
        }

        return knex(EVENT_TABLE)
            .update(validateProps(eventData))
            .where("id", id);
    },

    remove(id) {
        knex.from(EVENT_TABLE)
            .where("id", id)
            .del()
            .catch(console.error);
    }
}