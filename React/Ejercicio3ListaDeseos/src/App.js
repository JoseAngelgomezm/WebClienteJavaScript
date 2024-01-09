import React, { Component, useState } from 'react';
import logo from './logo.svg';

function App() {
  const [deseos, setDeseos] = useState(["GAMBAS", "JAMON"]);
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
          <Desire listaDeseos={deseos} añadirDeseo={() => this.añadirDeseo()}></Desire>
        </div>

      </div>
    </>
  )
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
    <form onSubmit={() => props.añadirDeseo()}>
      <input type="text" placeholder="Escribe tu deseo" name="deseo" />
    </form>
  );
}

export default App;
