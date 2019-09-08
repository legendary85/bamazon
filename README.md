# bamazon

SMU Trilogy Coding Bootcamp Summer 2019 Week 12: NodeJS | MySQL | Inquirer & CLI-Table NPM

# Description

Created CLI application that is an Amazon-like storefront with the MySQL. The app will take orders and deplete stock from the store's inventory

## ##Packages installed

- inquirer
- mysql
- cli-table
-

## Tools

MySQL Workbench to create the bamazon database.

## Bamazon Customer Feature

Once database is created and files are installed locally, users can run app by typing 'node bamazonCustomer.js' in terminal. The app will first show all products in the database and corresponding details such as item_id, product_name, department_name, price, and stock_quantity. Users are then asked to input an item_id of a widget they want to purchase and the amount of widgets.

The app will either give the user an error message via console log stating the number of widgets wanted is too high if number is above what is in stock_quantity or a console message stating the order has been fulfilled along with the total price.

## Bamazon Manager Feature

Users can run app by typing 'node bamazonManager.js' in terminal. The app will first show a list of commands the manager can run by arrowing up or down to select option.

User selects "View Products for Sale" and the user will be able to view all items in the database along with the items information such as price and quantity.

User selects "View Low Inventory" and the user will be able to see any item that has less than 5 items in stock.

User selects "Add to Inventory" and the user will be able to add to the current stock quantity of a specific item.

User selects "Add New Product" and the user will be able to make a new item to the database.

User can also select "End Program" and any time in any view to exit out of the application.

Application also has working validation.

### Developer

Kourtney McCullough
