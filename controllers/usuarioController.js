import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/user.js';

const __filename = fileURLToPath(import.meta.url); // devuelve la URL acutal, y la funcion lo transforma a una ruta real de archivo
const __dirname = path.dirname(__filename); // se obtiene solamente el directorio donde esta el archivo

export const inicio = (req, res) => {
    res.sendFile(path.join(__dirname,'../views/index.html')) // conecto con el view
    //res.render()
}

export const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.verificarUser(mail, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nombre, apellido, mail, password } = req.body;
    const user = new User(nombre, apellido, mail, password);
    const created = await user.crearUser();
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};