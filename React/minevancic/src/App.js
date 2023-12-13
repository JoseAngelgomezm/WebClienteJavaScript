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

      // si la posicion es la casilla de salida o la de meta no ponerla
      if ((posiciones[0] === 7 && posiciones[1] === 7) || (posiciones[0] === 0 && posiciones[1] === 6)) {
        posicionesDeMinasSacadas++
      } else {
        // en añadir cada array de posiciones aleatorias al array donde estaran todas las posiciones de las minas
        posicionesMinas.push(posiciones)
        posicionesDeMinasSacadas++
      }

    }

    // ornder la matriz de minas para que las ponga por posicion
    posicionesMinas.sort()

    // contador que contiene la fila que va mirando de la matriz de posiciones de las minas
    let contadorFilaPosicionesMinas = 0;

    // poner las minas a 1 y los 999
    for (let i = 0; i < this.state.filas; i++) {
      // crear un array donde iran las columnas
      let arrayColumnas = []
      // rellenar cada array de columnas con las minas o los 999
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

    // resolver las distancias
    let flag = true
    // mientras el breaker sea 0 , continuar haciendo cosas 
    while (flag) {
      // poner el flag a true para que salga
      flag = false
      // recorrer la matriz entera
      for (let i = 0; i < matrizTablero.length; i++) {
        for (let j = 0; j < matrizTablero[i].length; j++) {
          // si la posicion que miro es distinta de 999
          if (matrizTablero[i][j] !== 999) {
            // Mirar si es 1,2,3 o 4
            // si es un 1
            if (matrizTablero[i][j] === 1) {
              this.mirar8Lados(i, j, matrizTablero, 2)
              // si es un 2
            } else if (matrizTablero[i][j] === 2) {
              this.mirar8Lados(i, j, matrizTablero, 3)
              // si es un 3
            } else if (matrizTablero[i][j] === 3) {
              this.mirar8Lados(i, j, matrizTablero, 4)
              // si es un 4
            } else if (matrizTablero[i][j] === 4) {
              this.mirar8Lados(i, j, matrizTablero, 5)
            }
          }
        }
      }
    }

    console.log(matrizTablero)

    return matrizTablero;
  }

  mirar8Lados = (i, j, matrizTablero, numeroQuePoner) => {
    // cambiar los 8 lados
    //arriba
    if ((i - 1 < matrizTablero.length -1) && (i - 1 >= 0) && (matrizTablero[i - 1][j] === 999)) {
      matrizTablero[i - 1][j] = numeroQuePoner
    }
    //abajo
    if ((i + 1 < matrizTablero.length -1) && (i + 1 >= 0) && (matrizTablero[i + 1][j] === 999)) {
      matrizTablero[i + 1][j] = numeroQuePoner
    }
    // izquierda
    if ((j - 1 < matrizTablero[i].length -1) && (j - 1 >= 0) && (matrizTablero[i][j - 1] === 999)) {
      matrizTablero[i][j - 1] = numeroQuePoner
    }
    //derecha
    if ((j + 1 < matrizTablero[i].length -1) && (j + 1 >= 0) && (matrizTablero[i][j + 1] === 999)) {
      matrizTablero[i][j + 1] = numeroQuePoner
    }
    // diagonal arriba derecha
    if ((i - 1 < matrizTablero.length -1) && (i - 1 >= 0) && (j + 1 < matrizTablero[i].length) -1 && (j + 1 >= 0) && (matrizTablero[i - 1][j + 1] === 999)) {
      matrizTablero[i - 1][j + 1] = numeroQuePoner
    }
    // diagonal arriba izquierda
    if ((i - 1 < matrizTablero.length -1) && (i - 1 >= 0) && (j - 1 < matrizTablero[i].length -1) && (j - 1 >= 0) && (matrizTablero[i - 1][j - 1] === 999)) {
      matrizTablero[i - 1][j - 1] = numeroQuePoner
    }
    // diagonal abajo derecha
    if ((i + 1 < matrizTablero.length -1) && (i + 1 >= 0) && (j + 1 < matrizTablero[i].length -1) && (j + 1 >= 0) && (matrizTablero[i + 1][j + 1] === 999)) {
      matrizTablero[i + 1][j + 1] = numeroQuePoner
    }
    // diagonal abajo izquierda
    if ((i + 1 < matrizTablero.length -1) && (i + 1 >= 0) && (j - 1 < matrizTablero[i].length -1) && (j - 1 >= 0) && (matrizTablero[i + 1][j - 1] === 999)) {
      matrizTablero[i + 1][j - 1] = numeroQuePoner
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
    this.setState({ campo: tableroNuevo })

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
    if (this.state.posicion.columna > 0 && this.state.posicion.columna < this.state.columnas) {
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