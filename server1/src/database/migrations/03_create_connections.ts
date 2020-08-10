import Knex from 'knex';

// criar tabela
export async function up(knex: Knex){
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();
        // criar relacionamento o usuario
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    })
}
// desfaz as alterções
export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}