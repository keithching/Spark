const knex = require("../knex");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const {
  validProps,
  requiredProps,
  isNumberOrString,
  getHashPassword,
} = require("../../util/validation");

const validateProps = validProps(["id", "name", "email", "password"]);

const EVENT_CONSUMER_TABLE = "event_consumer";

module.exports = {
  EVENT_CONSUMER_TABLE,

  getAll(limit = 100) {
    return knex
      .select({
        id: "id",
        name: "name",
      })
      .from(EVENT_CONSUMER_TABLE)
      .limit(limit);
  },

  getByIdOrName(idOrName) {
    const data = isNumberOrString(idOrName);
    if (data.type == "number") {
      return knex
        .select({
          id: "id",
          name: "name",
        })
        .from(EVENT_CONSUMER_TABLE)
        .where("id", data.value)
        .first();
    } else {
      return knex
        .select({
          id: "id",
          name: "name",
        })
        .from(EVENT_CONSUMER_TABLE)
        .where("name", data.value)
        .first();
    }
  },

  create(eventConsumer) {
    try {
      return knex(EVENT_CONSUMER_TABLE).insert(validateProps(eventConsumer));
    } catch (err) {
      throw new Error(err);
    }
  },

  update(id, eventConsumer) {
    return knex(EVENT_CONSUMER_TABLE)
      .update(validateProps(eventConsumer))
      .where("id", id)
      .returning("id")
      .then((result) => result[0].id)
      .catch((error) => {
        throw new Error(error);
      });
  },

  remove(id) {
    knex.from(EVENT_CONSUMER_TABLE).where("id", id).del().catch(console.error);
  },
};
