const knex = require("../knex");
const bcrypt = require("bcrypt");

const { validProps, isNumberOrString } = require("../../util/validation");

const validateProps = validProps([
  "id",
  "name",
  "email",
  "phone",
  "about",
  "profile_pic_url",
]);

const EVENT_CONSUMER_TABLE = "event_consumer";

module.exports = {
  EVENT_CONSUMER_TABLE,

  getAll(limit = 100) {
    return knex
      .select({
        id: "id",
        name: "name",
        phone: "phone",
        about: "about",
        email: "email",
        profile_pic_url: "profile_pic_url",
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
          phone: "phone",
          about: "about",
          email: "email",
          profile_pic_url: "profile_pic_url",
        })
        .from(EVENT_CONSUMER_TABLE)
        .where("id", data.value)
        .first();
    } else {
      return knex
        .select({
          id: "id",
          name: "name",
          phone: "phone",
          about: "about",
          email: "email",
          profile_pic_url: "profile_pic_url",
        })
        .from(EVENT_CONSUMER_TABLE)
        .where("name", data.value)
        .first();
    }
  },

  getByEmail(email) {
    return knex
      .select({
        id: "id",
        name: "name",
        phone: "phone",
        about: "about",
        email: "email",
        profile_pic_url: "profile_pic_url",
      })
      .from(EVENT_CONSUMER_TABLE)
      .where("email", email)
      .first();
  },

  create(eventConsumer) {
    try {
      return knex(EVENT_CONSUMER_TABLE).insert(validateProps(eventConsumer));
    } catch (err) {
      throw new Error(err);
    }
  },

  updateById(id, eventConsumer) {
    return knex(EVENT_CONSUMER_TABLE)
      .update(validateProps(eventConsumer))
      .where("id", id)
      .returning("id")
      .then((result) => result[0].id)
      .catch((error) => {
        throw new Error(error);
      });
  },

  updateByEmail(email, eventConsumer) {
    return knex(EVENT_CONSUMER_TABLE)
      .update(validateProps(eventConsumer))
      .where("email", email)
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
