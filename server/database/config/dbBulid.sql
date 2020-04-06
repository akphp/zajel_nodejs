BEGIN;

    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE places
(
    pk_i_id SERIAL PRIMARY KEY,
    s_name TEXT NOT NULL,
    d_latitude FLOAT,
    d_longitude FLOAT
);

CREATE TABLE TUser
(
    pk_i_id SERIAL PRIMARY KEY,
    s_name TEXT NOT NULL,
    s_mobile_number TEXT NOT NULL,
    s_email TEXT NOT NULL UNIQUE,
    b_status BOOLEAN NOT NULL,
    s_address TEXT NOT NULL,
    s_access_token TEXT,
    s_image TEXT DEFAULT 'user.png',
    d_latitude FLOAT,
    d_longitude FLOAT,
    i_type INTEGER NOT NULL,
    d_rate FLOAT,
    b_online BOOLEAN,
    dt_modified_date DATE,
    dt_create_at DATE DEFAULT current_date,
    dt_delete_at DATE,
    s_password TEXT NOT NULL,
    s_id_number text,
    s_attachment TEXT,
    s_driver_licence_number text,
    s_extra_1 TEXT,
    s_extra_2 TEXT
);

CREATE TABLE orders
(
    pk_i_id SERIAL PRIMARY KEY,
    fk_i_place_id INTEGER REFERENCES places(pk_i_id) on delete cascade,
    s_customer_address TEXT,
    s_customer_phone TEXT,
    dt_create_at DATE DEFAULT current_date,
    dt_delete_at DATE,
    customer_name TEXT,
    i_status INTEGER DEFAULT 0,--0 INPROGRESS 1 DONE
    dt_modified_date DATE
);

CREATE TABLE items
(
    pk_i_id SERIAL PRIMARY KEY,
    s_name TEXT NOT NULL,
    fk_i_order_id INTEGER REFERENCES orders (pk_i_id) on delete cascade,
    dt_modified_date DATE,
    dt_create_at DATE DEFAULT current_date,
    f_price FLOAT,
    dt_delete_at DATE

);

CREATE TABLE TUser_order
(
    id SERIAL PRIMARY KEY,
    tuser_id INTEGER REFERENCES TUser(pk_i_id) on delete cascade,
    order_id INTEGER REFERENCES orders(pk_i_id) on delete cascade
);

COMMIT;