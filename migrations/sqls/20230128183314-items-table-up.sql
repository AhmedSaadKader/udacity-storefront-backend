CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL, 
    price integer NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(username));