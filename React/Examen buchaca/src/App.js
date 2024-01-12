import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const MapaBotones = (props) => {
  // este componente pinta el tablero 9x9 con las props que le paso.
  let arrayMapa = props.listaBotones

  let arrayNuevo = Array(9)


  // leer el tablero que recibimos por props
  for (let i = 0; i < arrayMapa.length; i++) {
    let arrayBotones = Array(9)
    for (let j = 0; j < arrayMapa[i].length; j++) {
      if (arrayMapa[i][j] === 0 && i === 0) {
        arrayBotones.push(<Button outline onClick={() => props.clicka(i, j)}></Button>)
      } else if (arrayMapa[i][j] === 1) {
        arrayBotones.push(<Button color='primary'></Button>)
      } else if (arrayMapa[i][j] === 0) {
        arrayBotones.push(<Button outline></Button>)
      }
    }
    arrayNuevo[i] = arrayBotones
    arrayNuevo[i].push(<br></br>)
  }
  return arrayNuevo
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: Array(9).fill(null),
      // no se puede modificar el state
    }
  }

  clica(x, y) {
    // x se supone que la columna, y la fila
    console.log(x, y)
    let copiaEstado = this.state.listaBotones;
    // la columna empezando por el final
    for (let i = 8; i >= 0; i--) {
      if (copiaEstado[i][y] === 0) {
        copiaEstado[i][y] = 1
        break;
      }
    }
    this.setState({ listaBotones: copiaEstado })
  }
  componentWillMount() {
    // aquí es donde creo las nueve columnas con los datos iniciales.
    let arrayMapa = this.state.listaBotones

    for (let i = 0; i < arrayMapa.length; i++) {
      let arrayBotones = Array(9)
      for (let j = 0; j < arrayBotones.length; j++) {
        arrayBotones[j] = 0
      }
      arrayMapa[i] = arrayBotones
    }
    this.setState({ listaBotones: arrayMapa })
  }
  render() {
    return (
      <div className="App">
        <h1> BUCHACA </h1>
        <MapaBotones clicka={(x, y) => this.clica(x, y)} listaBotones={this.state.listaBotones} />
      </div>
    );
  }
}

export default App;
