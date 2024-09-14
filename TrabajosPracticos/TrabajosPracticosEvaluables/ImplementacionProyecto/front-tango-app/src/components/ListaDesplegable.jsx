import React from 'react';


function ListaDesplegable(props){

const listaOpc = props.opc

const opciones = listaOpc.map(op => 
    <option key={op.val} value={op.val}>{op.text}</option>
)
    
return(
        <>  
            <h4>{props.titulo}</h4>
            <div className="input-group mb-3">
             <select className="form-select" id="inputGroupSelect01" onChange={props.onChange} defaultValue=''>
                <option value="" disabled>Ingrese una opción</option>
                {opciones}
            </select>
            </div>
        </>
    )

}

export default ListaDesplegable