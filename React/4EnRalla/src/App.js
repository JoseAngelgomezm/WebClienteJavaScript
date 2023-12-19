import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button } from "reactstrap";
import Tablero from './componentes/Tablero.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensionesCampo: { filas: 9, columnas: 9 },
      campo: [],
    }
  }

  componentWillMount() {
    let filas = this.state.dimensionesCampo.filas
    let columnas = this.state.dimensionesCampo.columnas

    // array que contendra el campo de botones
    let campoBotones = [];
    // crear una tantas filas como tamaño en el estado y 
    // agregarle tantas columnas rellenas de 0 como columnas
    // tiene en el estado
    for (let i = 0; i < filas; i++) {
      let fila = [];
      for (let j = 0; j < columnas; j++) {
        fila.push(0);
      }
      campoBotones.push(fila)
    }

    let copia = this.state.campo
    copia = campoBotones
    this.setState({campo:copia})
  }

  meterFicha(props){
    console.log(props)
  }


  render() {
    return (
      <div className="App" >
        <Tablero meterFicha={(props) => this.meterFicha(props)} campo={this.state.campo}></Tablero>
      </div>
    );
  }

}

export default App;
