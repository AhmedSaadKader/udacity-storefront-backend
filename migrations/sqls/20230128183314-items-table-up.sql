CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50), 
    price integer,
    created_by VARCHAR(50),
    FOREIGN KEY (created_by) REFERENCES users(username));