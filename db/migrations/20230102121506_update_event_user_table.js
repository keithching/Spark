/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema
    .renameTable("event_user", "event_join_event_consumer")
    .alterTable('event_join_event_consumer', (table) => {
      table.renameColumn("user_id", "event_consumer_id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .renameTable("event_join_event_consumer", "event_user")
    .alterTable('event_join_event_consumer', (table) => {
      table.renameColumn("event_consumer_id", "user_id");
    })
};
