import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from "react";

//console.log("mounting Articulos");
async function ObtenerLocalidades() {
    let data = await articulosfamiliasService.Buscar();
    setArticulosFamilias(data);
  }


// cargar al "montar" el componente, solo la primera vez (por la dependencia [])
useEffect(() => {
    BuscarArticulosFamilas();
  }, []);



const Localidad = () => {
    return (
        <div className="input-group flex-nowrap">
            <input type="text" className="form-control" placeholder="Ingrese una localidad" aria-label="Localidad" aria-describedby="addon-wrapping"></input>
        </div>
    )
}

export default Localidad