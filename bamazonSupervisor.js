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
      choices: [
        "Add new column",
        "View Product Sales by Department",
        "Create New Department"
      ]
    })
    .then(function(answer) {
      //switch case
      switch (answer.action) {
        case "Add new column":
          addNewColumn();
          break;
        case "View Product Sales by Department":
          viewProductByDept();
          break;
        case "Create New Department":
          createDept();
          break;
      }
    });
}

function createDept() {
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "Enter the name of department"
      },
      {
        name: "over_head_costs",
        type: "input",
        message: "Over Head Costs:",
        default: 0,
        validate: function(val) {
          if (isNaN(val) === false) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: "product_sales",
        type: "input",
        message: "Product Sales: ",
        default: 0,
        validate: function(val) {
          if (isNaN(val) === false) {
            return true;
          } else {
            return false;
          }
        }
      }
    ])
    .then(function(answer) {
      let newDeptName = answer.deptName;
      let newOverHeadCosts = answer.overHeadCosts;
      let newProductSales = answer.productSales;
      
      let deptName = depatment_name: newDeptName;
      let overHeadCosts = newOverHeadCosts,
      let product_sales

      alterTable(deptName, overHeadCosts, productSales);
    });
}

function alterTable(deptName, overHeadCosts, productSales) {
  var contentQuery = `INSERT INTO departments SET ? ${deptName}, ${overHeadCosts}, ${productSales};`;
  console.log(contentQuery);
  connection.query(contentQuery, function(err, results) {
    if (err) {
      console.log("An error has occured.");
      console.log(err);
    }
  });
}

function viewProductByDept() {}

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
