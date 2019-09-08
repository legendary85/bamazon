const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

var table = new Table({
  head: ["Item ID", "Item Name", "Department", "Price", "Quantity"],
  colWidths: [15, 50, 20, 15, 15]
});

var department = [];

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
});
promptInventoryOptions();

function promptInventoryOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Please make a selection",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        new inquirer.Separator(),
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
  var contentQuery = "SELECT * FROM products";
  connection.query(contentQuery, function(err, results) {
    if (err) {
      console.log("An error has occured.");
      console.log(err);
    }
    // var forSaleArray = [];
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].department_name,
        results[i].price,
        results[i].stock_quantity
      ]);
      // forSaleArray.push(results[i]);
      // console.log(forSaleArray);
      // console.log(
      //   "|| ID: " +
      //     results[i].item_id +
      //     " || Name: " +
      //     results[i].product_name +
      //     " || Price: " +
      //     "$" +
      //     results[i].price +
      //     " ||" +
      //     " Quantity: " +
      //     results[i].stock_quantity +
      //     "\n"
      // );
    }
    console.log(table.toString());
    connection.close;
    repeat();
  });
}
function lowInventory() {
  var contentQuery = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(contentQuery, function(err, results) {
    if (err) {
      console.log("An error has occured.");
      console.log(err);
    }
    // var forSaleArray = [];
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].department_name,
        results[i].price,
        results[i].stock_quantity
      ]);
      // forSaleArray.push(results[i]);
      // // console.log(forSaleArray);
      // console.log(
      //   "|| ID: " +
      //     results[i].item_id +
      //     " || Name: " +
      //     results[i].product_name +
      //     " || Price: " +
      //     "$" +
      //     results[i].price +
      //     " ||" +
      //     " Quantity: " +
      //     results[i].stock_quantity +
      //     "\n"
      // );
    }
    console.log(table.toString());
    connection.close;
    repeat();
  });
}

function addProduct() {
  connection.query("SELECT department_name FROM departments", function(
    err,
    results
  ) {
    if (err) {
      console.log("You have an error.");
      console.log(err);
      // display products and price to users with  low inventory

      //wanted to loop thorough the dapartment_name and display in choices
      // for (var i = 0; i < results.length; i++) {
      //   department.push(results[i].department_name);
      // }
    }
    connection.close;
  });
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the item you'd wish to add?"
      },
      {
        name: "department",
        type: "list",
        choices: [
          "Electronics",
          "Clothing",
          "Baby",
          "Home",
          "Garden",
          "Sports",
          "Books",
          "Entertainment"
        ],
        message: "Which deparment should we store this item?"
      },

      {
        name: "price",
        type: "input",
        message: "What is the price for the item?",
        validate: function(value) {
          if (value == null || value == "") {
            return false;
          } else {
            return true;
          }
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "Enter the amount of products to stock in our inventory.",
        validate: function(value) {
          if (value == null || value == "") {
            return false;
          } else {
            return true;
          }
        }
      },
      {
        name: "sales",
        type: "input",
        message: "Enter the amount of product sales for this item collection.",
        validate: function(value) {
          if (value == null || value == "") {
            return false;
          } else {
            return true;
          }
        }
      }
    ])
    .then(function(answers) {
      var query = connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answers.name,
          department_name: answers.department,
          price: answers.price,
          stock_quantity: answers.quantity,
          product_sales: answers.sales
        },
        function(err, results) {
          if (err) console.log("You have and error.");
          console.log(err);
          connection.end;
          repeat();
        }
      );
    });
}

//add inventory will allow user to add additional quantities to exising items in inventory
function addToInventory() {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "What is the id number of the item you want to restock?",
        filter: Number
      },
      {
        name: "quantity",
        type: "input",
        message: "What is the quantity you would like to add?",
        filter: Number
      }
    ])
    .then(function(answer) {
      var itemId = answer.item_id;
      var itemQuantity = answer.quantity;
      console.log(`Quantity: ${itemQuantity} ID: ${itemId}`);
      // addToInventory(itemId, itemQuantity);

      var query = "UPDATE products SET ? WHERE ?";
      connection.query(query, [
        {
          stock_quantity: itemQuantity
        },
        {
          item_id: itemId
        }
      ]);
      console.log("Inventory has been updated!");
      repeat();
    });
}

//       connection.query(query, { item_id: itemId }, function(err, results) {
//         if (err || results.length === 0) {
//           console.log("Error");
//           addToInventory();
//         } else {
//           console.log("Updating Inventory...");
//           var updateQuery =
//             "UPDATE products SET stock_quantity = " +
//             (results[0].stock_quantity + itemQuantity) +
//             " WHERE item_id = " +
//             itemId;

//           connection.query(updateQuery, function(err, results) {
//             if (err) {
//               console.log("ERROR");
//             } else {
//               console.log(
//                 "Stock count for item ID " +
//                   itemId +
//                   " has been updated to " +
//                   (results[0].stock_quantity + itemQuantity) +
//                   "."
//               );
//               console.log("\n---------------------------------------------\n");
//             }
//           });
//         }
//         // connection.close;
//         promptInventoryOptions();
//       });
//     });
// }

function repeat() {
  inquirer
    .prompt({
      // Ask user if he wants to purchase another item
      name: "manage",
      type: "list",
      choices: ["Yes", "No"],
      message: "Would you like to continue managing the store?"
    })
    .then(function(answer) {
      if (answer.manage == "Yes") {
        promptInventoryOptions();
      } else {
        console.log(`Have a great day!`);
        connection.end();
      }
    });
}
