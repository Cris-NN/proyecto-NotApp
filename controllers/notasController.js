import path from 'path';
import { fileURLToPath } from 'url';
import Nota from '../models/notaModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const home = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/home.html')) 
}

export const createNota = async (req, res) => {
  try {
    const { titulo, texto } = req.body;
    const userId = req.user.id;
    const nota = new Nota({ titulo, texto, userId });
    const created = await nota.crearNota();
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const obtenerTodas = async (req, res) => {
  try {
    const userId = req.user.id;
    const notas = await Nota.obtenerTodasPorUsuario(userId);
    res.status(200).json(notas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const modificarNota = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, texto } = req.body;

    const nota = new Nota({ titulo, texto, userId: req.user.id, id });
    const updated = await nota.modificarNota({ titulo, texto });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const eliminarNota = async (req, res) => {
  try {
    const { id } = req.params;
    const nota = new Nota({ titulo: "", texto: "", userId: req.user.id, id });
    const result = await nota.eliminarNota();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
