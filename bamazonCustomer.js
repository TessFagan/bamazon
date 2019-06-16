const inquirer = require("inquirer")
const output = require("pretty-columns").output
const mysql = require("mysql")

var array = [];
var displayComplete = false;
let productChoice = 0;
let numUnits = 0;
let data = [];
let inquirerFinished = false;
let data1 = [];

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
        data = res

        array = [["Product ID", "Product Name", "Department", "Price", "Quantity"]]

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

        displayComplete = true;
        runInquirer()
    })
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
                productChoice = inquirerResponse.productChoice
                numUnits = inquirerResponse.numUnits
                console.log(productChoice + " " + numUnits)

                inquirerFinished = true;
                if (inquirerFinished === true) {
                    purchase(data, productChoice, numUnits)
                }

            });
    }
    displayComplete = false;
}

function purchase(data, productChoice, numUnits) {

    console.log("purchase function going")

    // check if product id exists
    for (let i = 0; i < data.length; i++) {
        if (data[i].item_id === +productChoice) {
            console.log("true")

            console.log("query inventory")

            var query = `SELECT * FROM products WHERE item_id =${productChoice}`
            connection.query(query, function (err, res) {
                if (err) throw err;
                data1 = res
                checkInventory(numUnits, data1)
            })
        }
    }
}

function checkInventory(numUnits, data1) {

    if (+numUnits <= +data1[0].stock_quantity) {
        console.log("enough units in inventory")

        currentQuantity = +data1[0].stock_quantity
        console.log(currentQuantity)
        fulfill(currentQuantity, productChoice, numUnits, data1)
    }

    else {
        console.log("not enough units to fill your order")
    }

}
// match product id to product
// check if units are available
// if yes, execute
// if no, say out of stock

function fulfill(currentQuantity, productChoice, numUnits, data1) {

    console.log("Updating quantities..");


    var newQuantity = currentQuantity - numUnits
    var cost = numUnits * data1[0].price

    var query = `UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id =${productChoice}`
    connection.query(query)

    console.log(`Purchase completed! your total cost was: ${cost}`)
    connection.end();
}
