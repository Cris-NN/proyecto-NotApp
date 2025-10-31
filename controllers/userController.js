import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/userModel.js';

const __filename = fileURLToPath(import.meta.url); // devuelve la URL acutal, y la funcion lo transforma a una ruta real de archivo
const __dirname = path.dirname(__filename); // se obtiene solamente el directorio donde esta el archivo

// export const inicio = (req, res) => {
//   res.sendFile(path.join(__dirname, '../views/inicio.html')) // conecto con el view
//   //res.render()
// }

export const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const result = await User.login(mail, password);

    if (!result) return res.status(401).json({ message: "Correo o contraseña incorrectos" });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.status(200).json({
      user: {
        id: result.user.id,
        nombre: result.user.nombre,
        apellido: result.user.apellido,
        mail: result.user.mail
      }
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nombre, apellido, mail, password } = req.body;
    const user = new User({ nombre, apellido, mail, password });
    const created = await user.crearUser();
    res.status(201).json({
      id: created.id,
      nombre: created.nombre,
      apellido: created.apellido,
      mail: created.mail
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "No autorizado" });

  const user = await User.verifyToken(token);
  if (!user) return res.status(401).json({ error: "Token inválido" });

  req.user = user;
  next();
};

export const authFrontMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect('/')

  const user = await User.verifyToken(token);
  if (!user) return res.redirect('/')

  req.user = user;
  next();
};