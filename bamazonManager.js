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

function addProduct() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "Add ID Number"
      },
      {
        name: "name",
        type: "input",
        message: "What is the name of the item you'd wish to add?"
      },
      {
        name: "Category",
        type: "input",
        message: "What is the category of the item?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price for the item?"
      },
      {
        name: "quantity",
        type: "input",
        message: "What is the quantity would like to add?"
      }
    ])
    .then(function(answers) {
      var id = answers.ID;
      var name = answers.name;
      var category = answers.Category;
      var price = answers.price;
      var quantity = answers.quantity;
      newItem(id, name, category, price, quantity);
    });
}
function newItem(id, name, category, price, quantity) {
  connection.query(
    'INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES("' +
      id +
      '","' +
      name +
      '","' +
      category +
      '",' +
      price +
      "," +
      quantity +
      ")"
  );
  promptInventoryOptions();
}

function addToInventory(){
  inquirer.prompt(id, quantity){
    connection.query('SELECT * FROM products WHERE item_id = '+id, function(err,results){
      if(err) throw err;
      connection.query('UPDATE products SET stock_quantity = stock_quantity + ' +stock_quantity+ 'WHERE item_id =' +item_id);
      promptInventoryOptions();
    });
  };
}