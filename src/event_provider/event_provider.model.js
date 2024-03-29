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

const EVENT_PROVIDER_TABLE = "event_provider";

module.exports = {
  EVENT_PROVIDER_TABLE,

  getAll(limit = 100) {
    // arbitrary limit for now
    return knex
      .select({
        id: "id",
        name: "name",
        phone: "phone",
        about: "about",
        email: "email",
        profile_pic_url: "profile_pic_url",
      })
      .from(EVENT_PROVIDER_TABLE)
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
        .from(EVENT_PROVIDER_TABLE)
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
        .from(EVENT_PROVIDER_TABLE)
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
      .from(EVENT_PROVIDER_TABLE)
      .where("email", email)
      .first();
  },

  create(eventProvider) {
    try {
      return knex(EVENT_PROVIDER_TABLE).insert(validateProps(eventProvider));
    } catch (err) {
      throw new Error(err);
    }
  },

  updateById(id, eventProvider) {
    return knex(EVENT_PROVIDER_TABLE)
      .update(validateProps(eventProvider))
      .where("id", id)
      .returning("id")
      .then((result) => result[0].id)
      .catch((error) => {
        throw new Error(error);
      });
  },

  updateByEmail(email, eventProvider) {
    return knex(EVENT_PROVIDER_TABLE)
      .update(validateProps(eventProvider))
      .where("email", email)
      .returning("id")
      .then((result) => result[0].id)
      .catch((error) => {
        throw new Error(error);
      });
  },

  remove(id) {
    knex.from(EVENT_PROVIDER_TABLE).where("id", id).del().catch(console.error);
  },
};
