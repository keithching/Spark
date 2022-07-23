/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event').del()
  await knex('event').insert([
    {
      id: 1, 
      title: '東京の観光名所巡り', 
      event_provider_id: 1, 
      event_category_id: 1, 
      location: 'Tokyo', 
      date_start: new Date(2022, 0, 1), 
      date_end: new Date(2022, 0, 2)
    },
    {
      id: 2, 
      title: '京都日帰りツアー', 
      event_provider_id: 2, 
      event_category_id: 3, 
      location: 'Kyoto', 
      date_start: new Date(2022, 6, 20), 
      date_end: new Date(2022, 6, 20)
    },
  ]);
};
