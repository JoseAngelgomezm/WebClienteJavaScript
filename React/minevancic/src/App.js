import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css'
import BotonesMovimiento from './assets/components/BotonesMovimiento.js'
import Tablero from './assets/components/Tablero.js'
import PanelMinas from './assets/components/PanelMinas.js'
// crear el class component App 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filas: 8,
      columnas: 8,
      posicion: { fila: 9, columna: 0 },
      campo: [] ,
      numeroMinas: 1,
    }
  }

  generarTablero = () => {
    let matrizTablero = Array(this.state.filas)
    
    for(let i = 0; i<this.state.filas; i++){
      matrizTablero[i] = Array(this.state.columnas)
      for(let j = 0; j<this.state.columnas; j++){
        matrizTablero[i][j] = 999
      }
    }

    return matrizTablero;
  }


  subirMinas = () => {
    let parrafoMinas = document.getElementById("numMinas");
    let numeroMinas = parrafoMinas.innerHTML;
    if (numeroMinas < 20) {
      numeroMinas++;
    }
    parrafoMinas.innerHTML = numeroMinas;
  }

  bajarMinas = () => {
    let parrafoMinas = document.getElementById("numMinas");
    let numeroMinas = parrafoMinas.innerHTML;
    if (numeroMinas > 1) {
      numeroMinas--;
    }
    parrafoMinas.innerHTML = numeroMinas;
  }

  jugar() {
    let numeroMinasHTML = document.getElementById("numMinas").innerHTML;
    // obtener las minas y modificar el estado de las que hay que poner
    let tableroNuevo = this.generarTablero();
    // generar el tablero
    this.setState({ numeroMinas: numeroMinasHTML, campo:tableroNuevo})
  }

  moverAbajo() {
    if (this.state.posicion.fila >= 0 && this.state.posicion.fila < this.state.filas - 1) {
      let copiaPosicion = this.state.posicion
      copiaPosicion.fila += 1;
      this.setState({ posicion: copiaPosicion })
    }

  }

  moverArriba() {
    if (this.state.posicion.fila > 0 && this.state.posicion.fila < this.state.filas) {
      let copiaPosicion = this.state.posicion
      copiaPosicion.fila -= 1;
      this.setState({ posicion: copiaPosicion })
    }

  }

  moverIzquierda() {
    if (this.state.posicion.columna > 0 && this.state.posicion.fila < this.state.columnas) {
      let copiaPosicion = this.state.posicion
      copiaPosicion.columna -= 1;
      this.setState({ posicion: copiaPosicion })
    }
  }

  moverDerecha() {
    if (this.state.posicion.columna >= 0 && this.state.posicion.columna < this.state.columnas - 1) {
      let copiaPosicion = this.state.posicion
      copiaPosicion.columna += 1;
      this.setState({ posicion: copiaPosicion })
    }

  }



  render() {
    return (
      <>
        <PanelMinas clickSubirMina={() => this.subirMinas()} clickBajarMina={() => this.bajarMinas()} clickJugar={() => this.jugar()}></PanelMinas>
        <br></br>
        <Tablero pintar={this.state.posicion} posiciones={this.state.campo} columnas={this.state.columnas} filas={this.state.filas} />
        <br></br>
        <BotonesMovimiento abajo={() => this.moverAbajo()} arriba={() => this.moverArriba()} izquierda={() => this.moverIzquierda()} derecha={() => this.moverDerecha()} />
      </>

    )
  }
}

export default App;