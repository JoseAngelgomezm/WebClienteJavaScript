import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'reactstrap';
import { Spinner } from 'reactstrap';

// crear el function component boton, que recibe las props del app
function Boton(props) {
  return (
    // el componente contiene un boton reactstrap que recibe 2 props, el onclick y el nombre
    <Button onClick={() => props.cambia()}>{props.nombre}</Button>
  )
}

const Circulo = (props) => {
  // el componenete circulo contiene un Spinner reactstrap que recibe el prop del color
  return (
    <Spinner color={props.color} onClick={() => props.cambiarLetrero()}/>
  )
}

// crear el class component App 
class App extends React.Component {
  // crear el constructor que recibe las props
  constructor(props) {
    // obtener las props del padre React Component
    super(props)
    // contiene el estado color
    this.state = {
      color: "secondary",
      letrero: "Color que tiene el spinner"
    }
  }

  // crear la funcion cambia, que ejecutara el boton al darle click 
  cambiaSecondary() {
    this.setState({ color: "secondary"})
  }

  cambiaDanger() {
    this.setState({ color: "danger"})
  }

  cambiaPrimary() {
    this.setState({ color: "primary"})
  }

  cambiaTitulo(){
    this.setState({ letrero: this.state.color})
  }

  render() {
    return (
      // al renderizar el boton, le pasamos la funcion cambia en el onClick y el nombre
      <div className="botones">
        <h1>{this.state.letrero}</h1>
        <Circulo color={this.state.color} cambiarLetrero={() => this.cambiaTitulo()} class="secondary" />
        <Boton nombre={"secondary"} cambia={() => this.cambiaSecondary()} />
        <Boton nombre={"danger"} cambia={() => this.cambiaDanger()} />
        <Boton nombre={"primary"} cambia={() => this.cambiaPrimary()} />
      </div>
    );
  }
}

export default App;