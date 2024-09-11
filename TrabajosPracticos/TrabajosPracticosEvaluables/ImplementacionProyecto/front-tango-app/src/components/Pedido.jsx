import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import TipoCarga from './TipoCarga';
import Localidad from './Localidad';
import Domicilio from './Domicilio';

const Pedido = () => {
    return (
    <div className="container text-center my-4">
      <h2>Publicar Pedido de Envío</h2>
      <div className="text-start mt-4">
        <h4>Seleccione un tipo de carga</h4>
        <TipoCarga/>
        <div className="container text-center my-4">
            <h3>Direccion de Retiro</h3>
        </div>
        <h4>Seleccione una provincia</h4>
        <h4>Ingrese una localidad</h4>
        <Localidad/>
        <h4>Ingrese un Domicilio</h4>
        <Domicilio/>
      </div>
    </div>
    )
}

export default Pedido