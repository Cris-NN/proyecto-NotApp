import db from '../config/db.js';

class Nota {
  constructor({ titulo, texto, userId, id = null }) {
    this.titulo = String(titulo);
    this.texto = String(texto);
    this.userId = Number(userId);
    this.id = id ? Number(id) : null;
  }

  async crearNota() {
    const result = await db.query(
      `INSERT INTO notas (user_id, titulo, texto) VALUES ($1, $2, $3) RETURNING *`,
      [this.userId, this.titulo, this.texto]
    );
    this.id = result.rows[0].id;
    return result.rows[0];
  }

  async modificarNota({ titulo, texto }) {
    this.titulo = titulo ?? this.titulo;
    this.texto = texto ?? this.texto;

    const result = await db.query(
      `UPDATE notas SET titulo=$1, texto=$2 WHERE id=$3 RETURNING *`,
      [this.titulo, this.texto, this.id]
    );
    return result.rows[0];
  }

  async eliminarNota() {
    await db.query(`DELETE FROM notas WHERE id=$1`, [this.id]);
    return { message: `Nota ${this.id} eliminada` };
  }

  static async obtenerTodasPorUsuario(userId) {
    const result = await db.query(
      `SELECT * FROM notas WHERE user_id=$1 ORDER BY id DESC`,
      [userId]
    );
    return result.rows;
  }
}

export default Nota;