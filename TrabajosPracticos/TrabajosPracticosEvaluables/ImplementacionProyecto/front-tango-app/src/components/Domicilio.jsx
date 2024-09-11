import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Domicilio = () => {
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Calle" aria-label="Calle"></input>
            <input type="text" className="form-control" placeholder="Número" aria-label="Número"></input>
            <div class="form-check mt-4">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
            <label className="form-check-label" for="flexCheckDefault">
                S/N
            </label>
            </div>
        </div>
    )
}

export default Domicilio