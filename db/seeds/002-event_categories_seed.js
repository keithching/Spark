/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event_category').del()
  await knex('event_category').insert([
    {id: 1, name: '観光'},
    {id: 2, name: 'ものづくり体験'},
    {id: 3, name: 'バスツアー'}
  ]);
};
