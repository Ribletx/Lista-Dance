import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, artista } = req.body;

    const nuevaCancion = { nombre, artista };

    try {
      // Leer el archivo JSON existente
      const filePath = path.resolve('data', 'canciones.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Agregar la nueva canción al array
      data.canciones.push(nuevaCancion);

      // Guardar el archivo JSON con la nueva canción
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      res.status(200).json({ message: 'Canción guardada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al guardar la canción' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
