import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css'
import BotonesMovimiento from './assets/components/BotonesMovimiento.js'
import Tablero from './assets/components/Tablero.js'
import PanelMinas from './assets/components/PanelMinas.js'
import { Button } from "reactstrap";

// crear el class component App 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filas: 8,
      columnas: 7,
      posicion: { fila: 7, columna: 0 },
      haGanado: false,
      haPerdido: false,
      campo: [],
    }
  }

  generarTablero = (numeroMinas) => {
    // matriz que sera el tablero con los 999 y las minas a 1
    let matrizTablero = []
    let posicionesDeMinasSacadas = 0;
    let posicionesMinas = []

    // sacar posiciones aleatorias como minas hay
    while (posicionesDeMinasSacadas < numeroMinas) {
      let posiciones = []
      // sacar una fila aleatoria
      let filaAleatoria = Math.floor(Math.random() * this.state.filas);
      // sacar una columna aleatoria
      let columnaAleatoria = Math.floor(Math.random() * this.state.columnas);
      // al array de posiciones ponerle la posicion aleatoria
      posiciones.push(filaAleatoria, columnaAleatoria)

      // si la posicion es la casilla de salida o la de meta o alrededores o ya ha salido no ponerla 
      if ((posiciones[0] === 7 && posiciones[1] === 0) || (posiciones[0] === 0 && posiciones[1] === 6) || (posiciones[0] === 6 && posiciones[1] === 0) ||
        (posiciones[0] === 7 && posiciones[1] === 1) || (posiciones[0] === 0 && posiciones[1] === 5) || (posiciones[0] === 1 && posiciones[1] === 6)) {

      } else {
        // añadir cada array de posiciones aleatorias al array donde estarán todas las posiciones de las minas
        posicionesMinas.push(posiciones)
        posicionesDeMinasSacadas++
      }

    }

    console.log(posicionesMinas)

    // orden la matriz de minas para que las ponga por posición
    posicionesMinas.sort()

    // contador filas 
    let contadorFilas = 0;

    // poner las minas a 1 y los 999
    for (let i = 0; i < this.state.filas; i++) {
      // crear un array donde iran las columnas
      let arrayColumnas = []
      // rellenar cada array de columnas con las minas o los 999
      for (let j = 0; j < this.state.columnas; j++) {
        // si la posicion que voy a poner un numero es la de la mina
        if (contadorFilas < posicionesMinas.length && posicionesMinas[contadorFilas][0] === i && posicionesMinas[contadorFilas][1] === j) {
          arrayColumnas[j] = 1
          contadorFilas++
        } else {
          arrayColumnas[j] = 999
        }
      }
      matrizTablero.push(arrayColumnas)
    }

    // resolver las distancias
    let flag = true
    // mientras el breaker sea true , continuar haciendo cosas 
    while (flag) {
      // poner el flag a false para que salga
      flag = false
      // recorrer la matriz entera
      for (let i = 0; i < matrizTablero.length; i++) {
        for (let j = 0; j < matrizTablero[i].length; j++) {
          // mirar los 8 lados
          this.mirar8Lados(i, j, matrizTablero, flag)
        }
      }
    }

    console.log(matrizTablero)

    return matrizTablero;
  }

  mirar8Lados = (i, j, matrizTablero, flag) => {
    // cambiar los 8 lados
    //arriba
    if ((i - 1 < matrizTablero.length - 1) && (i - 1 >= 0) && (matrizTablero[i][j] !== 1) && (matrizTablero[i - 1][j] < matrizTablero[i][j])) {
      // si la que miro mas 1 es menor igual que 5
      if (matrizTablero[i - 1][j] + 1 <= 5) {
        matrizTablero[i][j] = matrizTablero[i - 1][j] + 1
        flag = true;
      }
    }
    //abajo
    if ((i + 1 < matrizTablero.length - 1) && (i + 1 >= 0) && (matrizTablero[i][j] !== 1) && (matrizTablero[i + 1][j] < matrizTablero[i][j])) {
      if (matrizTablero[i + 1][j] + 1 <= 5) {
        matrizTablero[i][j] = matrizTablero[i + 1][j] + 1
        flag = true;
      }
    }
    // izquierda
    if ((j - 1 < matrizTablero[i].length - 1) && (j - 1 >= 0) && (matrizTablero[i][j] !== 1) && (matrizTablero[i][j - 1] < matrizTablero[i][j])) {
      if (matrizTablero[i][j - 1] + 1 <= 5) {
        matrizTablero[i][j] = matrizTablero[i][j - 1] + 1
        flag = true;
      }
    }
    //derecha
    if ((j + 1 < matrizTablero[i].length - 1) && (j + 1 >= 0) && (matrizTablero[i][j] !== 1) && (matrizTablero[i][j + 1] < matrizTablero[i][j])) {
      if (matrizTablero[i][j + 1] + 1 <= 5) {
        matrizTablero[i][j] = matrizTablero[i][j + 1] + 1
        flag = true;
      }
    }
    // diagonal arriba derecha
    if ((i - 1 < matrizTablero.length - 1) && (i - 1 >= 0) && (j + 1 < matrizTablero[i].length) - 1 && (j + 1 >= 0) && (matrizTablero[i][j] !== 1) && (matrizTablero[i - 1][j + 1] < matrizTablero[i][j])) {
      if (matrizTablero[i - 1][j + 1] + 1 <= 5) {
        matrizTablero[i][j] = matrizTablero[i - 1][j + 1] + 1
        flag = true;
      }
    }
    // diagonal arriba izquierda
    if ((i - 1 < matrizTablero.length - 1) && (i - 1 >= 0) && (j - 1 < matrizTablero[i].length - 1) && (j - 1 >= 0) && (matrizTablero[i][j] !== 1) && (matrizTablero[i - 1][j - 1] < matrizTablero[i][j])) {
      if (matrizTablero[i - 1][j - 1] + 1 <= 5) {
        matrizTablero[i][j] = matrizTablero[i - 1][j - 1] + 1
        flag = true;
      }
    }
    // diagonal abajo derecha
    if ((i + 1 < matrizTablero.length - 1) && (i + 1 >= 0) && (j + 1 < matrizTablero[i].length - 1) && (j + 1 >= 0) && (matrizTablero[i][j] !== 1) && (matrizTablero[i + 1][j + 1] < matrizTablero[i][j])) {
      if (matrizTablero[i + 1][j + 1] + 1 <= 5) {
        matrizTablero[i][j] = matrizTablero[i + 1][j + 1] + 1
        flag = true;
      }
    }
    // diagonal abajo izquierda
    if ((i + 1 < matrizTablero.length - 1) && (i + 1 >= 0) && (j - 1 < matrizTablero[i].length - 1) && (j - 1 >= 0) && (matrizTablero[i][j] !== 1) && (matrizTablero[i + 1][j - 1] < matrizTablero[i][j])) {
      if (matrizTablero[i + 1][j - 1] + 1 <= 5) {
        matrizTablero[i][j] = matrizTablero[i + 1][j - 1] + 1
        flag = true;
      }
    }
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
    let numeroMinasHTML = document.getElementById("numMinas").innerHTML

    // generar el tablero
    let tableroNuevo = this.generarTablero(numeroMinasHTML)

    // setear el campo
    let copiaEstado = this.state
    copiaEstado.posicion.fila = 7
    copiaEstado.posicion.columna = 0
    copiaEstado.haGanado = false;
    copiaEstado.haPerdido = false;
    this.setState({ campo: tableroNuevo })

  }

  comprobarSiHaGanadoOPerdido() {
    if (this.state.posicion.fila === 0 && this.state.posicion.columna === 6) {
      let copiaEstado = this.state
      copiaEstado.haGanado = true
      copiaEstado.campo = "Has Ganado"
      this.setState({ copiaEstado })
    } else if (this.state.campo[this.state.posicion.fila][this.state.posicion.columna] === 1) {
      let copiaEstado = this.state
      copiaEstado.haPerdido = true
      copiaEstado.campo = "Has Perdido"
    }
  }

  moverAbajo() {
    // si no ha ganado o no ha perdido moverse
    if (this.state.haGanado === false && this.state.haPerdido === false) {
      if (this.state.posicion.fila >= 0 && this.state.posicion.fila < this.state.filas - 1) {
        let copiaPosicion = this.state.posicion
        copiaPosicion.fila += 1;
        this.setState({ posicion: copiaPosicion })
      }
    } else {

    }
    // siempre comprobar si ha ganado o ha perdido
    this.comprobarSiHaGanadoOPerdido()
  }

  moverArriba() {
    // si no ha ganado o no ha perdido moverse
    if (this.state.haGanado === false && this.state.haPerdido === false) {
      if (this.state.posicion.fila > 0 && this.state.posicion.fila < this.state.filas) {
        let copiaPosicion = this.state.posicion
        copiaPosicion.fila -= 1;
        this.setState({ posicion: copiaPosicion })
      }
    } else {

    }
    // siempre comprobar si ha ganado o ha perdido
    this.comprobarSiHaGanadoOPerdido()
  }

  moverIzquierda() {
    // si no ha ganado o no ha perdido moverse
    if (this.state.haGanado === false && this.state.haPerdido === false) {
      if (this.state.posicion.columna > 0 && this.state.posicion.columna < this.state.columnas) {
        let copiaPosicion = this.state.posicion
        copiaPosicion.columna -= 1;
        this.setState({ posicion: copiaPosicion })
      }
    } else {

    }
    // siempre comprobar si ha ganado o ha perdido
    this.comprobarSiHaGanadoOPerdido()
  }

  moverDerecha() {
    // si no ha ganado o no ha perdido moverse
    if (this.state.haGanado === false && this.state.haPerdido === false) {
      if (this.state.posicion.columna >= 0 && this.state.posicion.columna < this.state.columnas - 1) {
        let copiaPosicion = this.state.posicion
        copiaPosicion.columna += 1;
        this.setState({ posicion: copiaPosicion })
      }
    } else {

    }
    // siempre comprobar si ha ganado o ha perdido
    this.comprobarSiHaGanadoOPerdido()
  }



  render() {
    return (
      <>
        <div id="juego" class="centrado">
          <PanelMinas clickSubirMina={() => this.subirMinas()} clickBajarMina={() => this.bajarMinas()} clickJugar={() => this.jugar()}></PanelMinas>
          <br></br>
          <Tablero pintar={this.state.posicion} posiciones={this.state.campo} columnas={this.state.columnas} filas={this.state.filas} />
          <br></br>
          <BotonesMovimiento abajo={() => this.moverAbajo()} arriba={() => this.moverArriba()} izquierda={() => this.moverIzquierda()} derecha={() => this.moverDerecha()} />
        </div>

        <div id="info" class="centrado">
          <Button color="danger">distancia 2</Button>
          <br />
          <Button color="warning">distancia 3</Button>
          <br />
          <Button color="success">distancia 4</Button>
          <br />
          <Button color="secondary">distancia 5</Button>
        </div>
      </>

    )
  }
}

export default App;