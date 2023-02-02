# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

- Base URL = 'localhost:5000/api/v1'

#### Products

- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
- [OPTIONAL] Top 5 most popular products: '/dashboard/popular_products' [GET]
- [OPTIONAL] Products by category (args: product category): 'dashboard/category_Products' [GET]

#### Users

- Index [token required]: '/users' [GET]
- Show [token required]: '/users/login' [POST]
- Create [token required]: '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required]: '/orders/myorders' [GET]
- Orders with product: '/orders/order_products/:orderId' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: '/dashboard/completed_orders' [GET]

## Data Shapes

#### Product

| id          | name    | category | price   | created_by                     |
| ----------- | ------- | -------- | ------- | ------------------------------ |
| PRIMARY KEY | VARCHAR | VARCHAR  | INTEGER | FOREIGN KEY to users(username) |
|             |         |          |         |                                |
|             |         |          |         |                                |

#### User

| id                 | first_name  | last_name   | username    | password |
| ------------------ | ----------- | ----------- | ----------- | -------- |
| SERIAL PRIMARY KEY | VARCHAR(50) | VARCHAR(50) | VARCHAR(50) | VARCHAR  |
|                    |             |             |             |          |
|                    |             |             |             |          |

#### Orders

| id          | user_id                  | status                   |
| ----------- | ------------------------ | ------------------------ |
| PRIMARY KEY | FOREIGN KEY to users(id) | 'pending' OR 'completed' |
|             |                          |                          |
|             |                          |                          |

##### Order_products

| id          | quantity | product_id                  | order_id                  |
| ----------- | -------- | --------------------------- | ------------------------- |
| PRIMARY KEY | INTEGER  | FOREIGN KEY to products(id) | FOREIGN KEY to orders(id) |
|             |          |                             |                           |
|             |          |                             |                           |
