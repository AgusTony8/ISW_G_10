import React, { useState } from 'react';
import Domicilio from './Domicilio';
import ListaDesplegable from './ListaDesplegable.jsx';

let tiposDeCarga = [
  { val: 1, text: "Documentacion" },
  { val: 2, text: "Paquete" },
  { val: 3, text: "Granos" },
  { val: 4, text: "Hacienda" }
];

const Pedido = () => {
  const [fechaRetiro, setFechaRetiro] = useState('');
  const [fechaEnvio, setFechaEnvio] = useState('');
  const [errorFecha, setErrorFecha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Compare the two dates
    if (new Date(fechaRetiro) > new Date(fechaEnvio)) {
      setErrorFecha('La fecha de retiro debe ser anterior a la fecha de envío.');
    } else {
      setErrorFecha('');
      // Submit the form or perform further actions
      console.log('Form submitted with valid dates');
    }
  };

  return (
    <div className="container text-center my-4">
      <form onSubmit={handleSubmit}>
        <h2>Publicar Pedido de Envío</h2>

        <div className="text-start mt-4">
          <ListaDesplegable opc={tiposDeCarga} titulo="Seleccione un tipo de carga"></ListaDesplegable>

          <div className="container my-4">
            <h3>Datos del Retiro</h3>
            <h4>Ingrese los datos del domicilio de retiro</h4>
            <Domicilio onFechaChange={setFechaRetiro} />
          </div>

          <div className="container my-4">
            <h3>Datos del Envio</h3>
            <h4>Ingrese los datos del domicilio de envio</h4>
            <Domicilio onFechaChange={setFechaEnvio} />
          </div>

          {errorFecha && <div className="alert alert-danger">{errorFecha}</div>}

          <h5>Imagen del producto</h5>
          <div className="input-group">
            <input type="file" className="form-control" id="Imagenes" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
          </div>

          <button type="submit" className="btn btn-primary btn-lg">Aceptar</button>
          <button type="button" className="btn btn-primary btn-lg">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Pedido;
