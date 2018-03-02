"use strict"

const { connect, clearTable, insertRow } = require('./database'),
    prompt = require('prompt'),
    colors = require('colors'),
    moment = require('moment'),
    fakerator = require('fakerator')();

prompt.start();

if (process.argv[2] != undefined && process.argv[2] != "c" && process.argv[2] != "clear") {
    console.error(`Unknown param "${process.argv[2]}"`.bgRed.white.bold);
    process.exit();
}

const clear = process.argv[2] === "c" || process.argv[2] === "clear";

const promptSchema = {
    properties: {
        amount: {
            description: "How many users should be generated?",
            pattern: /^\d*[1-9]\d*$/,
            message: "Only positive integers allowed",
            required: true,
        },
        continue: {
            description: clear ? "Do you want to continue to delete all rows in the database and repopulate the tables? (Y/N)" : "Do you want to continue to add rows to the tables? (Y/N)",
            pattern: /^[yn]+$/i,
            message: "Only Y (yes) or N (no) is allowed",
            required: true,
        },
    }
};

prompt.get(promptSchema, (err, result) => {
    if (result === undefined) {
        console.warn("\nDatabase population aborted".red);
        return;
    }

    console.time("execution time".bgBlue.white.bold);
    
    switch (result["continue"].toLowerCase()) {
        case "y":
            let client;
            
            connect()
                .then((c) => client = c)
                .then(() => clearTable(clear ? "user" : ""))
                .then(() => clearTable(clear ? "address" : ""))
                .then(() => {
                    for(let c = 0, amount = result['amount']; c < amount; c++) {
                        insertRow("address", [
                            "default", fakerator.address.street(), fakerator.address.buildingNumber(), fakerator.address.postCode(), fakerator.address.buildingNumber(), fakerator.address.city(), fakerator.address.country(),
                        ]).then((res) => {
                            insertRow("user", [
                                "default", fakerator.internet.userName(), fakerator.names.firstName(), fakerator.names.lastName(), moment().format(), res.rows[0].id, fakerator.lorem.paragraph(),
                            ])
                            .then(() => {
                                if (c === (amount - 1)) {
                                    console.log("\n");
                                    console.timeEnd("execution time".bgBlue.white.bold);
                                    process.exit();
                                }
                            });
                        });
                    }
                });
            break;
        default:
            console.warn("Database population aborted".red);
    }
});