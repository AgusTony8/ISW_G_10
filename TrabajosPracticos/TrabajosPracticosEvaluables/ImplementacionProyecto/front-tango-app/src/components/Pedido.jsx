import React from 'react';
import Domicilio from './Domicilio';
import ListaDesplegable from './ListaDesplegable.jsx';

let tiposDeCarga= [{ val: 1, text:"Documentacion"},
                  { val:2 , text:"Paquete"},
                  { val:3, text:"Granos"},
                  { val:4, text:"Hacienda"}
                ]



const Pedido = () => {
    return (
    <div className="container text-center my-4">
      <form>
      <h2>Publicar Pedido de Envío</h2>
      
      <div className="text-start mt-4">
        <ListaDesplegable opc={tiposDeCarga} titulo="Seleccione un tipo de carga"></ListaDesplegable>
        
        
        <div className="container  my-4">
            <h3>Datos del Retiro</h3>
            <h4>Ingrese los datos del domicilio de retiro</h4>
              <Domicilio></Domicilio>
        </div>
        
        
        <div className="container  my-4">
            <h3>Datos del Envio</h3>
            
            <h4>Ingrese los datos del domicilio de envio</h4>
              <Domicilio></Domicilio>
        </div>
        
        <h5>Imagen del producto</h5>
        <div class="input-group">
          <input type="file" className="form-control" id="Imagenes" aria-describedby="inputGroupFileAddon04" aria-label="Upload"></input>
        </div>
        
        <button type="submit" className="btn btn-primary btn-lg">Aceptar</button>
        <button  type="button" className="btn btn-primary btn-lg">Cancelar</button>

      </div>
      </form>
    </div>
    )
}

export default Pedido