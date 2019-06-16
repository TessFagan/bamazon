CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255),
  department_name VARCHAR (255),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Chocolate', 'Food', 2.00, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Broom', 'Cleaning Supplies', 10.00, 14000);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Milk', 'Food', 2.00, 9000);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Jeans', 'Clothes', 40.00, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('The Art of War', 'Books', 20.00, 40000);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('iPad', 'Electronics', 300.00, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Settlers of Catan', 'Games', 30.00, 5000);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Womens Socks', 'Clothes', 5.00, 20000);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Cat Nip', 'Pet', 2.00, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Piano', 'Music', 800.00, 300);

SHOW TABLES;
SELECT * FROM products

SELECT * FROM products
WHERE item_id = ?;
