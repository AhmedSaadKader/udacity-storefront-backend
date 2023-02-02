CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed'))
);