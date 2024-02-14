import { Button } from 'reactstrap'
import { Component } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function Botonera(props) {
  //COMPONENTE QUE RENDERIZA EL TABLERO
  let tablero = props.tablero.slice()

  let nuevoTablero = []
  // recorrer el tablero
  for (let i = 0; i < tablero.length; i++) {
    let nuevoTableroColumnas = []
    for (let j = 0; j < tablero[i].length; j++) {
      if (tablero[i][j] === 0) {
        nuevoTableroColumnas.push(<Button outline color='success' onClick={() => props.moverAdestino(i, j)} key={i + j} />)
        // si el elemento es un 1, pintar boton gris
      } else if (tablero[i][j] === 1) {
        nuevoTableroColumnas.push(<Button  color='danger' key={i + j} onClick={() => props.moverAdestino(i, j)}/>)
        // sino pintarlo verde
      } else if (tablero[i][j] === 2) {
        nuevoTableroColumnas.push(<Button  color='warning' key={i + j} onClick={() => props.moverAdestino(i, j)}/>)
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
      texto: "mueve una ficha",
      fichaSelccionada: false,
      coordenadasFichaSeleccionada: [],
    };
  }

  componentWillMount() {
    //ESTE MÉTODO SE EJECUTARÁ AL PRINCIPIO DE LA APLICACIÓN. ANTES DE RENDERIZAR.
    let copiaEstado = this.state.tablero.slice()

    // recorrer la copia del estado
    for (let i = 0; i < copiaEstado.length; i++) {
      for (let j = 0; j < copiaEstado[i].length; j++) {
        // si las filas son las del medio, poner 0 blanco
        if (i >= 3 && i <= 4) {
          copiaEstado[i][j] = 0
          // si la fila es par, pintar los impares y hasta la fila 3 de gris
        } else if (i % 2 === 0 && j % 2 === 1 && i <= 3) {
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

  sePuedeMoverAbajo(idestino, jdestino){
    // si se puede mover abajo
    if((idestino === this.state.coordenadasFichaSeleccionada[0] + 1 && jdestino === this.state.coordenadasFichaSeleccionada[1] + 1) || (idestino === this.state.coordenadasFichaSeleccionada[0] + 1 && jdestino === this.state.coordenadasFichaSeleccionada[1] - 1)){
      // si donde se va a mover, es 0 o 2
      if(this.state.tablero[idestino][jdestino] === 0 || this.state.tablero[idestino][jdestino] === 2 ){
        return true
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  sePuedeMoverArriba(idestino, jdestino){
    if((idestino === this.state.coordenadasFichaSeleccionada[0] - 1 && jdestino === this.state.coordenadasFichaSeleccionada[1] + 1) || (idestino === this.state.coordenadasFichaSeleccionada[0] - 1 && jdestino === this.state.coordenadasFichaSeleccionada[1] - 1)){
      if(this.state.tablero[idestino][jdestino] === 0 || this.state.tablero[idestino][jdestino] === 1 ){
        return true
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  moverAdestino = (idestino, jdestino) => {

    // si no se ha seleccionado ficha y el jugador actual es el 1 y hemos clickado sobre una ficha del jugador 1 (gris)
    if (!this.state.fichaSelccionada && this.state.jugadorActual === 1 && this.state.tablero[idestino][jdestino] === 1) {

      // setear los estados de texto, para saber que ficha se ha selccionado y dar paso a mover la ficha poniendo la ficha seleccionada a true
      this.setState({ texto: "selecciona DESTINO", fichaSelccionada: true, coordenadasFichaSeleccionada: [idestino, jdestino] })

      // si no se ha seleccionado ficha y el jugador actual es el 2 y hemos clickado sobre una ficha del jugador 2 (verde)
    } else if (!this.state.fichaSelccionada && this.state.jugadorActual === 2 && this.state.tablero[idestino][jdestino] === 2) {

      // setear los estados de texto, para saber que ficha se ha selccionado y dar paso a mover la ficha poniendo la ficha seleccionada a true
      this.setState({ texto: "selecciona DESTINO", fichaSelccionada: true, coordenadasFichaSeleccionada: [idestino, jdestino] })

      // si la ficha ha sido seleccionada y el jugador actual es el 1 , solo mover hacia abajo
    } else if (this.state.fichaSelccionada && this.state.jugadorActual === 1 && this.sePuedeMoverAbajo(idestino,jdestino)) {

      // mover la ficha origen a la coordenada que viene por parametro (destino)
      let copiaEstado = this.state.tablero.slice()
      copiaEstado[idestino][jdestino] = 1
      copiaEstado[this.state.coordenadasFichaSeleccionada[0]][this.state.coordenadasFichaSeleccionada[1]] = 0
      this.setState({ tablero: copiaEstado, jugadorActual: 2, texto: "mueve una ficha", fichaSelccionada: false })

      // si la ficha ha salido seleccionada y el jugador actual es el 2, solo mover hacia arriba
    } else if (this.state.fichaSelccionada && this.state.jugadorActual === 2 && this.sePuedeMoverArriba(idestino,jdestino)) {

      // mover la ficha origen a la coordenada que viene por parametro (destino)
      let copiaEstado = this.state.tablero.slice()
      copiaEstado[idestino][jdestino] = 2
      copiaEstado[this.state.coordenadasFichaSeleccionada[0]][this.state.coordenadasFichaSeleccionada[1]] = 0
      this.setState({ tablero: copiaEstado, jugadorActual: 1, texto: "mueve una ficha", fichaSelccionada: false })

    }
  }

  cancelarMovimiento = () => {
    this.setState({fichaSelccionada:false, texto:"mueve una ficha", coordenadasFichaSeleccionada:[]})
  }


  render() {
    return (
      <div className="App">
        {this.state.fichaSelccionada && <Button onClick={this.cancelarMovimiento}>Cancelar movimiento</Button>}
        <p>{"Jugador " + this.state.jugadorActual}{" : "}{this.state.texto}{this.state.jugadorActual===1 &&<Button color='danger'></Button>}{this.state.jugadorActual===2 &&<Button color='warning'></Button>}</p>
        <Botonera moverAdestino={this.moverAdestino} mover={this.mover} tablero={this.state.tablero}></Botonera>
      </div>
    );
  }
}




export default App
