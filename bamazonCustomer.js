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
  console.log("Connected as id: " + connection.threadId);
  console.log("Welcome to Bamazon!" + "\n");

  displayContent();
});

function runSearch() {
  // console.log("Connected as id: " + connection.threadId);
  // console.log("Welcome to Bamazon!" + "\n");
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Please make a selection",
      choices: [
        "Show all items",
        "Find all artists who appear more than once",
        "Find data with a specific range",
        "Find for a specific song",
        "Find artists with a top song and top album in the same year"
      ]
    })
    .then(function(answer) {
      //switch case
      switch (answer.action) {
        case "Show all items":
          // showAllItems();
          break;

        case "Find all artists who appear more than once":
          multiSearch();
          break;

        case "Find data with a specific range":
          rangeSearch();
          break;

        case "Find for a specific song":
          songSearch();
          break;

        case "Find artists with a top song and top album in the same year":
          songAndAlbumSearch();
          break;
      }
    });
  //run in terminal to make sure there's a connection (node GreatBay.js)
}

// function showAllItems() {
//   // // connection.connect();
//   var contentQuery = "SELECT * FROM products;";
//   connection.query(contentQuery, function(err, results) {
//     if (err) {
//       console.log("A error has occured.");
//       console.log(err);
//     }
//     var contentArray = [];
//     for (var i = 0; i < results.length; i++) {
//       contentArray.push(results[i]);
//       // console.log(contentArray);
//       console.log(
//         "\n" +
//           "ID: " +
//           results[i].item_id +
//           "\nName: " +
//           results[i].product_name +
//           "\nPrice: " +
//           "$" +
//           results[i].price +
//           "\n=================\n"
//       );
//     }
//     runSearch();
//   });
// }

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
    runSearch();
  });
}
