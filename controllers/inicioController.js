import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // devuelve la URL acutal, y la funcion lo transforma a una ruta real de archivo
const __dirname = path.dirname(__filename); // se obtiene solamente el directorio donde esta el archivo

export const login = (req, res) => {
    res.sendFile(path.join(__dirname,'../views/index.html')) // conecto con el view
    //res.render()
}