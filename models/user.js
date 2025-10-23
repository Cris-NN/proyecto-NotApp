import bcrypt from 'bcrypt';
import db from '../config/db.js';

class User {
    constructor(nombre, apellido, mail, password, id = null) {
        this.nombre = String(nombre);
        this.apellido = String(apellido);
        this.mail = String(mail);
        this.password = String(password);
        this.id = id ? Number(id) : null;
    }

    async crearUser() {
        this.#verificarDatos()
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
        if (!user) return "Correo o contraseña incorrecto";
        
        const match = await bcrypt.compare(password, user.password);
        return match ? user : "Correo o contraseña incorrecto";
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

    #verificarMail() {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(this.mail))
            throw new Error("La estructura del mail no es correcto")
    }

    #verificarNoNull(){
        if(!(this.password && this.nombre && this.apellido && this.mail))
            throw new Error("Campo vacio")
    }

    #verificarDatos() {
        this.#verificarMail();
        this.#verificarNoNull();

    }
}

export default User;