# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

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

- Start the project in port: 5000

  - in terminal type: `npm run watch`

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.  
  **Example**: A SHOW route: 'blogs/:id' [GET]

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.  
  **Example**: You can format this however you like but these types of information should be provided
  Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2. DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## Step-by-step

### Initialize the project

- create git repo and clone to local
- add starter files provided
- run npm i to install dependencies
- npm i dotenv
- remove bodyparser from server.ts and dependencies because deprecated and replace with express.json()
- npm i cors
- app.use(cors())
- npm i --save-dev nodemon
- script start: "nodemon src/server.ts"

### configure dependencies

- npm i --save-dev eslint prettier
- npm i --save-dev eslint-config-prettier eslint-plugin-prettier
- npm i --save-dev @types/eslint @types/prettier
- npm i --save-dev @typescript-eslint/parser

#### configure typescript

- script build: npx tsc
- tsconfig:

```javascript
  {
  "compilerOptions": {
      "target": "es2020",
      "module": "commonjs",
      "lib": ["ES2018", "DOM"], // commented
      "outDir": "./build", //commented
      "strict": true,
      "noImplicitAny": true, //commented
      "typeRoots": ["./types"] // commented
  },
  "exclude": ["node_modules", "spec"] // add this one
  }
```

#### configure eslint

- scripts "lint": "eslint src/\*_/_.ts",
- .eslintrc:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["prettier"],
  "extends": ["eslint:recommended", "prettier"],
  "rules": {
    "prettier/prettier": 2,
    "no-use-before-define": ["error", { "functions": true, "classes": true }],
    "no-var": "error",
    "prefer-const": "error"
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true
  }
}
```

#### configure prettier

- scripts prettier: "prettier --config .prettierrc --write src/\*_/_.ts"
- .prettierrc:
  ```json
  {
    "semi": true,
    "trailingComma": "none",
    "singleQuote": true,
    "printWidth": 80
  }
  ```

#### configure jasmine

- script "jasmine": "jasmine"
- "test": "npm run build && npm run jasmine"

- spec\support\jasmine.json:

```json
{
  "spec_dir": "dist/tests",
  "spec_files": ["**/*[sS]pec.js"],
  "helpers": ["helpers/**/*.js"],
  "stopSpecOnExpectationFailure": false,
  "random": false
}
```

- create src/tests/serverSpec.ts
- test/helpers/reporter.ts

  ```javascript
  import {DisplayProcessor, SpecReporter, StacktraceOption} from "jasmine-spec-reporter";
  import SuiteInfo = jasmine.SuiteInfo;

  class CustomProcessor extends DisplayProcessor {
      public displayJasmineStarted(info: SuiteInfo, log: string): string {
          return `${log}`;
      }
  }

  jasmine.getEnv().clearReporters();
  jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
          displayStacktrace: StacktraceOption.NONE
      },
      customProcessors: [CustomProcessor],
  }));
  ```

##### Create First test for endpoint

- npm i supertest @types/supertest --save-dev
- src/tests/serverSpec.ts:
  ```typescript
  import request from 'supertest';
  import app from '../index';
  describe("GET API '/'", () => {
    it('should return Hello, world!', async () => {
      const res = await request(app).get('/').send('Hello, world!');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('Hello, world!');
    });
  });
  ```

### Project Structure

- create directories: routes, controllers, models, middleware

### Connect to database

- create .env database variables
- create database.ts in src folder
- use pool to create object
- create database.json file:

```json
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "item_store",
    "user": "postgres",
    "password": "a7aa7a"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "",
    "user": "",
    "password": ""
  }
}
```

- add item.ts to models folder
- add item class to item.ts and add CRUD functions to it

#### db-migrate

- install db-migrate global and local db-migrate and db-migrate-pg
- in terminal: `db-migrate create items --sql-file`
- script `"migrate": "db-migrate --env test up && db-migrate up",`
- in the migrations/sql/up-file add the create items table sql query

#### testing database model

- script: `"test": "set ENV=test&& db-migrate db:drop item_store_test && db-migrate db:create item_store_test && db-migrate --env test up && npm run build && npm run jasmine && db-migrate db:drop item_store_test",`
- update itemSpec.ts to test the presence and functionality of all CRUD methods

### Create REST APIs for items model

- in the routes folder create itemRoutes.ts file
- in the controller folder create itemController.ts file
- add all REST routes to the itemRoutes.ts file
- add REST functions to the itemControllers.ts file
- import itemRouter in server.ts and use with proper route
- add model methods to corresponding controller functions and test with postman

#### postman testing

- create collection for project
- create url global variable for base url
- create folders for items and user endpoints
- create token global variable for authentication
- in createUser and login endpoint add this to Tests to set token global variable on request sent:

```javascript
const jsonData = pm.response.json();
pm.globals.set('token', jsonData.token);
```

- in items endpoints change authorization to Bearer token

#### testing items endpoints

- in serverSpec.ts add testing for REST endpoint response

### Users and Authorization

#### User model

- db-migrate create users-table --sql-file
- in migrations sql user-table up file:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password_digest VARCHAR
);
```

- create user.ts file in models folder
- create user type and class and export
- create CRUD methods in user class

#### User routes

- create all REST routes in userRoutes.ts file
- add all userController functions to corresponding routes

#### User controller

- create all REST functions and use corresponding model methods to userController.ts file

##### Testing user model

- in tests/userSpec.ts test presence and functionality of users CRUD methods.

#### hashing password using bcrypt

- npm i bcrypt
- import bcrypt into user model
- create bcrypt necessary environment variables
- use the hash method inside the create method and save the result to password_digest column on user table

#### JWT

- npm i jwt
- npm i @types/jwt --save-dev
- add jwt.sign to create method in user controller and return token
- create auth.ts file in middleware folder to handle authorization

#### user endpoint testing

- in serverSpec.ts add testing for login and register and allusers endpoint response

#### add auth as middleware in items routes and in user routes

- in itemroutes.ts add auth middleware before necessary routes.
- in serverSpec in items spec => beforeAll get the token and add to proper routes to test authorization.

### create orders table and order-product table

- db-migrate create orders-table --sql-file
- db-migrate create order-product --sql-file
- orders-table-up:

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_username VARCHAR(50) REFERENCES users(username)
);
```

- order-product-up:

```sql
CREATE TABLE order-product (
  id SERIAL PRIMARY KEY,
  quantity integer,
  order_id bigint REFERENCES orders(id),
  product_id bigint REFERENCES products(id)
);
```

### orders model, routes, controllers and order-product post function

- type Order
- class order with all CRUD functions
- in order model add order-product create function
- orderRoute create all REST APIs endpoints
- orderController all routes functions
- add order-product create function to orderController.ts and post route to orderRoute.ts
- add testing for order methods and endpoints and add item to order-product

### Create a dashboard endpoint

- inner join

```sql
  SELECT * FROM products INNER JOIN order_products ON product.id = order_products.id;
```

- create services folder
- dashboard.ts
- add methods from database in the form of specialized select queries or joins.
- ONLY READ METHODS!!
- create router and controller for dashboard queries
- test
