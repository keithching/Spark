const knex = require("../knex");

const { validProps, requiredProps } = require("../../util/validation");

const validateProps = validProps([
    "id",
    "name",
]);

// const validateRequired = requiredProps(["name"]);

const EVENT_CATEGORY_TABLE = "event_category";

module.exports = {
    EVENT_CATEGORY_TABLE,

    getAll(limit = 100) { // arbitrary limit for now
        return knex.select({
            id: "id",
            name: "name"
        })
        .from(EVENT_CATEGORY_TABLE)
        .limit(limit);
    },

    getById(id) {
        return knex.select({
            id: "id",
            name: "name"
        })
        .from(EVENT_CATEGORY_TABLE)
        .where("id", id);
    },


    create(eventCategory) {
        return knex(EVENT_CATEGORY_TABLE).insert(
            validateProps(eventCategory)
        );
    },

    update(id, eventCategory) {
        return knex(EVENT_CATEGORY_TABLE)
            .update(validateProps(eventCategory))
            .where("id", id)
            .returning("id")
        .then(result => result[0].id)
        .catch(error => {throw new Error(error)});
    },

    remove(id) {
        knex.from(EVENT_CATEGORY_TABLE)
            .where("id", id)
            .del()
            .catch(console.error);
    }
}