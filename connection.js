import pg from 'pg';

const {Client} = pg;

export const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "jeet8484",
    database: "postgres"
})

export const designer = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "jeet8484",
    database: "designer"
})  