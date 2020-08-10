import Knex from 'knex';

// criar tabela
export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        // criar relacionamento o usuario
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); // se o professor for deletado todas as diciplinas que eram dele serão deletadas
    })
}
// desfaz as alterções
export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}