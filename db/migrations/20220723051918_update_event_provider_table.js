/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema
    .alterTable("event_provider", function (table) {
        // lengthening the allowable length of password to house hashed password
        // https://knexjs.org/guide/schema-builder.html#alter
        table.string('password', 255).alter(); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
    .alterTable("event_provider", function (table) {
        // rolling back
        table.string('password', 32).alter(); 
    });
};
