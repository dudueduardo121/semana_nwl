import Knex from 'knex';
import 'dotenv/config';

const db = Knex({
    client: 'pg',
    connection: {
      host: 'localhost',
        user: 'postgres',
        password: 'docker',
        database: 'proffy',
    },
    useNullAsDefault: true,
});

export default db;