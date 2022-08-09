/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return await knex.schema
        .createTable("event_user", (table) => {
            table.increments().index();
            table
                .integer("event_id")
                .references("id")
                .inTable("event")
                .onDelete("CASCADE");
            table
                .integer("user_id")
                .references("id")
                .inTable("user")
                .onDelete("CASCADE");
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable("event_user");
};
