import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function InputTexto(props){
        return(
            <div>
                <h4>{props.titulo}</h4>
                <div className="input-group flex-nowrap">
                    <input type="text" className="form-control" placeholder={props.titulo} aria-label={props.lebel} aria-describedby="addon-wrapping"></input>
                </div>
            </div>
        )
}

export default InputTexto