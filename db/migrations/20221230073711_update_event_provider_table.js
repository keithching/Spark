/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema
    .alterTable("event_provider", function (table) {
        table.string('phone', 125);
        table.string('about', 255);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .alterTable("event_provider", (table) => {
        table.dropColumn('phone');
        table.dropColumn('about');
    })
};
