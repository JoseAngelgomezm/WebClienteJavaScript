import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Tablero from './componentes/Tablero.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensionesCampo: { filas: 9, columnas: 9 },
      campo: [],
      jugador: 1,
      ganador: false,
      quienGana: 0,
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
    this.setState({ campo: copia })
  }

  meterFicha(fila, columna) {
    // si hay un ganador, no podemos meter ficha
    if (this.state.ganador === false) {
      // recorrer la columna que nos llega por parametro
      let copiaCampo = this.state.campo
      let turno = this.state.jugador
      for (let i = this.state.dimensionesCampo.columnas - 1; i >= 0; i--) {
        // si esta vacia, colocar un ficha del jugador que va
        if (copiaCampo[i][columna] === 0) {
          if (turno === 1) {
            // ponerle un 1 en la posicion
            copiaCampo[i][columna] = 1
            // cambiar el turno al jugador 2
            turno = 2;
            break;
          } else {
            // ponerle un 2 en la posicion
            copiaCampo[i][columna] = 2
            // cambiar el turno al jugador 1
            turno = 1;
            break;
          }
          // sino , mirara la siguiente
        }
      }
      // modificar estados
      // cambiar el turno y el campo
      this.setState({ campo: copiaCampo, jugador: turno })
      // comprobar si ha ganado
      this.comprobarSiGana()
    }
  }


  comprobarSiGana() {
    // recorrer la matriz en horizontal
    for (let i = 0; i < this.state.campo.length; i++) {
      for (let j = 0; j < this.state.campo[i].length; j++) {
        // si el bloque de 4 son 1, gana jugador 1
        if (j + 3 < this.state.campo[i].length) {
          if (this.state.campo[i][j] === 1 && this.state.campo[i][j + 1] === 1 && this.state.campo[i][j + 2] === 1 && this.state.campo[i][j + 3] === 1) {
            this.setState({ ganador: true, quienGana: 1 });
          }
          // si el bloque de 4 son 2, gana jugador 2
          if (this.state.campo[i][j] === 2 && this.state.campo[i][j + 1] === 2 && this.state.campo[i][j + 2] === 2 && this.state.campo[i][j + 3] === 2) {
            this.setState({ ganador: true, quienGana: 2 });
          }
        }
      }
    }
    console.log(this.state.campo)

    // recorrer la matriz en vertical
    for (let i = 0; i < this.state.campo.length; i++) {
      for (let j = 0; j < this.state.campo[i].length; j++) {
        // si el bloque de 4 son 1, gana jugador 1
        if (j + 3 < this.state.campo[i].length) {
          if (this.state.campo[j][i] === 1 && this.state.campo[j + 1][i] === 1 && this.state.campo[j + 2][i] === 1 && this.state.campo[j + 3][i] === 1) {
            this.setState({ ganador: true, quienGana: 1 });
          }
          // si el bloque de 4 son 2, gana jugador 2
          if (this.state.campo[j][i] === 2 && this.state.campo[j + 1][i] === 2 && this.state.campo[j + 2][i] === 2 && this.state.campo[j + 3][i] === 2) {
            this.setState({ ganador: true, quienGana: 2 });
          }
        }
      }
    }
  }

  render() {
    let divGanador;
    if (this.state.quienGana === 1) {
      divGanador = <div id="ganador"><h1>Gana el jugador 1</h1></div>
    } else if (this.state.quienGana === 2) {
      divGanador = <div id="ganador"><h1>Gana el jugador 2</h1></div>
    }
    return (
      <>
        <div className="App" >
          <div id="turno">Turno del jugador: {this.state.jugador}</div>
          <Tablero meterFicha={(fila, columna) => this.meterFicha(fila, columna)} campo={this.state.campo}></Tablero>
        </div>
        {divGanador}
      </>
    );
  }

}

export default App;
