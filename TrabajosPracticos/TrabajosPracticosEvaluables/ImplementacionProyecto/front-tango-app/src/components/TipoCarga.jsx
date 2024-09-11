import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const TipoCarga = () => {
    return (
        <select className="form-select" aria-label="Default select example">
        <option disabled selected>Seleccione un tipo de carga</option>
        <option value="1">Documentacion</option>
        <option value="2">Paquete</option>
        <option value="3">Granos</option>
        <option value="4">Hacienda</option>
      </select>
    )
}

export default TipoCarga