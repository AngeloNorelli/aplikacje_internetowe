CREATE DATABASE fullstack_app;
USE fullstack_app;

CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'Super$trongP4ssword!';
GRANT ALL PRIVILEGES ON fullstack_app.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE user (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(255) NOT NULL UNIQUE,
 email VARCHAR(255) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 theme ENUM('dark', 'light') DEFAULT 'dark',
 font_size ENUM('small', 'medium', 'large') DEFAULT 'large',
 language ENUM('pl', 'en') DEFAULT 'en'
);

CREATE TABLE notes (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 userID INT NOT NULL,
 note TEXT NOT NULL,
 title VARCHAR(255) NOT NULL,
 FOREIGN KEY (userID) REFERENCES user(id) ON DELETE CASCADE
);