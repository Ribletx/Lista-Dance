'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in the app directory
import { useLanguage } from "../context/LanguageContext";

const AgregarTexto = () => {
  const { translations } = useLanguage();
  const [mensaje, setMensaje] = useState('');
  const [texto, setTexto] = useState(''); // Cambiado "cancion" a "texto"
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!texto) {
      setMensaje("Campos obligatorios"); // Mensaje si el campo está vacío
      return;
    }

    const nuevoTexto = { texto }; // Guardar como "texto"

    try {
      const response = await fetch('/api/guardarCancion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoTexto),
      });

      if (response.ok) {
        setMensaje("Texto guardado exitosamente"); // Mensaje para texto guardado
        setTexto(''); // Reinicia el campo del texto
        router.push('/'); // Redirige a la página principal
      } else {
        const errorData = await response.json();
        setMensaje(errorData.message || "Error al guardar el texto"); // Mensaje de error al guardar
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar el texto"); // Mensaje de error genérico
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/fondogen.webp')" }} // Asegúrate de poner la ruta correcta
    >
      <div className="w-full max-w-md bg-pink-200 p-6 rounded shadow-lg opacity-90">
        <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">{translations.sonfalta}</h3> {/* Título estático */}
        <form onSubmit={handleSubmit} className="p-6 rounded" style={{ minHeight: '200px' }}> {/* Fondo rosado claro */}
          <div className="mb-4">
            <textarea
              value={texto} // Ahora maneja el valor del texto
              onChange={(e) => setTexto(e.target.value)} // Actualiza el estado del texto
              className="w-full bg-pink-100 p-3 border-2 border-gray-300 rounded resize-none" // Impide redimensionar el área de texto
              rows="4"
              placeholder= {translations.encuesta}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()} // Volver a la página anterior
              className="bg-pink-700 text-black p-3 rounded hover:bg-pink-900"
            >
              {translations.backButton}
            </button>
            <button
              type="submit"
              className="bg-green-400 text-black p-3 rounded hover:bg-green-600"
            >
              {translations.sendButton}
            </button>
          </div>
        </form>
        {mensaje && <p className="mt-4 text-gray-600 text-center">{mensaje}</p>}
      </div>
    </div>
  );
};

export default AgregarTexto;
