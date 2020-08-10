import Knex from 'knex'; 

// criar tabela
export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        table.integer('dia').notNullable();
        
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
} 
// desfaz as alterções
export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');
}