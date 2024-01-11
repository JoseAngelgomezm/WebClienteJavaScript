import React, { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [deseos, setDeseos] = useState(["GAMBAS", "JAMON"]);

  const añadirDeseo = (event) => {
    // que no haga el evento por defecto al hacer submit en el formulario
    event.preventDefault();
    let lista = deseos
    lista.push(event.target.deseo.value)
    console.log(lista)
    setDeseos(lista)
    event.target.deseo.value = ''
    forzarUpdate()
  }

  let forzarUpdate = useForceUpdate()

  return (
    <>
      <div className="App">

        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <h2> Lista de deseos.</h2>
        </div>

        <div>
          <p><strong>Añade tu regalo favorito</strong></p>
          <DesireList listaDeseos={deseos}></DesireList>
          <Desire añadirDeseo={añadirDeseo}></Desire>
        </div>

      </div>
    </>
  )

}

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

const DesireList = (props) => {
  return (
    <ul>
      {props.listaDeseos.map((deseos) => <li>{deseos}</li>)}
    </ul>
  );
}

const Desire = (props) => {
  return (
    <form onSubmit={props.añadirDeseo}>
      <input type="text" placeholder="Escribe tu deseo" name="deseo" />
    </form>
  );
}

export default App;
