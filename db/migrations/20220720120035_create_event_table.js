/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema
    .createTable("event", function (table) {
        table.increments("id");
        table.string("title", 32)
            .unique()
            .notNullable();
        table.integer("event_provider_id").references("id").inTable("event_provider").onDelete("CASCADE");
        table.integer("event_category_id").references("id").inTable("event_category").onDelete("CASCADE");
        table.string("location", 32).notNullable();
        table.date("date_start").notNullable();
        table.date("date_end").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("event");
};
