CREATE DATABASE database_link;

USE database_link;

-- TABLA DE USUSARIOS
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(18) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;

-- links table
CREATE TABLE links(
    id_links INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_ad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
    ADD PRIMARY KEY (id_links);

ALTER TABLE links
    MODIFY id_links INT(11) NOT NULL AUTO_INCREMENT;