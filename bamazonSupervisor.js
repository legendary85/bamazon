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
  promptOptions();
});

function promptOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Please make a selection",
      choices: ["Add new column"]
    })
    .then(function(answer) {
      //switch case
      switch (answer.action) {
        case "Add new column":
          addNewColumn();
          break;
      }
    });
}

// create a new function that will take the product * the quantity purchased and add it to the product_sales
//Function to add colum to table
function addNewColumn() {
  inquirer
    .prompt([
      {
        name: "table",
        type: "input",
        message: "Enter name of table you wish to modify"
      },
      {
        name: "column",
        type: "input",
        message: "Enter a new column name"
      },
      {
        name: "datatype",
        type: "input",
        message: "Enter a datatype"
      }
    ])
    .then(function(answer) {
      let tableName = answer.table;
      let columnName = answer.column;
      let dataType = answer.datatype;

      alterTable(tableName, columnName, dataType);
    });
}

function alterTable(tableName, columnName, datatype) {
  var contentQuery = `ALTER TABLE ${tableName} ADD ${columnName} ${datatype};`;
  console.log(contentQuery);
  connection.query(contentQuery, function(err, results) {
    if (err) {
      console.log("An error has occured.");
      console.log(err);
    }
  });
}
