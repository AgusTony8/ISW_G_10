import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/ListaSugerencias.styles.css'

const ListaSugerencias = ({ items, getKey, getDisplayValue, onItemClick }) => {
  return (
    <>
      {items !== undefined && items.length > 0 && (
        <ul className="suggestions-list">
          {items.map(item => (
            <li
              key={getKey(item)} // Obtener el key con la función getKey
              onClick={() => onItemClick(item)} // Ejecutar la acción con la función onItemClick
            >
              {getDisplayValue(item)} {/* Obtener el valor a mostrar con la función getDisplayValue */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ListaSugerencias;
