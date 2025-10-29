import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
const { Pool } = pkg;
dotenv.config({ path: path.resolve('./bdd.env') });

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error de conexión:', err));

export default db;

// DROP TABLE IF EXISTS notas;
// DROP TABLE IF EXISTS users;
// CREATE TABLE users (
//     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
//     nombre VARCHAR(50) NOT NULL,
//     apellido VARCHAR(50) NOT NULL,
//     mail VARCHAR(100) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL
// );

// CREATE TABLE notas (
//     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
//     user_id INT NOT NULL,
//     titulo VARCHAR(50) NOT NULL,
//     texto TEXT,
//     CONSTRAINT fk_user
//         FOREIGN KEY (user_id)
//         REFERENCES users(id)
//         ON DELETE CASCADE
// );
