import React from 'react';
import { Button } from 'reactstrap';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // DEFINE AQUÍ TU ESTADO
      colores: Array(5).fill("secondary"),
      contadores: Array(5).fill(0),
    };
  }

  pulsa = (posicionBoton) => {
    let copiaColores = this.state.colores
    let copiaContadores = this.state.contadores

    if(copiaColores[posicionBoton] === "secondary"){
      copiaColores[posicionBoton] = "danger"
      this.setState({colores:copiaColores})
    }

    copiaContadores[posicionBoton] ++
    this.setState({contadores : copiaContadores})

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Botoncillo color={this.state.colores[0]} contador={this.state.contadores[0]} sePulsa={() => this.pulsa(0)}></Botoncillo>
          <Botoncillo color={this.state.colores[1]} contador={this.state.contadores[1]} sePulsa={() => this.pulsa(1)}></Botoncillo>
          <Botoncillo color={this.state.colores[2]} contador={this.state.contadores[2]} sePulsa={() => this.pulsa(2)}></Botoncillo>
          <Botoncillo color={this.state.colores[3]} contador={this.state.contadores[3]} sePulsa={() => this.pulsa(3)}></Botoncillo>
          <Botoncillo color={this.state.colores[4]} contador={this.state.contadores[4]} sePulsa={() => this.pulsa(4)}></Botoncillo> 
        </header>
      </div>
    );
  }
}

function Botoncillo(props) {
  return (
    // MUESTRA AQUÍ EL BOTÓN CON EL COLOR
    <Button color={props.color} onClick={props.sePulsa}>{props.contador}</Button>
  );
}











export default App;