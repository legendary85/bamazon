const mysql = require("mysql");
const inquirer = require("inquirer");

//1st I create a connection object to connect to mysql
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
      "Welcome to Bamazon!" +
      "\n"
  );
  // console.log("Welcome to Bamazon!" + "\n");

  displayContent();
});

function searchById() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the id of the item you wish to purchase? ",
        /* filter: (Function) Receive the user input and return the filtered value to be used inside the program. The value returned will be added to the Answers hash. */
        filter: Number
      },
      {
        name: "units",
        type: "input",
        message: "How many units would you like to buy?",
        /* filter: (Function) Receive the user input and return the filtered value to be used inside the program. The value returned will be added to the Answers hash. */
        filter: Number
      }
    ])
    .then(function(answer) {
      //Declared answer.id and and answer.units as variables to pass into
      //newPurchase() function.
      var productId = answer.id;
      var productQuantity = answer.units;
      //
      newPurchase(productId, productQuantity);
    });
}

//Declared a newPurchase function to pass paramaters into
function newPurchase(id, amountOfProduct) {
  connection.query("SELECT * FROM products WHERE item_id = " + id, function(
    err,
    results
  ) {
    if (err) {
      console.log("Error has occured");
    }
    if (amountOfProduct <= results[0].stock_quantity) {
      var totalCost = results[0].price * amountOfProduct;
      console.log(results[0]);
      console.log("Order is in stock!");
      console.log(
        "Your total cost for " +
          amountOfProduct +
          " " +
          results[0].product_name +
          " is " +
          totalCost +
          " . " +
          "\n"
      );

      connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - " +
          amountOfProduct +
          " WHERE item_id = " +
          id
      );
    } else {
      console.log(
        "Insufficient quantity, sorry we do not have enough " +
          results[0].product_name +
          "to complete your order."
      );
    }
    displayContent();
  });
}

//function will display all content in bamazon database
function displayContent() {
  var contentQuery = "SELECT * FROM products;";
  connection.query(contentQuery, function(err, results) {
    if (err) {
      console.log("A error has occured.");
      console.log(err);
    }
    var contentArray = [];
    for (var i = 0; i < results.length; i++) {
      contentArray.push(results[i]);
      // console.log(contentArray);
      console.log(
        "|| ID: " +
          results[i].item_id +
          " || Name: " +
          results[i].product_name +
          " || Price: " +
          "$" +
          results[i].price +
          " ||" +
          "\n"
      );
    }
    searchById();
  });
}

/* runSearch function with switch statements for later use */
// function runSearch() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "rawlist",
//       message: "Please make a selection",
//       choices: [
//         "Find item by ID"
//         "Find all artists who appear more than once",
//         "Find data with a specific range",
//         "Find for a specific song",
//         "Find artists with a top song and top album in the same year"
//       ]
//     })
//     .then(function(answer) {
//       //switch case
//       switch (answer.action) {
//         case "Find item by ID":
//           searchById();
//           break;

//         case "Find all artists who appear more than once":
//           multiSearch();
//           break;

//         case "Find data with a specific range":
//           rangeSearch();
//           break;

//         case "Find for a specific song":
//           songSearch();
//           break;

//         case "Find artists with a top song and top album in the same year":
//           songAndAlbumSearch();
//           break;
//       }
//     });
// }
