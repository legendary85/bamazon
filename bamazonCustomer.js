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
  runSearch();
});
function runSearch() {
  console.log("Connected as id: " + connection.threadId);
  // inquirer;
  // .prompt({
  //   name: "action",
  //   type: "rawlist",
  //   message: "What would you like to do?",
  //   choices: [
  //     "Find songs by artist",
  //     "Find all artists who appear more than once",
  //     "Find data with a specific range",
  //     "Find for a specific song",
  //     "Find artists with a top song and top album in the same year"
  //   ]
  // })
  // .then(function(answer) {
  //   //switch case
  //   switch (answer.action) {
  //     case "Find songs by artist":
  //       artistSearch();
  //       break;

  //     case "Find all artists who appear more than once":
  //       multiSearch();
  //       break;

  //     case "Find data with a specific range":
  //       rangeSearch();
  //       break;

  //     case "Find for a specific song":
  //       songSearch();
  //       break;

  //     case "Find artists with a top song and top album in the same year":
  //       songAndAlbumSearch();
  //       break;
  //   }
  // });
  //run in terminal to make sure there's a connection (node GreatBay.js)
}
