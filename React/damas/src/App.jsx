import { Button } from 'reactstrap'
import { useState } from 'react'
import { Component } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function Botonera(props) {
  //COMPONENTE QUE RENDERIZA EL TABLERO
  let tablero = props.tablero.slice()

  let nuevoTablero = []
  // recorrer el tablero
  console.log(tablero)
  for (let i = 0; i < tablero.length; i++) {
    let nuevoTableroColumnas = []
    for (let j = 0; j < tablero[i].length; j++) {
      if (tablero[i][j] === 0) {
        nuevoTableroColumnas.push(<Button key={i + j} outline />)
        // si el elemento es un 1, pintar boton gris
      } else if (tablero[i][j] === 1) {
        nuevoTableroColumnas.push(<Button key={i + j} onClick={() => props.mover(i , j)} color="secondary" />)
        // sino pintarlo verde
      } else if (tablero[i][j] === 2) {
        nuevoTableroColumnas.push(<Button key={i + j} onClick={() => props.mover(i , j)} color="success" />)
      }
    }
    nuevoTableroColumnas.push(<br></br>)
    nuevoTablero.push(nuevoTableroColumnas)
  }

  return nuevoTablero
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //DEFINE EL ESTADO DE TU COMPONENTE PRINCIPAL
      //Recuerda que si defines una tabla 8x8 tu estado será inválido.
      tablero:
        [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ],
      
      jugadorActual: 1,
      texto: "mueve una ficha"
    };
  }

  componentWillMount() {
    //ESTE MÉTODO SE EJECUTARÁ AL PRINCIPIO DE LA APLICACIÓN. ANTES DE RENDERIZAR.
    let copiaEstado = this.state.tablero.slice()

    // recorrer la copia del estado
    for (let i = 0; i < copiaEstado.length; i++) {
      for (let j = 0; j < copiaEstado[i].length; j++) {
        // si la fila es par, pintar los impares y hasta la fila 3 de gris
        if (i % 2 === 0 && j % 2 === 1 && i <= 3) {
          copiaEstado[i][j] = 1
          // si la fila es impar, pintar los pares y hasta la fila 3 de gris
        } else if (i % 2 === 1 && j % 2 === 0 && i <= 3) {
          copiaEstado[i][j] = 1
          // si la fila es par, pintar los impares y hasta la fila 8 de verde
        } else if (i % 2 === 0 && j % 2 === 1 && i >= 4) {
          copiaEstado[i][j] = 2
          // si la fila es impar, pintar los pares y hasta la fila 8 de verde
        } else if (i % 2 === 1 && j % 2 === 0 && i >= 4) {
          copiaEstado[i][j] = 2
        }
      }
    }

    // una vez tenemos los valores, setear estado
    this.setState({ tablero: copiaEstado })
  }

  mover = (i , j) => {
    // si el jugador actual es el 1, solo puede seleccionar las fichas verdes
    if(this.state.jugadorActual === 1 && this.state.tablero[i][j] === 1){
      // si se ha seleccionado, pedir destino
      this.setState({texto:"selecciona destino, ficha seleccionada " + i + "," + j})
      

    }else if(this.state.jugadorActual === 2 && this.state.tablero[i][j] === 2){
      // si se ha seleccionado, pedir destino
      this.setState({texto:"selecciona destino, ficha seleccionada " + i + "," + j})
      
    }
    
  }

  render() {
    return (
      <div className="App">
        <p>{"Jugador " + this.state.jugadorActual}: {this.state.texto}</p>
        <Botonera mover={this.mover} tablero={this.state.tablero}></Botonera>
      </div>
    );
  }
}




export default App
