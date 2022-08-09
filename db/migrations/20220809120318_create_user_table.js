/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema
    .createTable("user", (table) => {
        table.increments("id");
        table.string("name", 32)
            .unique()
            .notNullable();
        table.string("email", 32)
            .unique()
            .notNullable()
            .index();
        table.string("password", 255)
            .notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("user");
};
