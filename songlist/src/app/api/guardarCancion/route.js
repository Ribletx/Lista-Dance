import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    console.log('Inicio del handler POST');
    
    // Obtén el cuerpo de la solicitud
    const { texto } = await req.json();
    console.log('Cuerpo recibido:', { texto });
    
    // Ruta correcta del directorio donde debe estar el archivo nuevo.json
    const dirPath = path.join(process.cwd(), 'src', 'data'); // Ruta del directorio 'src/data'
    const filePath = path.join(process.cwd(), 'src', 'data', 'nuevo.json'); // Ruta del archivo 'nuevo.json'

    // Verifica si el directorio existe, si no, lo crea
    if (!fs.existsSync(dirPath)) {
      console.log('El directorio no existe. Creando directorio...');
      fs.mkdirSync(dirPath, { recursive: true }); // Crea solo los directorios necesarios
    }

    // Verifica si el archivo existe
    if (!fs.existsSync(filePath)) {
      console.log('El archivo no existe. Creando uno nuevo.');
      
      // Si el archivo no existe, crea uno con un arreglo vacío
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
    }

    // Lee los datos actuales
    let data = [];
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      data = fileContent ? JSON.parse(fileContent) : []; // Si el archivo está vacío, usa un arreglo vacío
    } catch (error) {
      console.log('Error al leer o analizar el archivo JSON. Creando un arreglo vacío.');
      data = []; // Si hay un error al analizar, iniciamos un arreglo vacío
    }
    
    // Añade el nuevo texto al arreglo
    console.log('Añadiendo nuevo texto:', texto);
    data.push({ texto });

    // Guarda los datos actualizados en el archivo
    console.log('Guardando datos en el archivo...');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return new Response(JSON.stringify({ message: 'Texto guardado correctamente.' }), { status: 200 });
  } catch (error) {
    console.error('Error al guardar el texto:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar el texto' }), { status: 500 });
  }
}
