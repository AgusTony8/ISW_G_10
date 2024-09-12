import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import Domicilio from './Domicilio';
import InputTexto from './InputTexto.jsx';
import ListaDesplegable from './ListaDesplegable.jsx';

let tiposDeCarga= [{ val: 1, text:"Documentacion"},
                  { val:2 , text:"Paquete"},
                  { val:3, text:"Granos"},
                  { val:4, text:"Hacienda"}
                ]



const Pedido = () => {
    return (
    <div className="container text-center my-4">
      <h2>Publicar Pedido de Envío</h2>
      
      <div className="text-start mt-4">
        <ListaDesplegable opc={tiposDeCarga} titulo="Seleccione un tipo de carga"></ListaDesplegable>
        <div className="container text-center my-4">
            <h3>Direccion de Retiro</h3>
        </div>
        <InputTexto titulo="Seleccione una Provincia" label="Provincia"></InputTexto>
        <InputTexto titulo="Ingrese una localidad" label="Localidad"></InputTexto>
        <h4>Ingrese un Domicilio</h4>
        <Domicilio/>
      </div>
    </div>
    )
}

export default Pedido