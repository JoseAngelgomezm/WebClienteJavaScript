import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import BotonMinevancic from './assets/components/BotonMinevancic.js'
import './App.css'
import BotonesMovimiento from './assets/components/BotonesMovimiento.js'
import Tablero from './assets/components/Tablero.js'
// crear el class component App 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filas: 10,
      columnas: 8,
    }
  }

  render() {
    return (
      <>
        <BotonesMovimiento/>
        <Tablero layoutBoton={"2"} textoBoton={"-"} columnas={this.state.columnas} filas={this.state.filas}/>
      </>

    )
  }
}

export default App;