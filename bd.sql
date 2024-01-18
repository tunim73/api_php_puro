CREATE DATABASE api_php_puro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE api_php_puro;

CREATE TABLE users (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       cpf CHAR(14) UNIQUE NOT NULL,
                       address VARCHAR(255) NULL,
                       city VARCHAR(255) NULL,
                       uf CHAR(2) NULL,
                       password VARCHAR(255) NOT NULL,
                       type TINYINT(1) DEFAULT (0),
                       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      title VARCHAR(255) NOT NULL,
                      summary TEXT NULL,
                      image TEXT NULL,
                      content TEXT NULL,
                      highlight TINYINT(1) DEFAULT 0,
                      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR(255)
);

CREATE TABLE products (
                          cod INT PRIMARY KEY AUTO_INCREMENT,
                          name VARCHAR(255),
                          status TINYINT(1) DEFAULT 1,
                          value INTEGER NOT NULL ,
                          quantity INTEGER DEFAULT 0,
                          description TEXT,
                          image TEXT,
                          userId INT,
                          categoryId INT NULL,
                          FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL,
                          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (id, name, email, cpf, address, city, uf, password, type)
VALUES (1, 'Admin','admin@email.com', '123.456.789-98', 'awr', 'Rio de Janeiro', 'RJ', '$2y$10$5t6pTMiCkYjvJCipFvqEke1Hlbih8XJxeuppFyfjMf4dph59xCm2m', 1);


