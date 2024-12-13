import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const { translations, changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Idioma seleccionado por defecto
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú de idiomas

  useEffect(() => {
    // Cargar el idioma desde localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      changeLanguage(savedLanguage); // Cambiar idioma en el contexto
    }
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    changeLanguage(language); // Cambia el idioma en el contexto
    localStorage.setItem('language', language); // Guardar idioma en localStorage
    setIsMenuOpen(false); // Cierra el menú después de seleccionar el idioma
  };

  return (
    <header className="w-full bg-pink-600 text-white p-4 flex flex-col sm:flex-row items-center justify-between shadow-lg relative">
      <div className="flex items-center space-x-4">
        {/* Menú desplegable con el idioma */}
        <div className="relative z-10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center text-white px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300"
          >
            {selectedLanguage === 'es' ? 'Español' : 'English'}
            <span className="ml-2">{isMenuOpen ? '▲' : '▼'}</span>
          </button>

          {/* Menú desplegable con los idiomas */}
          {isMenuOpen && (
            <div className="absolute bg-white text-black mt-2 rounded w-32 z-20">
              <button
                onClick={() => handleLanguageChange('es')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Español
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                English
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Título principal centrado y con tamaño responsivo */}
      <h1 className="text-white text-center font-extrabold tracking-widest drop-shadow-lg text-2xl sm:text-3xl lg:text-4xl leading-tight w-full">
        {translations.mainTitle}
      </h1>

      {/* Botón para agregar nueva canción como círculo */}
      {/*<div className="absolute bottom-4 right-4">
        <Link href="/nueva">
          <button className="w-12 h-12 bg-purple-800 text-white rounded-full flex items-center justify-center text-3xl hover:bg-purple-900 transition-all duration-300">
            +
          </button>
        </Link>
      </div>*/}

    </header>
  );
}
