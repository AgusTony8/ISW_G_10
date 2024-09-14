import React from 'react';

const NavBar = () => {
    return(
        <div className="container-fluid">
        <div className="row">
          {/* Contenido principal con Navbar */}
          <div className="col-13">
            <nav className="navbar bg-body-tertiary">
              <div className="container-fluid d-flex justify-content-end">
                <span className="navbar-brand ms-auto mb-0 h1">Bienvenido Usuario Dador de Carga</span>
              </div>
            </nav>
            <hr />
          </div>
        </div>
      </div>
    )
}

export default NavBar