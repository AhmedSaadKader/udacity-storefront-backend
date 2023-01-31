# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## Tutorial

- Install all dependencies:

  - in terminal type: `npm i`

- Create local .env file to have all role privileges in project:

  - .env:

  ```
  PORT=5000
  POSTGRES_HOST='localhost'
  POSTGRES_DB='item_store'
  POSTGRES_TEST='item_store_test'
  POSTGRES_USER=<<INSERT YOUR USER>>
  POSTGRES_PASSWORD=<<INSERT YOUR PASSWORD>>
  ENV='dev'
  BCRYPT_PASSWORD=speak-friend-and-enter
  SALT_ROUNDS=10
  TOKEN_SECRET=alohomora123!
  ```

- Setup and connect the database:

  - create database:
    - in terminal type `npm run createdb`
  - run migrations:
    - in terminal type `npm run migrate`
  -

- Start the project in port: 5000

  - in terminal type: `npm run watch`

-

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```

```
