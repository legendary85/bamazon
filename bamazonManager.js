const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(
    "Connected as id: " +
      connection.threadId +
      "\n" +
      "\n" +
      "Manager access granted!" +
      "\n"
  );
  promptInventoryOptions();
});

function promptInventoryOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Please make a selection",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      //switch case
      switch (answer.action) {
        case "View Products for Sale":
          forSale();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addToInventory();
          break;

        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function forSale() {
  var contentQuery = "SELECT * FROM products;";
  connection.query(contentQuery, function(err, results) {
    if (err) {
      console.log("An error has occured.");
      console.log(err);
    }
    var forSaleArray = [];
    for (var i = 0; i < results.length; i++) {
      forSaleArray.push(results[i]);
      // console.log(forSaleArray);
      console.log(
        "|| ID: " +
          results[i].item_id +
          " || Name: " +
          results[i].product_name +
          " || Price: " +
          "$" +
          results[i].price +
          " ||" +
          " Quantity: " +
          results[i].stock_quantity +
          "\n"
      );
    }
    promptInventoryOptions();
  });
}
