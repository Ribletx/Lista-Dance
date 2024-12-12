"use client"; // Marca el archivo para ser procesado en el cliente

import React, { useState, useEffect } from "react";
import { useLanguage } from "./context/LanguageContext"; // Importa el contexto de idioma
import Header from "./components/header"; // Importar el componente Header
import Footer from "./components/footer"; // Importar el componente Footer
import cancionesData from "../data/canciones.json"; // Ajusta la ruta si es necesario

const Canciones = () => {
  const { translations } = useLanguage(); // Usar el contexto de idioma
  const [busqueda, setBusqueda] = useState(""); // Término de búsqueda
  const [cancionesFiltradas, setCancionesFiltradas] = useState(cancionesData.canciones); // Accede a la clave 'canciones'

  // Maneja la búsqueda
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  // Filtra las canciones cada vez que cambia la búsqueda
  useEffect(() => {
    const filtradas = cancionesData.canciones.filter(  // Accede a la clave 'canciones'
      (cancion) =>
        cancion.nombre.toLowerCase().includes(busqueda) ||
        cancion.artista.toLowerCase().includes(busqueda)
    );
    setCancionesFiltradas(filtradas);
  }, [busqueda]);

  return (
    <div
      className="min-h-screen flex flex-col bg-repeat bg-top"
      style={{ backgroundImage: "url('/fondogen.webp')" }} // Imagen de fondo
    >
      <Header /> {/* Componente Header */}

      <main className="flex-grow flex flex-col items-center px-4 md:px-8">
        <div className="w-full max-w-3xl mt-6">
          <input
            type="text"
            placeholder={translations.busqueda} // Texto del contexto de idioma
            value={busqueda}
            onChange={manejarBusqueda}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Contenedor de canciones en una columna (flex-col) */}
        <div
          className="flex flex-col gap-6 my-8 w-full max-w-3xl"
          style={{ padding: "0 10px", boxSizing: "border-box" }}
        >
          {cancionesFiltradas.map((cancion, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-95 p-6 rounded-lg shadow-lg flex items-center text-left w-full transition-all duration-300 transform hover:bg-gray-700 hover:scale-105 hover:shadow-xl"
            >
              {/* Imagen */}
              <div className="cursor-pointer mr-6">
                <img
                  src={cancion.imagen ? `/Portadas/${cancion.imagen}` : "/default.png"}
                  alt={cancion.nombre}
                  className="w-24 h-24 object-cover rounded transition-all duration-300"
                />
              </div>

              {/* Información de la canción */}
              <div className="flex flex-col sm:flex-row w-full justify-between items-center">
                {/* Nombre centrado */}
                <h2 className="text-2xl font-semibold text-gray-300 transition-all duration-300 hover:text-white text-center sm:text-left">
                  {cancion.nombre}
                </h2>

                {/* Autor al lado */}
                <p className="text-lg text-gray-300 transition-all duration-300 hover:text-white sm:ml-6">
                  {cancion.artista}
                </p>
              </div>
            </div>
          ))}
        </div>

        {cancionesFiltradas.length === 0 && (
          <p className="text-gray-500 mt-4">{translations.noResults}</p> // Utilizar el texto del contexto de idioma
        )}
      </main>

      <Footer /> {/* Componente Footer */}
    </div>
  );
};

export default Canciones;
