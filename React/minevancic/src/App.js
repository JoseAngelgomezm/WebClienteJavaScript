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
      posicion: { fila: 7, columna: 0 },
      campo: [],
      numeroMinas: undefined,
    }
  }

  generarTablero = () => {
    let matrizTablero = []
    let posicionesDeMinasSacadas = 0;
    let posicionesMinas = []

    // sacar posiciones aleatorias como minas hay
    while (posicionesDeMinasSacadas < this.state.numeroMinas) {
      let posiciones = []
      // sacar una fila aleatoria
      let filaAleatoria = Math.floor(Math.random() * this.state.filas);
      // sacar una columna aleatoria
      let columnaAleatoria = Math.floor(Math.random() * this.state.columnas);
      // al array de posiciones ponerle la posicion aleatoria
      posiciones.push(filaAleatoria, columnaAleatoria)
      // en añadir cada array de posiciones aleatorias al array donde estaran todas las posiciones de las minas
      posicionesMinas.push(posiciones)
      posicionesDeMinasSacadas++
    }

    console.log(posicionesMinas)
    // ornder la matriz de minas para que las ponga por posicion
    posicionesMinas.sort()
    // contador que contiene la fila que va mirando de la matriz de posiciones de las minas
    let contadorFilaPosicionesMinas = 0;

    // poner las minas
    for (let i = 0; i < this.state.filas; i++) {
      // crear un array donde iran las columnas
      let arrayColumnas = []
      // rellenar cada array de columnas con las minas
      for (let j = 0; j < this.state.columnas; j++) {
        // si la posicion que voy a poner un numero es la de la mina
        if (contadorFilaPosicionesMinas < posicionesMinas.length &&
          posicionesMinas[contadorFilaPosicionesMinas][0] === i &&
          posicionesMinas[contadorFilaPosicionesMinas][1] === j) {

          arrayColumnas[j] = 1
          contadorFilaPosicionesMinas++

        } else {
          arrayColumnas[j] = 999
        }
      }
      matrizTablero.push(arrayColumnas)
    }

    console.log(matrizTablero)

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
    // obtener las minas y modificar el estado de las que hay que poner
    let numeroMinasHTML = document.getElementById("numMinas").innerHTML

    // generar el tablero
    let tableroNuevo = this.generarTablero()

    let copiaEstado = this.state

    copiaEstado = { numeroMinas: numeroMinasHTML, campo: tableroNuevo }

    this.setState({ numeroMinas: copiaEstado.numeroMinas, campo: copiaEstado.campo })

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