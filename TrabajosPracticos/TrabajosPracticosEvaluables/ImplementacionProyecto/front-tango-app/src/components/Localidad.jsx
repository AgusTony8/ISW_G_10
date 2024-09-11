import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Localidad = () => {
    return (
        <div className="input-group flex-nowrap">
            <input type="text" className="form-control" placeholder="Ingrese una localidad" aria-label="Localidad" aria-describedby="addon-wrapping"></input>
        </div>
    )
}

export default Localidad