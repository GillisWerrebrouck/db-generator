"use strict"

const { Client } = require('pg'),
    colors = require('colors'),
    log = require('single-line-log').stdout;

// the client data to connect to the pg db
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'thesis',
    password: '',
    port: 5432,
});

// create a connection
function connect() {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            if (err) {
                console.error("Could not connect to postgres".red, err.red);
                reject(err);
            } else {
                console.info(`Connected to postgres database "${client.database}" with user "${client.user}"\n`.green.bold);
                resolve(client);
            }
        });
    });
}

// delete all rows in a table
function clearTable(table) {
    return new Promise((resolve, reject) => {
        if (table === "")
            return resolve({});
        else
            log(`DELETE`.bgYellow.white.bold + ` deleting data from table "${table}" ...`.yellow);
        
        client.query(`DELETE FROM public.${table}`, (err, res) => {
            if (err) {
                console.error(err.red);
                resolve(err);
            } else {
                log(`DELETE`.bgGreen.white.bold + ` all data deleted from table "${table}"`.green);
                console.log("\n");
                resolve(res);
            }
        });
    });
};

// insert a row in a table
function insertRow(table, values, cb) {
    return new Promise((resolve, reject) => {
        if (values.length < 0) {
            reject("no values to insert")
        }

        let query = `INSERT INTO public."${table}" VALUES(`;
        values.forEach((val, i) => {
            if (val === "default")
                query += `default${values.length === (i + 1) ? '' : ','}`;
            else
                query += `'${val.replace("'","''")}'${values.length === (i + 1) ? '' : ','}`; // escape '-char by doubling it
        });
        query += ") RETURNING *;";

        client.query(query, (err, res) => {
            if (err) {
                console.error(err.red);
                reject(query);
            } else {
                log(`INSERT:`.bgGreen.white.bold + ` one row added to "${table}" with id `.green + `"${res.rows[0].id}"`.inverse.bold);
                resolve(res);
            }
        });
    });
};

// export all database functions
module.exports = {
    connect,
    clearTable,
    insertRow,
};