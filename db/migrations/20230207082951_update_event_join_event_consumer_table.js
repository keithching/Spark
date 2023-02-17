/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return await knex.schema.alterTable("event_join_event_consumer", (table) => {
    table
      .integer("consumer_id")
      .references("id")
      .inTable("event_consumer")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("event_join_event_consumer", (table) => {
    table
      .integer("consumer_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
};
