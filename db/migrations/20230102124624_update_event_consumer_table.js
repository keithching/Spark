/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema
    .alterTable("event_consumer", (table) => {
        table.dropColumn("password");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .alterTable("event_consumer", (table) => {
        table.string("password", 255)
            .notNullable();
    })
};
