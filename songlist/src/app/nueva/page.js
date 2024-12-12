'use client';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in the app directory

const AgregarCancion = () => {
  const { translations } = useLanguage();
  const [mensaje, setMensaje] = useState('');
  const [cancion, setCancion] = useState('');
  const router = useRouter(); // Corrected placement of useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cancion) {
      setMensaje(translations.camposObligatorios); // Mensaje si el campo está vacío
      return;
    }

    // Guardar la nueva canción en el archivo JSON
    const nuevaCancion = { cancion };
    
    // Simulamos el guardado en un archivo JSON (en la práctica se debe manejar en el backend)
    const response = await fetch('/api/guardarCancion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaCancion),
    });

    if (response.ok) {
      setMensaje(translations.cancionGuardada);
      setCancion('');
      router.push('/'); // Redirige a la página principal al guardar la canción
    } else {
      setMensaje(translations.errorGuardarCancion);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/fondogen.webp')" }} // Asegúrate de poner la ruta correcta
    >
      <div className="w-full max-w-md bg-white p-6 rounded shadow-lg opacity-90">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{translations.agregarCancion}</h2>
        <h3 className="text-lg font-medium text-gray-700 mb-4">¿Qué canción falta?</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              value={cancion}
              onChange={(e) => setCancion(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded"
              rows="4"
              placeholder="Escribe el nombre de la canción..."
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()} // Volver a la página anterior
              className="bg-gray-400 text-white p-3 rounded hover:bg-gray-500"
            >
              Volver
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        </form>
        {mensaje && <p className="mt-4 text-gray-600">{mensaje}</p>}
      </div>
    </div>
  );
};

export default AgregarCancion;
