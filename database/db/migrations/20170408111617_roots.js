
exports.up = function(knex, Promise) { //CHAIN PROMISES
  // create table schemas here
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  }).then(() => {
    return knex.schema.createTable('boards', (table) => {
      table.increments();
      table.string('boardname').notNullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  }).then(() => {
    return knex.schema.createTable('users_boards', (table) => {
      table.increments();
      table.integer('user_id');
      table.integer('board_id');
      table.string('access');
      table.boolean('starred');
    });
  }).then(() => {
    return knex.schema.createTable('lists', (list) => {
      table.increments();
      table.integer('board_id').notNullable();
      table.string('listname').notNullable();
    })
  }).then(() => {
    return knex.schema.createTable('tasks', (task) => {
      table.increments();
      table.integer('list_id').notNullable(); 
      table.string('text').notNullable();
      table.integer('assigned')
    })
  })
};

exports.down = function(knex, Promise) {
	// drop table schemas here
  return knex.schema.dropTable('users')
  .then(() => {
    return knex.schema.dropTable('boards');
  }).then(() => {
    return knex.schema.dropTable('users_boards');
  }).then(() => {
    return knex.schema.dropTable('lists');
  }).then(() => {
    return knex.schema.dropTable('tasks');
  });
};
