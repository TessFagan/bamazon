const inquirer = require("inquirer")
const output = require("pretty-columns").output
const mysql = require("mysql")

var productArray = []
var displayComplete = false

// MySQL DB Connection Information:
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    afterConnection()
});

function afterConnection() {
    console.log("Welcome to Bamazon")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var data = res

        let array = [["Product ID", "Product Name", "Department", "Price", "Quantity"]]

        data.forEach(element => {
            let string = [`${element.item_id}`, `${element.product_name}`, `${element.department_name}`, `${element.price}`, `${element.stock_quantity}`]
            array.push(string)
        });

        output(array, {
            columnSeparation: ' | ',
            rowSeparation: " |\n| ",
            prefix: '| ',
            suffix: ' |',
        });

        connection.end();
        displayComplete = true;
        runInquirer()
    })
}


function purchase() {

}


function runInquirer() {

    if (displayComplete === true) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the ID of the product you would like to buy?",
                    name: "productChoice"
                },
                // Here we create a basic text prompt.
                {
                    type: "input",
                    message: "How many units would you like to buy?",
                    name: "numUnits"
                }
            ])

            .then(function (inquirerResponse) {
                console.log(inquirerResponse)
                let productChoice = inquirerResponse.productChoice
                let numUnits = inquirerResponse.numUnits
                console.log(productChoice + " " + numUnits)
            });
    }
    displayComplete = false;
}
