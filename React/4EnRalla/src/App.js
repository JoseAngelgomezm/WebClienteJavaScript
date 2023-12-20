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


  comprobarSiGana() {
    console.log("implementar si ha ganado")
  }

  render() {
    return (
      <div className="App" >
        <div id="turno">Turno del jugador: {this.state.jugador}</div>
        <Tablero meterFicha={(fila, columna) => this.meterFicha(fila, columna)} campo={this.state.campo}></Tablero>
      </div>
    );
  }

}

export default App;
