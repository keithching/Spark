/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('event_provider').del()
  await knex('event_provider').insert([
    { id: 1, name: '仮東京観光会社', email: 'a@example.com', password: 'abcd1234' },
    { id: 2, name: '仮京都観光会社', email: 'b@example.com', password: 'abcd1234' },
    { id: 3, name: '仮福岡観光会社', email: 'c@example.com', password: 'abcd1234' },
    { id: 4, name: '仮北海道観光会社', email: 'd@example.com', password: 'abcd1234' },
  ]);
};
