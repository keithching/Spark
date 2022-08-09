/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: 1, name: 'user1', email: 'user1@example.com', password: 'user1password'},
    {id: 2, name: 'user2', email: 'user2@example.com', password: 'user2password'},
    {id: 3, name: 'user3', email: 'user3@example.com', password: 'user3password'},
  ]);
};
