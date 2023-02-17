/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return await knex.schema.alterTable("event_provider", (table) => {
    table.string("profile_pic_url", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("event_provider", (table) => {
    table.dropColumn("profile_pic_url");
  });
};
