CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    quantity integer,
    item_id integer REFERENCES items(id),
    order_id integer REFERENCES orders(id)
);
