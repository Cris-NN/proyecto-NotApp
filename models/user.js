import bcrypt from 'bcrypt';

class User {
    constructor(nombre, apellido, mail, password, id = null) {
        this.nombre = String(nombre);
        this.apellido = String(apellido);
        this.mail = String(mail);
        this.password = String(password);
        this.id = id ? String(id) : null;
    }

    async crearUser() {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const result = await db.query(`INSERT INTO users (nombre, apellido, mail, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [this.nombre, this.apellido, this.mail, hashedPassword]
        );
        this.id = result.rows[0].id;
        return result.rows[0];
    }

    static async verificarUser(mail, password) {
        const result = await db.query(`SELECT * FROM users WHERE mail = $1`, [mail]);
        const user = result.rows[0];
        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        return match ? user : null;
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

}

export default User;