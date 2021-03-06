//requiring mysql and inquirer
var mysql = require("mysql");
var env = require("dotenv").config();
var inquirer = require("inquirer");


// GOT ORANGES INTO THE DB,
//  GOT THE SWITCH CASES UP




var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DB_PASSWORD,
    database: "amazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    createFruit();
    // run the start function after the connection is made to prompt the user

});


function createFruit() {
    console.log("Inserting a new store...\n");


    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What fruit would you like?",
            choices: [
                "apples",
                "bananas",
                "grapes",
                "oranges",
                "exit"


            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "apples":
                    apples();
                    break;

                case "bananas":
                    bananas();
                    break;
                case "grapes":
                    grapes();
                    break;
                case "oranges":
                    oranges();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });




    // var query = connection.query(
    //     "INSERT INTO store SET ?",
    //     {
    //         fruit: "oranges",
    //         price: 3.0,
    //         quantity: 2
    //     },
    //     function (err, res) {
    //         if (err) throw err;
    //         console.log(res.affectedRows + " store inserted!\n");
    //         // Call updateProduct AFTER the INSERT completes
    //     }

    // );

    updateFruit();

    // logs the actual query being run
    //console.log(query.sql);
}

function updateFruit() {
    console.log("Updating all oranges quantities...\n");






    var query = connection.query(
        "UPDATE store SET ? WHERE ?",
        [
            {
                quantity: 20
            },
            {
                fruit: "oranges"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " fruits updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            deleteFruit();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function deleteFruit() {
    console.log("Deleting all apples...\n");
    connection.query(
        "DELETE FROM store WHERE ?",
        {
            fruit: "apples"
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " apples deleted!\n");
            // Call readProducts AFTER the DELETE completes
            readStore();
        }
    );
}

function readStore() {
    console.log("Selecting all store...\n");
    connection.query("SELECT * FROM store", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}
