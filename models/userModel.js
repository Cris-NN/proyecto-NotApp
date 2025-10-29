import bcrypt from 'bcrypt';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

class User {
  constructor({ nombre, apellido, mail, password, id = null }) {
    this.nombre = String(nombre);
    this.apellido = String(apellido);
    this.mail = String(mail);
    this.password = String(password);
    this.id = id ? Number(id) : null;
  }

  async crearUser() {
    this.#verificarDatos();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const result = await db.query(
      `INSERT INTO users (nombre, apellido, mail, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [this.nombre, this.apellido, this.mail, hashedPassword]
    );
    this.id = result.rows[0].id;
    return this; 
  }

  async modificarUser() {
    const result = await db.query(
      `UPDATE users SET nombre=$1, apellido=$2, mail=$3 WHERE id=$4 RETURNING *`,
      [this.nombre, this.apellido, this.mail, this.id]
    );
    return result.rows[0];
  }

  static async eliminarUser(id) {
    await db.query(`DELETE FROM users WHERE id=$1`, [id]);
    return { message: `Usuario ${id} eliminado` };
  }

  static async login(mail, password) {
    const result = await db.query(`SELECT * FROM users WHERE mail = $1`, [mail]);
    const userData = result.rows[0];
    if (!userData) return null;

    const match = await bcrypt.compare(password, userData.password);
    if (!match) return null;

    const user = new User(userData);
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });

    return { user, token };
  }

  static async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      const result = await db.query("SELECT * FROM users WHERE id=$1", [decoded.id]);
      if (!result.rows[0]) return null;
      return new User(result.rows[0]);
    } catch (err) {
      return null;
    }
  }

  #verificarMail() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(this.mail)) throw new Error("El mail no es correcto");
  }

  #verificarNoNull() {
    if (!(this.password && this.nombre && this.apellido && this.mail))
      throw new Error("Campos vacíos");
  }

  #verificarDatos() {
    this.#verificarMail();
    this.#verificarNoNull();
  }
}

export default User;
