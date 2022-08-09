/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event_user').del()
  await knex('event_user').insert([
    {id: 1, event_id: 1, user_id: 1},
    {id: 2, event_id: 2, user_id: 2},
    {id: 3, event_id: 2, user_id: 3},
  ]);
};
