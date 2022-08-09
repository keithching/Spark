const knex = require("../knex");
const bcrypt = require('bcrypt');

const { validProps, requiredProps, isNumberOrString, getHashPassword } = require("../../util/validation");
const { create } = require("../event/event.model");

const validateProps = validProps([
    "id",
    "name",
    "email",
    "password"
]);

const USER_TABLE = "user";

module.exports = {
    USER_TABLE,

    getAll(limit = 100) {
        return knex.select({
            id: "id",
            name: "name"
        })
        .from(USER_TABLE)
        .limit(limit);
    },

    getByIdOrName(idOrName) {
        const data = isNumberOrString(idOrName);
        if (data.type == 'number') {
            return knex.select({
                id: "id",
                name: "name"
            })
            .from(USER_TABLE)
            .where("id", data.value)
            .first();
        } else {
            return knex.select({
                id: "id",
                name: "name"
            })
            .from(USER_TABLE)
            .where("name", data.value)
            .first();
        }
    },

    create(user) {
        try {
            if (user.password) {
                user.password = getHashPassword(user.password);
            }
            return knex(USER_TABLE).insert(
                validateProps(user)
            );
        } catch (err) {
            throw new Error(err);
        }
    },

    update(id, user) {
        if (user.password) {
            user.password = getHashPassword(user.password);
        }

        return knex(USER_TABLE)
            .update(validateProps(user))
            .where("id", id)
            .returning("id")
            .then(result => result[0].id)
            .catch(error => {throw new Error(error)});
    },

    remove(id) {
        knex.from(USER_TABLE)
            .where("id", id)
            .del()
            .catch(console.error);
    }
}