import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import InputTexto from './InputTexto.jsx';

const Domicilio = () => {
    return (
        <>
            <InputTexto titulo="Provincia" label="Provincia"></InputTexto>
            <InputTexto titulo="Localidad" label="Localidad"></InputTexto>
            <h5>Direccion</h5>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Calle" aria-label="Calle"></input>
                <input type="text" className="form-control" placeholder="Número" aria-label="Número"></input>
            </div>
            <div className="form-floating">
                <textarea 
                    className="form-control" 
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2" 
                    style={{ height: '100px' }}
                ></textarea>
                <label htmlFor="floatingTextarea2">Referencia</label>
            </div>
            <h5>Fecha</h5>
            <input type="date" className="form-control" placeholder="Fecha de retiro" aria-label="Fecha Retiro"></input>

        </>
    )
}

export default Domicilio