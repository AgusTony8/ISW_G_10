import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function ListaDesplegable(props){

const listaOpc = props.opc

const opciones = listaOpc.map(op => 
    <option value={op.val}>{op.text}</option>
)
    
return(
        <>  
            <h4>{props.titulo}</h4>
            <div class="input-group mb-3">
             <select class="form-select" id="inputGroupSelect01">
                {opciones}
            </select>
            </div>
        </>
    )

}

export default ListaDesplegable