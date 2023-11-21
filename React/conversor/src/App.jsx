import React, { Component } from 'react';


// tenemos un class componenet porque queremos guardar estado
class App extends Component {
  // definimos el constructos
  constructor(props) {
    // obtenemos las props del padre React Component
    super(props)
    // establecemos un estado, con 2 variables, euros y factor
    this.state = {
      euros: 0,
      factor: 1.1,
    }
  }

  // establecemos 2 funciones, para aumentar y disminuir el estado
  aumentar() {
    const auxeuro = this.state.euros + 1;
    this.setState({ euros: auxeuro })
  }

  disminuir() {
    const auxeuro = this.state.euros - 1;
    if (auxeuro >= 0) {
      this.setState({ euros: auxeuro })
    }
  }

  // en el render ponemos todo lo que queremos mostrar en nuestra aplicacion
  render() {
    return (
      // establecemos un div
      <div className="App">
        <p>{this.state.euros} Euros equivalen a {this.state.euros * this.state.factor} dólares</p>
        <button onClick={() => this.aumentar()}>+</button>
        <button onClick={() => this.disminuir()}>-</button>
      </div>
    );
  }
}

export default App;
